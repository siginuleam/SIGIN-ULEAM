import { normalizedWord } from "./model.js";
// Compact real crossing grid. If a term cannot cross, its separate row is explicit.
export function crosswordLayout(entries) {
  const cells = new Map(),
    placed = [],
    key = (x, y) => `${x},${y}`;
  const canPlace = (word, x, y, dir) => {
    let crossings = 0;
    for (let i = 0; i < word.length; i++) {
      const px = x + (dir === "across" ? i : 0),
        py = y + (dir === "down" ? i : 0),
        cell = cells.get(key(px, py));
      if (cell) {
        if (cell.letter !== word[i] || cell.directions.includes(dir))
          return false;
        crossings++;
      } else {
        if (
          dir === "across" &&
          (cells.has(key(px, py - 1)) || cells.has(key(px, py + 1)))
        )
          return false;
        if (
          dir === "down" &&
          (cells.has(key(px - 1, py)) || cells.has(key(px + 1, py)))
        )
          return false;
      }
    }
    if (
      cells.has(
        key(x - (dir === "across" ? 1 : 0), y - (dir === "down" ? 1 : 0)),
      ) ||
      cells.has(
        key(
          x + (dir === "across" ? word.length : 0),
          y + (dir === "down" ? word.length : 0),
        ),
      )
    )
      return false;
    return crossings > 0;
  };
  entries.forEach((e, index) => {
    const word = normalizedWord(e.word);
    let position;
    if (index === 0) position = { x: 0, y: 0, dir: "across" };
    else {
      outer: for (const prior of placed) {
        const dir = prior.dir === "across" ? "down" : "across";
        for (let j = 0; j < prior.word.length; j++)
          for (let i = 0; i < word.length; i++)
            if (word[i] === prior.word[j]) {
              const x =
                  prior.x +
                  (prior.dir === "across" ? j : 0) -
                  (dir === "across" ? i : 0),
                y =
                  prior.y +
                  (prior.dir === "down" ? j : 0) -
                  (dir === "down" ? i : 0);
              if (canPlace(word, x, y, dir)) {
                position = { x, y, dir };
                break outer;
              }
            }
      }
      if (!position) {
        const maxY = Math.max(...[...cells.values()].map((c) => c.y));
        position = { x: 0, y: maxY + 2, dir: "across" };
      }
    }
    const p = { ...position, word, index };
    placed.push(p);
    for (let i = 0; i < word.length; i++) {
      const x = p.x + (p.dir === "across" ? i : 0),
        y = p.y + (p.dir === "down" ? i : 0),
        k = key(x, y),
        cell = cells.get(k) || {
          x,
          y,
          letter: word[i],
          directions: [],
          refs: [],
        };
      cell.directions.push(p.dir);
      cell.refs.push({ entry: index, letter: i });
      if (i === 0) cell.number = index + 1;
      cells.set(k, cell);
    }
  });
  const xs = [...cells.values()].map((c) => c.x),
    ys = [...cells.values()].map((c) => c.y),
    minX = Math.min(...xs),
    minY = Math.min(...ys);
  return {
    width: Math.max(...xs) - minX + 1,
    height: Math.max(...ys) - minY + 1,
    cells: [...cells.values()].map((c) => ({
      ...c,
      column: c.x - minX + 1,
      row: c.y - minY + 1,
    })),
    placed,
  };
}
