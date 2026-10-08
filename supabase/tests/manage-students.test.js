import test from "node:test";
import assert from "node:assert/strict";

let handle;
const environment = {
  SUPABASE_URL: "https://test.supabase.co",
  SUPABASE_SERVICE_ROLE_KEY: "fixture-server-only",
  SIGIN_ALLOWED_ORIGINS: "https://aula.example.edu",
};
globalThis.Deno = {
  env: { get: (key) => environment[key] },
  serve: (callback) => {
    handle = callback;
  },
};
await import("../functions/manage-students/index.ts");
const fixture = {
  id: "0000000002",
  name: "Estudiante ficticio",
  courses: ["gig-502", "cex-103"],
};
function request(body, bearer = "fixture-auth") {
  return new Request("https://test.supabase.co/functions/v1/manage-students", {
    method: "POST",
    headers: {
      Origin: "https://aula.example.edu",
      "Content-Type": "application/json",
      ...(bearer ? { Authorization: "Bearer " + bearer } : {}),
    },
    body: JSON.stringify(body),
  });
}
function mockFetch(options = {}) {
  const calls = [];
  globalThis.fetch = async (url, init) => {
    const body = init.body ? JSON.parse(init.body) : null;
    calls.push({ url, ...init, body });
    let result;
    let status = 200;
    if (url.endsWith("/auth/v1/user")) result = { id: "teacher-fixture-uuid" };
    else if (url.includes("profiles?id="))
      result = [
        {
          role: options.student ? "student" : "teacher",
          must_change_password: false,
        },
      ];
    else if (url.includes("courses?"))
      result = [{ id: "gig-502" }, { id: "cex-103" }];
    else if (url.includes("profiles?student_number="))
      result = options.existing
        ? [{ id: "existing-fixture-uuid", role: "student" }]
        : [];
    else if (url.endsWith("/admin/users")) result = { id: "new-fixture-uuid" };
    else if (url.endsWith("/rpc/provision_student")) {
      result = options.fail
        ? { message: "RPC failed" }
        : { id: "new-fixture-uuid" };
      if (options.fail) status = 400;
    } else if (url.includes("/admin/users/")) result = {};
    else throw new Error("Unexpected server request: " + url);
    return new Response(JSON.stringify(result), { status });
  };
  return calls;
}

test("student management rejects unauthenticated and student sessions before elevated operations", async () => {
  let calls = mockFetch();
  assert.equal(
    (await handle(request({ students: [fixture] }, ""))).status,
    401,
  );
  assert.equal(calls.length, 0);
  calls = mockFetch({ student: true });
  assert.equal((await handle(request({ students: [fixture] }))).status, 403);
  assert.equal(calls.length, 2);
  assert.ok(calls.every((call) => !call.url.includes("/admin/users")));
});

test("new student is created in Auth and atomically enrolled with server-only permission", async () => {
  const calls = mockFetch();
  const response = await handle(request({ students: [fixture] }));
  const body = await response.json();
  assert.equal(body.results[0].ok, true);
  const create = calls.find((call) => call.url.endsWith("/admin/users"));
  assert.equal(create.body.email, "e0000000002@live.uleam.edu.ec");
  assert.equal(create.body.password, fixture.id);
  const provision = calls.find((call) =>
    call.url.endsWith("/rpc/provision_student"),
  );
  assert.deepEqual(provision.body.p_courses, fixture.courses);
  assert.equal(provision.headers.Authorization, "Bearer fixture-server-only");
});

test("existing student adds enrollment without resetting a password or creating another account", async () => {
  const calls = mockFetch({ existing: true });
  const response = await handle(request({ students: [fixture] }));
  assert.equal((await response.json()).results[0].ok, true);
  assert.ok(calls.every((call) => !call.url.includes("/admin/users")));
  assert.equal(
    calls.find((call) => call.url.endsWith("/rpc/provision_student")).body
      .p_user_id,
    "existing-fixture-uuid",
  );
});

test("a failed new enrollment cleans up its new auth account and reports failure", async () => {
  const calls = mockFetch({ fail: true });
  const response = await handle(request({ students: [fixture] }));
  assert.equal((await response.json()).results[0].ok, false);
  assert.ok(
    calls.some(
      (call) =>
        call.url.endsWith("/admin/users/new-fixture-uuid") &&
        call.method === "DELETE",
    ),
  );
});

test("unapproved origins, invalid courses and duplicate rows are rejected explicitly", async () => {
  const calls = mockFetch();
  const unapproved = new Request("https://test.supabase.co", {
    method: "POST",
    headers: { Origin: "https://evil.example" },
    body: "{}",
  });
  assert.equal((await handle(unapproved)).status, 403);
  assert.equal(calls.length, 0);
  const response = await handle(
    request({
      students: [
        fixture,
        fixture,
        { ...fixture, id: "0000000003", courses: ["alien"] },
      ],
    }),
  );
  assert.deepEqual(
    (await response.json()).results.map((result) => result.ok),
    [true, false, false],
  );
});
