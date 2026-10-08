// Temas transcritos del sílabo GIG-406. Casos, cifras y expedientes originales de simulación.
const unit1 = "U1. INTRODUCCIÓN AL GOBIERNO DIGITAL";
const unit2 = "U2. MARCO LEGAL Y REGULATORIO DEL GOBIERNO DIGITAL";
const unit3 = "U3. LA TRANSFORMACIÓN DIGITAL DEL ESTADO";
const unit4 = "U4. TECNOLOGÍAS PARA EL GOBIERNO DIGITAL";
const choice = (prompt, options, correct, explanation) => ({
  type: "choice",
  prompt,
  options,
  correct,
  explanation,
});
const matching = (prompt, pairs, explanation) => ({
  type: "matching",
  prompt,
  pairs: pairs.map(([left, right]) => ({ left, right })),
  explanation,
});
const ordering = (prompt, items, explanation) => ({
  type: "ordering",
  prompt,
  items,
  explanation,
});
const numeric = (prompt, correct, unit, explanation) => ({
  type: "numeric",
  prompt,
  correct,
  tolerance: 0.01,
  unit,
  explanation,
});
const crossword = (prompt, entries, explanation) => ({
  type: "crossword",
  prompt,
  entries: entries.map(([word, clue]) => ({ word, clue })),
  explanation,
});
const documents = [
  {
    week: 1,
    unit: unit1,
    title:
      "S1. Fundamentos del gobierno digital: S1.1 Definición y características. S1.2 Evolución del gobierno electrónico. S1.3 Importancia en la gestión pública",
    name: "Del formulario escaneado al servicio que resuelve",
    objective:
      "Distinguir digitalización de documentos y transformación del servicio mediante evidencia del recorrido ciudadano.",
    context: `EXPEDIENTE 01 · Servicio de certificados del GAD ficticio Puerto Claro. Todos los documentos y datos de este expediente se construyeron para aprender; no describen un municipio real.

Documento A, bitácora de atención: durante junio se registraron 240 solicitudes. La versión actual permite descargar un PDF, pero exige imprimirlo, firmarlo y entregar tres copias en ventanilla. La persona debe consultar presencialmente si el certificado está listo. Cada solicitante realiza dos visitas en promedio y gasta USD 3 por visita en transporte. El trámite tarda ocho días; una funcionaria vuelve a escribir los datos del papel en una hoja de cálculo.

Documento B, propuesta técnica: presentar una solicitud digital, validar campos antes de enviarla, recibir un número de seguimiento y consultar el estado. El personal revisa el mismo expediente, sin volver a transcribirlo. Se mantiene una ventanilla de asistencia para quienes no tienen conexión. El objetivo piloto es resolver en tres días y evitar visitas a quienes completan el proceso digital. No se promete aprobación automática: la revisión del requisito sigue existiendo.

Ficha conceptual: digitalizar convierte información analógica en archivos; gobierno electrónico usa TIC para ofrecer información y trámites; gobierno digital rediseña procesos y decisiones con datos, coordinación institucional y participación de usuarios. La diferencia no depende de que la pantalla tenga muchos colores. Eficiencia, inclusión, trazabilidad y rendición de cuentas son criterios para evaluar el cambio.

Tu rol es asesorar al equipo de atención. Compara las dos propuestas a partir del recorrido completo, no solo de la descarga inicial. El cálculo de ahorro considera exclusivamente transporte y supone que las 240 personas evitan las dos visitas; no incluye tiempo, internet ni costos de implementación. Ese supuesto debe acompañar cualquier informe. No confundas ahorro potencial con ahorro ya demostrado.`,
    questions: [
      choice(
        "¿Qué cambio acerca la propuesta B a gobierno digital?",
        [
          "Reemplazar el papel por una imagen sin cambiar el recorrido",
          "Compartir el expediente y permitir seguimiento, conservando revisión e inclusión",
          "Prometer aprobación sin comprobar requisitos",
        ],
        1,
        "B cambia proceso, circulación de información e interacción ciudadana; un PDF aislado solo digitaliza el soporte.",
      ),
      matching(
        "Relaciona cada intervención con su propósito.",
        [
          ["Escanear un formulario", "Digitalización del soporte"],
          ["Número y estado del expediente", "Trazabilidad del trámite"],
          ["Ventanilla asistida", "Inclusión de personas sin conexión"],
          ["No volver a escribir datos", "Reducción de retrabajo"],
        ],
        "Cada intervención atiende una necesidad distinta: soporte, seguimiento, inclusión y eficiencia.",
      ),
      ordering(
        "Ordena un diagnóstico antes de comprar tecnología.",
        [
          "Describir el recorrido ciudadano actual",
          "Identificar esperas, duplicaciones y barreras",
          "Definir una mejora e indicadores verificables",
          "Probarla con usuarios y revisar resultados",
        ],
        "La tecnología se selecciona después de entender el servicio y cómo se comprobará la mejora.",
      ),
      numeric(
        "Si las 240 personas evitan dos visitas de USD 3 cada una, ¿cuánto ahorro potencial total de transporte representa?",
        1440,
        "USD",
        "240 × 2 × 3 = USD 1.440. Es un escenario potencial bajo el supuesto indicado, no un resultado medido.",
      ),
      crossword(
        "Completa el vocabulario del expediente.",
        [
          [
            "TRAZABILIDAD",
            "Capacidad de seguir los cambios y estados de un trámite.",
          ],
          [
            "INCLUSION",
            "Diseño que permite participar a personas con distintas barreras.",
          ],
          ["PROCESO", "Secuencia de actividades que produce un resultado."],
        ],
        "Los conceptos permiten explicar por qué rediseñar el servicio tiene más alcance que escanear un documento.",
      ),
    ],
  },
  {
    week: 2,
    unit: unit1,
    title:
      "S2. Modelos y servicios de gobierno electrónico: S2.1 Modelos de e-gob. S2.2 Servicios electrónicos y trámites en línea. S2.3 Calidad del servicio digital",
    name: "Auditoría de una matrícula digital",
    objective:
      "Clasificar relaciones de gobierno electrónico y priorizar mejoras con un embudo de finalización.",
    context: `EXPEDIENTE 02 · Universidad pública ficticia Costa Abierta. El servicio observado es la matrícula semestral. La simulación utiliza cuatro tipos de relación: G2C, entre gobierno y ciudadanía; G2B, con empresas; G2G, entre instituciones públicas; G2E, con empleados públicos. Un mismo servicio puede reunir varias relaciones.

Documento A, mapa de intercambios: estudiantes seleccionan asignaturas en un portal; una empresa proveedora presenta su oferta de mantenimiento; la universidad consulta el registro público de títulos mediante una integración autorizada; el personal solicita vacaciones en una intranet. Son cuatro flujos diferentes, aunque todos usan tecnología.

Documento B, analítica del piloto: 600 estudiantes iniciaron matrícula; 420 enviaron el formulario; 360 recibieron confirmación válida. De las 180 personas que abandonaron antes del envío, 110 usaban teléfono. En una muestra de diez pruebas móviles, seis participantes no encontraron el botón de continuar porque quedaba fuera del ancho visible. El resto del problema no está diagnosticado todavía. La mesa de ayuda registró 40 consultas sobre el estado del trámite.

Documento C, regla de calidad: finalizar significa recibir confirmación válida, no abrir la pantalla. Se define la tasa de finalización como confirmaciones válidas divididas por matrículas iniciadas, multiplicado por cien. La tasa no prueba satisfacción ni accesibilidad por sí sola. La satisfacción se consulta con otra pregunta y la accesibilidad se comprueba con pruebas específicas.

La dirección dispone de un solo ciclo de mejora. Cambiar el logotipo puede ser atractivo, pero no corrige un botón inaccesible. Propón una hipótesis basada en la evidencia y un piloto que compare la finalización antes y después, distinguiendo usuarios móviles y de escritorio. Conserva un canal de ayuda; no elimines a quienes abandonan para mejorar artificialmente el indicador. Explica qué evidencia falta para afirmar que la corrección resolvió todo el abandono.`,
    questions: [
      choice(
        "¿Qué intervención está mejor respaldada para el primer piloto?",
        [
          "Eliminar los registros abandonados del denominador",
          "Revisar el botón y el ancho en móvil, probar el flujo y comparar resultados por dispositivo",
          "Cambiar colores y afirmar que toda la deserción quedará resuelta",
        ],
        1,
        "El problema móvil está observado; todavía faltan causas para otros abandonos. El piloto debe verificar, no prometer.",
      ),
      matching(
        "Relaciona cada intercambio con el modelo correspondiente.",
        [
          ["Estudiante solicita matrícula", "G2C"],
          ["Proveedor presenta una oferta", "G2B"],
          ["Universidad consulta registro público", "G2G"],
          ["Funcionaria solicita vacaciones", "G2E"],
        ],
        "Los modelos se clasifican por los actores de la interacción, no por el dispositivo utilizado.",
      ),
      ordering(
        "Ordena el flujo ciudadano mínimo de matrícula.",
        [
          "Consultar requisitos y asignaturas disponibles",
          "Completar y revisar la solicitud",
          "Enviar y recibir identificador del trámite",
          "Consultar resolución y confirmación final",
        ],
        "Los requisitos permiten preparar la solicitud y el identificador permite seguirla hasta su resolución.",
      ),
      numeric(
        "Calcula la tasa de finalización válida del piloto: 360 confirmaciones entre 600 inicios.",
        60,
        "por ciento",
        "360 / 600 × 100 = 60 %. Usar 420 como numerador mediría envíos, no finalización válida.",
      ),
      crossword(
        "Identifica tres dimensiones de calidad.",
        [
          ["USABILIDAD", "Facilidad para completar una tarea en una interfaz."],
          [
            "DISPONIBILIDAD",
            "Posibilidad de acceder al servicio cuando se necesita.",
          ],
          [
            "ACCESIBILIDAD",
            "Posibilidad de usar el servicio con distintas capacidades y tecnologías de apoyo.",
          ],
        ],
        "La calidad exige más de una métrica; finalizar un trámite no sustituye comprobar accesibilidad.",
      ),
    ],
  },
  {
    week: 3,
    unit: unit1,
    title: "S3.1 Derecho de acceso a la información. S3.2 Gobierno abierto.",
    name: "Publicar un presupuesto sin exponer personas",
    objective:
      "Distinguir información pública, datos personales y evidencia suficiente para un diagnóstico ciudadano.",
    context: `EXPEDIENTE 03 · Observatorio ciudadano ficticio de Puerto Claro. Un comité solicita conocer la ejecución de un proyecto de alumbrado. La oficina tiene tres conjuntos de datos y necesita preparar una respuesta útil, rastreable y respetuosa de la privacidad.

Documento A, presupuesto agregado: asignación aprobada USD 120.000; devengado registrado USD 84.000; pagado USD 72.000. Devengado reconoce una obligación conforme al registro del caso; pagado refleja desembolso. No son sinónimos. El informe cubre enero a junio y fue actualizado el 5 de julio. La ficha describe la fuente, la unidad monetaria y la oficina responsable. No se indica todavía cuántas luminarias funcionan, por lo que ejecutar presupuesto no demuestra por sí solo la calidad del resultado.

Documento B, solicitudes ciudadanas: contiene nombre, cédula, correo, ubicación domiciliaria y relato de cada reclamante. El comité quiere esos registros para saber cuántas quejas se repiten. Para su objetivo bastan cantidades por sector y categoría, con una revisión para evitar identificar personas en grupos pequeños. El listado individual no debe publicarse automáticamente junto con el presupuesto.

Documento C, práctica de gobierno abierto: la oficina publica el avance agregado, habilita preguntas y explica qué decisiones tomó tras recibir observaciones. Transparencia hace comprensible y verificable la actuación; participación permite intervenir; colaboración reúne capacidades para resolver. Publicar una tabla sin contexto puede resultar poco útil.

Tu diagnóstico debe separar hechos comprobados y preguntas pendientes. Una petición de acceso requiere revisión de la normativa aplicable y del responsable institucional; este caso no inventa plazos legales ni excepciones. Para el reto usa la proporción devengada sobre asignación y deja explícito el corte temporal. Propón una publicación que incluya metadatos y datos agregados, además de un mecanismo para corregir errores detectados por la ciudadanía.`,
    questions: [
      choice(
        "¿Qué publicación responde al objetivo del comité con menor exposición personal?",
        [
          "Presupuesto con metadatos y quejas agregadas revisadas, sin cédulas ni domicilios",
          "Listado completo de cédulas porque el proyecto es público",
          "Solo una foto del alcalde",
        ],
        0,
        "La rendición de cuentas no exige divulgar todos los datos personales presentes en los registros.",
      ),
      matching(
        "Asocia la acción con su función de gobierno abierto.",
        [
          ["Publicar presupuesto y método", "Transparencia"],
          ["Recibir observaciones ciudadanas", "Participación"],
          ["Codiseñar una solución con comunidades", "Colaboración"],
          ["Explicar decisiones y correcciones", "Rendición de cuentas"],
        ],
        "Abrir el gobierno implica facilitar comprensión, intervención y respuesta; no solo entregar archivos.",
      ),
      ordering(
        "Ordena la preparación de una respuesta informacional.",
        [
          "Precisar qué información y período se solicitan",
          "Localizar documentos y revisar restricciones aplicables",
          "Preparar información comprensible y proteger datos personales",
          "Entregar respuesta trazable y canal de aclaraciones",
        ],
        "La revisión previa permite responder al objetivo y aplicar los controles correspondientes.",
      ),
      numeric(
        "¿Qué porcentaje del presupuesto asignado está devengado? Usa 84.000 / 120.000 × 100.",
        70,
        "por ciento",
        "La ejecución devengada es 70 %. El 60 % corresponde al pagado; ninguna tasa demuestra por sí sola luminarias funcionando.",
      ),
      crossword(
        "Completa conceptos de apertura responsable.",
        [
          [
            "TRANSPARENCIA",
            "Actuación pública que puede comprenderse y verificarse.",
          ],
          [
            "PARTICIPACION",
            "Intervención ciudadana en asuntos y decisiones públicas.",
          ],
          [
            "METADATOS",
            "Información sobre origen, fecha, unidad y significado de un conjunto de datos.",
          ],
        ],
        "Metadatos y mecanismos de respuesta convierten la publicación en evidencia utilizable.",
      ),
    ],
  },
  {
    week: 4,
    unit: unit1,
    title:
      "S4. Participación ciudadana y colaboración digital: S4.1 Participación ciudadana digital. S4.2 Redes sociales en la gestión pública. S4.3 Crowdsourcing y colaboración.",
    name: "Una consulta pública que no excluya al barrio",
    objective:
      "Diseñar participación digital con evidencia, canales inclusivos y devolución de resultados.",
    context: `EXPEDIENTE 04 · Plan de movilidad del cantón ficticio Puerto Claro. Se consulta dónde mejorar cruces peatonales. El equipo recibe mensajes en redes, un formulario y fichas de una jornada presencial. Una publicación obtiene muchos “me gusta”, pero no constituye una votación representativa del cantón.

Documento A, registro de aportes: llegan 180 reportes; 30 son duplicados confirmados porque describen el mismo incidente, lugar y momento. Después de consolidar quedan 150 reportes únicos. De esos, 90 señalan el cruce Mercado Norte, 35 Escuela del Puerto y 25 otros puntos. Para estudiar reportes repetidos no se necesita publicar nombre, teléfono ni ruta diaria de cada persona. La información de contacto se usa solo para aclaraciones dentro del equipo autorizado.

Documento B, consulta de inclusión: 40 participantes de la jornada dicen tener conexión irregular. El formulario pesa poco, pero el mapa interactivo obligatorio no permite avanzar sin geolocalización. Se propone permitir una dirección escrita y ofrecer asistencia presencial. Aceptar distintas formas de reporte no elimina la necesidad de validar ubicación y categoría.

Documento C, protocolo de colaboración: recibir aportes, verificar relevancia y duplicados, agrupar problemas, discutir criterios con representantes diversos y publicar qué medidas se priorizan y por qué. Crowdsourcing reúne aportes de muchas personas; el volumen requiere curación. Redes sociales sirven para difusión y conversación, pero no deben ser el único canal ni el archivo definitivo de decisiones.

Actúa como coordinador del piloto. No declares que Mercado Norte representa el 60 % de toda la población: representa esa proporción de los reportes únicos recibidos y existe autoselección. Diseña una devolución accesible con cifras, limitaciones y próximos pasos. El criterio de priorización también debe considerar riesgo, exposición y viabilidad; frecuencia de reportes es una señal, no el único criterio.`,
    questions: [
      choice(
        "¿Qué conclusión es válida con el registro?",
        [
          "El 60 % de todos los habitantes exige intervenir Mercado Norte",
          "Mercado Norte reúne el 60 % de los reportes únicos recibidos; la consulta no es una muestra representativa",
          "Los “me gusta” reemplazan la validación de reportes",
        ],
        1,
        "90 / 150 describe el registro recibido. Autoselección y cobertura impiden extrapolar directamente a toda la población.",
      ),
      matching(
        "Relaciona la medida con la necesidad que atiende.",
        [
          ["Permitir dirección escrita", "Participar sin geolocalización"],
          ["Consolidar incidentes duplicados", "Evitar conteo repetido"],
          [
            "Publicar razones de priorización",
            "Devolver resultados y rendir cuentas",
          ],
          [
            "Guardar aportes en un registro institucional",
            "Conservar evidencia fuera de redes sociales",
          ],
        ],
        "Cada medida mantiene una parte del proceso inclusivo, verificable y sostenible.",
      ),
      ordering(
        "Ordena la colaboración para priorizar cruces.",
        [
          "Recibir aportes por canales digitales y presenciales",
          "Validar, consolidar y clasificar reportes",
          "Deliberar con criterios de riesgo y viabilidad",
          "Publicar decisiones, razones y seguimiento",
        ],
        "Recibir ideas es el comienzo; validación, deliberación y devolución completan el proceso.",
      ),
      numeric(
        "¿Qué porcentaje de reportes originales se consolidó como duplicado? Usa 30 de 180; redondea a dos decimales.",
        16.67,
        "por ciento",
        "30 / 180 × 100 = 16,67 %. Se usan reportes originales como denominador para esta tasa de duplicación.",
      ),
      crossword(
        "Resuelve términos de participación.",
        [
          [
            "COLABORACION",
            "Trabajo conjunto de ciudadanía y equipo público para resolver un problema.",
          ],
          ["MODERACION", "Gestión de aportes con reglas claras y respeto."],
          [
            "RETROALIMENTACION",
            "Devolución de resultados que permite conocer qué ocurrió con los aportes.",
          ],
        ],
        "La participación mejora cuando hay reglas y devolución, además de una invitación inicial.",
      ),
    ],
  },
  {
    week: 5,
    unit: unit1,
    title:
      "S5. Datos abiertos y generación de valor público: S5.1 Datos abiertos. S5.2 Reutilización de información. S5.3 Impacto en la toma de decisiones",
    name: "Del archivo descargable a una decisión defendible",
    objective:
      "Preparar un conjunto reutilizable y formular una recomendación con límites metodológicos.",
    context: `EXPEDIENTE 05 · Laboratorio ficticio de servicios públicos. El equipo encuentra información sobre interrupciones de agua en tres sectores y quiere orientar un piloto de atención. Tener un archivo en internet no basta para que sus datos sean abiertos: hay que revisar permisos de reutilización, formato, documentación y restricciones que correspondan.

Documento A, tabla de junio: Norte registra 24 interrupciones y 1.200 conexiones; Centro registra 18 y 600; Sur registra 12 y 1.200. Se define tasa por cada cien conexiones como interrupciones divididas por conexiones y multiplicadas por cien. Cada interrupción es un evento reportado, no una persona afectada. No hay duración, gravedad ni validación independiente de cobertura; comparar solo cantidades absolutas puede inducir a error.

Documento B, estado de los archivos: la tabla llega en una imagen de un PDF; otra hoja tiene columnas “N”, “C” y “S” sin diccionario ni fecha. La propuesta de publicación consiste en un CSV de texto con columnas sector, interrupciones, conexiones, período y fuente; un diccionario define cada variable. Debe añadirse una licencia de reutilización validada por la institución y una forma de notificar errores. No se incluirán contratos individuales ni direcciones de abonados.

Documento C, criterio de valor público: la reutilización permite identificar diferencias y preguntar mejor, pero no autoriza concluir que un sector recibe peor servicio por discriminación. Para escoger una inversión conviene añadir duración, población vulnerable, causas y costos. La recomendación provisional puede priorizar un estudio en Centro porque su tasa es mayor, explicando la limitación.

Tu entrega es una ficha de publicación y una decisión inicial. Conserva el numerador, el denominador y el corte temporal junto a la tasa. Identifica qué registros necesitan validación antes de abrirlos. No cambies las cifras originales para que el gráfico resulte atractivo.`,
    questions: [
      choice(
        "¿Cuál recomendación respeta los datos y sus límites?",
        [
          "Priorizar una investigación en Centro por su tasa, y recabar duración y causas antes de decidir inversión",
          "Afirmar discriminación demostrada por la tabla",
          "Intervenir Norte solo porque tiene más eventos absolutos",
        ],
        0,
        "Centro tiene mayor tasa relativa, pero el registro no permite explicar causas ni valorar impacto completo.",
      ),
      matching(
        "Une cada elemento de publicación con su utilidad.",
        [
          ["CSV con columnas definidas", "Reutilización mediante software"],
          ["Diccionario de datos", "Interpretación de variables y unidades"],
          ["Licencia validada", "Claridad sobre reutilización autorizada"],
          ["Fecha y fuente", "Trazabilidad del conjunto"],
        ],
        "Formato, significado, permisos y procedencia contribuyen a una publicación realmente reutilizable.",
      ),
      ordering(
        "Ordena la preparación del conjunto de datos.",
        [
          "Revisar calidad, alcance y datos personales",
          "Definir variables y transformar a formato reutilizable",
          "Documentar licencia, método y metadatos",
          "Publicar y atender reportes de errores",
        ],
        "Publicar se hace después de la revisión, no como sustituto de ella.",
      ),
      numeric(
        "Calcula la tasa de Centro por cada cien conexiones: 18 eventos y 600 conexiones.",
        3,
        "eventos por 100 conexiones",
        "18 / 600 × 100 = 3. Norte registra 2 y Sur 1; las tasas no representan personas ni duración de afectación.",
      ),
      crossword(
        "Completa términos de datos reutilizables.",
        [
          [
            "LICENCIA",
            "Condiciones que indican cómo puede reutilizarse un recurso.",
          ],
          [
            "DICCIONARIO",
            "Documento que define campos y unidades del conjunto.",
          ],
          [
            "DENOMINADOR",
            "Cantidad de referencia que permite interpretar una proporción.",
          ],
        ],
        "Una tasa sin denominador o un archivo sin significado puede conducir a decisiones equivocadas.",
      ),
    ],
  },
  {
    week: 6,
    unit: unit2,
    title: "S 6. Marco legal del gobierno digital.",
    name: "Matriz de requisitos antes de construir",
    objective:
      "Relacionar decisiones del servicio con obligaciones que deben comprobarse en fuentes oficiales.",
    context: `EXPEDIENTE 06 · Diseño ficticio del portal de certificados de Puerto Claro. La directora pide “cumplir todas las leyes” en una sola casilla. El equipo convierte esa frase en una matriz trazable: norma aplicable, fuente oficial, requisito interpretado, pantalla o proceso donde se cumple, evidencia y responsable de revisión.

Documento A, alcance: el portal recibe solicitudes, trata datos personales, informa decisiones y almacena expedientes. Por ello se deben revisar, entre otros marcos pertinentes, acceso a información pública, protección de datos personales, transacciones y firma electrónica, procedimientos administrativos y accesibilidad. Su aplicabilidad concreta depende de la institución y del servicio. Este ejercicio no asigna artículos ni plazos legales inventados; las reglas operativas indicadas son internas y ficticias.

Documento B, controles registrados: R1 dispone publicar requisitos, costos y canal de consulta; R2 dispone registrar finalidad y fundamento del tratamiento antes de pedir datos; R3 dispone controlar accesos y conservar evidencia de acciones; R4 dispone verificar validez e integridad de certificados electrónicos. De ocho controles previstos, seis tienen responsable, evidencia y validación. Dos figuran únicamente como “cumplido” sin respaldo. La cobertura verificada se calcula usando solo controles con evidencia y validación.

Documento C, conflicto de diseño: marketing quiere publicar expedientes nominales para “ser transparentes”; atención propone publicar estadísticas agregadas y entregar cada expediente únicamente a quien tenga autorización. Transparencia no elimina los deberes de privacidad ni reemplaza la revisión jurídica.

Actúa como analista. Antes de automatizar, separa un requisito legal confirmado de una propuesta interna. Un blog puede orientar la búsqueda, pero no sustituye la fuente normativa vigente ni la interpretación responsable. Tu producto debe conservar título de norma, versión consultada, enlace oficial y fecha de revisión, sin presentar este reto como asesoría jurídica. Cuando haya duda, registra una pregunta y responsable; no inventes una norma para cerrar la matriz.`,
    questions: [
      choice(
        "¿Qué decisión produce una matriz verificable?",
        [
          "Marcar todos los requisitos como cumplidos para avanzar",
          "Relacionar norma vigente, requisito, evidencia, proceso y responsable, y dejar dudas pendientes explícitas",
          "Tomar un blog como única autoridad normativa",
        ],
        1,
        "La matriz permite revisar por qué un requisito existe y qué evidencia sostiene su cumplimiento.",
      ),
      matching(
        "Relaciona cada control con su evidencia.",
        [
          ["R1 Requisitos y costos públicos", "Página de requisitos revisada"],
          [
            "R2 Finalidad del tratamiento",
            "Registro de finalidad y fundamento",
          ],
          [
            "R3 Control de accesos",
            "Prueba de permisos y registro de acciones",
          ],
          [
            "R4 Integridad del certificado",
            "Resultado de validación del documento firmado",
          ],
        ],
        "La evidencia debe demostrar la conducta del control; una casilla no la sustituye.",
      ),
      ordering(
        "Ordena una revisión de cumplimiento.",
        [
          "Delimitar institución, servicio y datos tratados",
          "Localizar normativa vigente en fuentes oficiales",
          "Traducir requisitos a controles y responsables",
          "Probar controles y registrar evidencia y pendientes",
        ],
        "La aplicabilidad y la fuente se revisan antes de comprobar una implementación.",
      ),
      numeric(
        "¿Qué porcentaje de los ocho controles tiene validación y evidencia verificables, si seis están respaldados?",
        75,
        "por ciento",
        "6 / 8 × 100 = 75 %. La cifra expresa cobertura de esta matriz interna, no certificación total de cumplimiento legal.",
      ),
      crossword(
        "Identifica piezas de la matriz.",
        [
          [
            "NORMATIVA",
            "Conjunto de disposiciones aplicables que debe consultarse en fuentes oficiales.",
          ],
          ["EVIDENCIA", "Respaldo verificable que demuestra un control."],
          [
            "RESPONSABLE",
            "Persona o función encargada de comprobar y mantener el requisito.",
          ],
        ],
        "Vincular fuente, evidencia y responsabilidad evita cumplimiento aparente.",
      ),
    ],
  },
  {
    week: 7,
    unit: unit2,
    title: "S 7. Transparencia y acceso a la información pública.",
    name: "Arquitectura de un portal de transparencia",
    objective:
      "Organizar contenido público con metadatos y resolver solicitudes protegiendo información restringida.",
    context: `EXPEDIENTE 07 · Portal ficticio del Instituto Costa Abierta. La portada contiene 28 enlaces llamados “Documento final” y un buscador que no filtra por período. La ciudadanía no encuentra presupuesto, contratos ni mecanismos de consulta. El objetivo de la semana es construir un mapa del sitio que responda a tareas ciudadanas concretas.

Documento A, inventario: hay 12 documentos presupuestarios mensuales; nueve tienen período, fecha de actualización, unidad monetaria y contacto responsable. Tres carecen de fecha y se llaman “nuevo.pdf”. La completitud documental se define aquí como documentos que tienen los cuatro metadatos divididos por documentos presupuestarios inventariados. Un documento completo en metadatos puede seguir teniendo errores de contenido: se requieren ambas revisiones.

Documento B, mapa propuesto: “Presupuesto y ejecución” agrupa series comparables; “Contratación” muestra expedientes publicables y estado; “Cómo solicitar información” explica el canal y permite registrar una petición; “Seguimiento” ofrece el identificador y respuesta autorizada. Los documentos deben tener títulos descriptivos y alternativa accesible. Una búsqueda de presupuesto no debería obligar a conocer la estructura interna de departamentos.

Documento C, solicitud recibida: una persona pide el gasto total del programa y la nómina con cuentas bancarias personales. El primer dato puede prepararse con documentación presupuestaria. El segundo requiere revisión del alcance y de restricciones aplicables; no se comparte automáticamente información bancaria. Si se debe limitar una parte, la institución debe motivar la respuesta conforme a la normativa real que corresponda, no inventar excusas ni bloquear todo el documento sin revisión.

Diseña la estructura para encontrar, comprender y reutilizar. Documenta fecha, fuente y responsable; ofrece un canal para avisar errores. Este caso no fija tiempos legales de respuesta: cualquier plazo efectivo debe obtenerse de la normativa vigente y validarse institucionalmente. Tu prototipo debe separar contenido público y seguimiento privado.`,
    questions: [
      choice(
        "¿Cómo debe tratarse la solicitud con gasto total y cuentas bancarias?",
        [
          "Publicar todas las cuentas para demostrar apertura",
          "Revisar cada parte, preparar gasto documentado y aplicar restricciones justificadas a información bancaria",
          "Negar toda información porque una parte puede ser restringida",
        ],
        1,
        "Una revisión por partes evita tanto divulgación indebida como bloqueo indiscriminado; la motivación depende del marco aplicable.",
      ),
      matching(
        "Une la necesidad ciudadana con el apartado más útil.",
        [
          ["Conocer avance presupuestario", "Presupuesto y ejecución"],
          ["Consultar un proceso de compra", "Contratación"],
          ["Presentar una petición", "Cómo solicitar información"],
          ["Revisar una respuesta autorizada", "Seguimiento privado"],
        ],
        "La arquitectura se organiza por tareas que una persona necesita resolver.",
      ),
      ordering(
        "Ordena la publicación de un documento presupuestario.",
        [
          "Comprobar versión, contenido y datos que pueden publicarse",
          "Asignar título, período, fuente y fecha de actualización",
          "Preparar formato accesible y ubicación temática",
          "Publicar y mantener canal de corrección",
        ],
        "Los metadatos y la accesibilidad forman parte del proceso, no son adornos posteriores.",
      ),
      numeric(
        "Nueve de doce documentos tienen los cuatro metadatos definidos. ¿Cuál es la completitud documental?",
        75,
        "por ciento",
        "9 / 12 × 100 = 75 %. Es completitud de metadatos, no garantía de exactitud del presupuesto.",
      ),
      crossword(
        "Completa términos del portal.",
        [
          [
            "PUBLICIDAD",
            "Disponibilidad de información que corresponde hacer pública.",
          ],
          ["ACTUALIZACION", "Revisión que mantiene el contenido vigente."],
          [
            "MOTIVACION",
            "Explicación razonada que sustenta una decisión institucional.",
          ],
        ],
        "Acceso útil implica contenido localizable y decisiones justificadas sobre su entrega.",
      ),
    ],
  },
  {
    week: 8,
    unit: unit2,
    title: "S 8. Protección de datos personales y privacidad.",
    name: "Rediseñar un formulario que pide demasiado",
    objective:
      "Aplicar minimización, acceso por función y análisis del propósito del tratamiento.",
    context: `EXPEDIENTE 08 · Formulario ficticio de solicitudes de alumbrado. Su versión inicial solicita cédula, nombre, contacto, sector, descripción, fotografía opcional, estado civil, ingresos, religión y fecha de nacimiento. Son diez campos. El análisis del caso considera necesarios los cinco primeros; los demás no son necesarios para recibir y gestionar esta solicitud. La fotografía opcional puede ser útil, pero se debe justificar y revisar su tratamiento por separado; en este ejercicio no forma parte del conjunto mínimo.

Documento A, mapa del tratamiento: atención verifica datos de contacto; la cuadrilla necesita sector y descripción; la dirección recibe cantidades por zona; la persona solicitante consulta exclusivamente su expediente. La propuesta anterior permite a cualquier funcionario descargar todos los campos y publicar nombres en un mapa. Esa amplitud no se justifica por comodidad.

Documento B, aviso de privacidad borrador: identifica a la institución responsable, finalidad, fundamento que debe validar el equipo jurídico, campos necesarios, destinatarios o accesos autorizados, criterio de conservación y canal para ejercer derechos aplicables. No debe afirmarse que todo tratamiento se basa necesariamente en consentimiento: el fundamento depende del caso y debe verificarse.

Documento C, incidentes potenciales: una fotografía puede revelar matrículas o rostros; un reporte con ubicación muy precisa puede identificar un hogar aunque se retire el nombre. Quitar una columna no garantiza anonimización. El sistema debe usar datos ficticios en desarrollo, proteger comunicaciones y controlar permisos desde el servidor, además de la interfaz.

Tu misión es aprobar un formulario mínimo y describir accesos por función. La reducción de campos usa los diez originales como denominador y conserva cinco. No es un indicador suficiente de cumplimiento; siguen pendientes seguridad, derechos, conservación y revisión del fundamento. Presenta una justificación por campo y una tabla de quién necesita cada dato. Evita subir registros reales a herramientas externas para resolver el reto.`,
    questions: [
      choice(
        "¿Qué revisión de privacidad es más completa?",
        [
          "Quitar nombres y declarar anonimización garantizada",
          "Pedir solo datos necesarios, validar fundamento y conservación, controlar accesos y revisar reidentificación",
          "Añadir una casilla de consentimiento y permitir cualquier uso",
        ],
        1,
        "Minimización es una pieza; fundamento, accesos, seguridad, conservación y derechos siguen siendo necesarios.",
      ),
      matching(
        "Une cada función con el acceso mínimo descrito.",
        [
          ["Atención", "Contacto para aclarar una solicitud"],
          ["Cuadrilla", "Sector y descripción del problema"],
          ["Dirección", "Totales agregados por zona"],
          ["Solicitante", "Su propio expediente"],
        ],
        "Los accesos dependen de la necesidad funcional; un cargo público no autoriza descargar todo.",
      ),
      ordering(
        "Ordena el diseño responsable del formulario.",
        [
          "Definir finalidad y validar fundamento del tratamiento",
          "Justificar campos y reducir a los necesarios",
          "Definir accesos, conservación y aviso claro",
          "Probar permisos con datos ficticios y revisar riesgos",
        ],
        "La finalidad guía el dato solicitado; los controles deben comprobarse antes de usar datos reales.",
      ),
      numeric(
        "Se pasa de diez campos a cinco necesarios. ¿Qué porcentaje de campos se elimina?",
        50,
        "por ciento",
        "(10 − 5) / 10 × 100 = 50 %. Reducir campos no demuestra por sí solo conformidad legal.",
      ),
      crossword(
        "Resuelve vocabulario de privacidad.",
        [
          [
            "MINIMIZACION",
            "Limitar datos a los necesarios para una finalidad.",
          ],
          ["FINALIDAD", "Propósito específico por el que se tratan datos."],
          [
            "PRIVACIDAD",
            "Protección de la esfera personal frente a accesos y usos indebidos.",
          ],
        ],
        "Finalidad y necesidad justifican cada campo antes de recopilarlo.",
      ),
    ],
  },
  {
    week: 9,
    unit: unit2,
    title:
      "S.9. Seguridad de la información y gestión de riesgos. S.9. Firma electrónica y autenticación digital",
    name: "Un certificado válido y una cuenta protegida",
    objective:
      "Priorizar riesgos y distinguir autenticación, autorización y firma electrónica.",
    context: `EXPEDIENTE 09 · Piloto ficticio de certificados públicos. El equipo confunde tres controles: autenticación comprueba quién accede; autorización determina qué puede consultar o modificar; firma electrónica, correctamente implementada y validada, puede apoyar integridad y atribución del documento. Una imagen de firma pegada no constituye por sí misma una validación criptográfica.

Documento A, matriz didáctica: el puntaje interno de riesgo es probabilidad por impacto, ambos de uno a cinco. R1, contraseñas compartidas, tiene probabilidad 4 e impacto 5; R2, ausencia de copia de seguridad, 3 y 5; R3, enlace de ayuda roto, 4 y 2. El puntaje solo sirve para ordenar esta discusión; no es una metodología normativa ni demuestra seguridad absoluta. Se incluyen dependencia, costo y continuidad antes de elegir un control.

Documento B, prueba de permisos: Ana puede ver su certificado, pero al cambiar el identificador de la URL también puede abrir el de Luis. El sistema verifica que inició sesión, pero no verifica pertenencia del expediente. Ocultar enlaces no corrige el fallo. El control de autorización debe comprobarse para cada consulta en la capa que entrega los datos.

Documento C, verificación de un certificado firmado: se revisa integridad del archivo, identidad y cadena de confianza del certificado, estado o validez según el contexto y la política institucional aplicable. Una firma que falla no se acepta solo porque su imagen se ve bien. La verificación debe conservar un resultado rastreable.

Actúa como responsable del piloto. Prioriza riesgos, diseña una prueba negativa entre cuentas y un recorrido de emisión. No publiques claves, certificados privados ni cédulas reales en el repositorio. La respuesta a un incidente debe preservar evidencia, limitar el daño y restaurar servicio según el plan. La copia de seguridad necesita una prueba de restauración; existir un archivo no garantiza recuperación.`,
    questions: [
      choice(
        "¿Qué corrige que Ana abra el expediente de Luis?",
        [
          "Ocultar el enlace en la pantalla",
          "Verificar autorización y pertenencia en cada solicitud de datos, y probar cuentas cruzadas",
          "Cambiar el color del botón de descarga",
        ],
        1,
        "El fallo es de autorización. La interfaz no puede proteger por sí sola el acceso a datos.",
      ),
      matching(
        "Une cada control con lo que comprueba.",
        [
          ["Autenticación", "Identidad del acceso"],
          ["Autorización", "Permiso sobre una acción o expediente"],
          [
            "Validación de firma",
            "Integridad y atribución según el certificado",
          ],
          [
            "Restauración de respaldo",
            "Capacidad efectiva de recuperar información",
          ],
        ],
        "Son controles diferentes y complementarios; ninguno reemplaza a los otros.",
      ),
      ordering(
        "Ordena un flujo de emisión segura.",
        [
          "Autenticar al solicitante",
          "Comprobar autorización y requisitos del expediente",
          "Emitir y firmar el certificado con control institucional",
          "Validar documento y registrar entrega trazable",
        ],
        "Autenticar no basta: se debe verificar permiso, emitir bajo control y validar el resultado.",
      ),
      numeric(
        "Calcula el puntaje de R1 según la matriz interna: probabilidad 4 e impacto 5.",
        20,
        "puntos",
        "4 × 5 = 20. R2 obtiene 15 y R3 8. Este esquema didáctico prioriza discusión, no certifica seguridad.",
      ),
      crossword(
        "Completa términos de seguridad.",
        [
          [
            "INTEGRIDAD",
            "Propiedad que permite detectar alteraciones no autorizadas.",
          ],
          [
            "AUTORIZACION",
            "Decisión sobre qué recursos y acciones están permitidos.",
          ],
          [
            "RESPALDO",
            "Copia protegida cuya utilidad debe comprobarse mediante restauración.",
          ],
        ],
        "La protección se verifica con pruebas de permisos, validación y recuperación.",
      ),
    ],
  },
  {
    week: 10,
    unit: unit3,
    title:
      "S 10. Transformación digital del Estado (definición, evolución, modelos)",
    name: "Elegir una transformación viable",
    objective:
      "Comparar alternativas por valor público, inclusión y evidencia antes de implementar.",
    context: `EXPEDIENTE 10 · Comité ficticio de transformación de Puerto Claro. Se presentan tres proyectos: A compra una pantalla nueva sin modificar el trámite; B rediseña solicitud y seguimiento, comparte información autorizada entre áreas y mantiene ayuda; C impone una aplicación móvil con registro presencial obligatorio para obtener la clave. El comité debe elegir un piloto, no una transformación total sin pruebas.

Documento A, diagnóstico inicial: un trámite tarda doce días. Cuatro corresponden a reingresar información, cinco a revisión de requisitos y tres a notificar una decisión. El proyecto B elimina dos días de reingreso y dos de notificación. La revisión mantiene cinco días porque el equipo todavía no dispone de evidencia para acelerarla. La meta estimada es ocho días; se debe medir en un piloto antes de anunciarla como resultado.

Documento B, capacidades: existen dos funcionarias de atención, un responsable de datos y soporte compartido. El presupuesto no cubre una aplicación distinta para cada área. La coordinación del proceso y un expediente común autorizado aportan más que automatizar el mismo papel fragmentado. La propuesta incluye capacitación, manejo de excepciones, canal asistido y política para medir resultados.

Documento C, ficha conceptual: transformar significa revisar servicios, organización, capacidades y decisiones con tecnología pertinente. La evolución desde informar en la web hacia interacción, transacción e integración no implica que toda institución deba ejecutar la misma secuencia rígida. Madurez se observa mediante prácticas y resultados, no solo por cantidad de pantallas.

Tu tarea es justificar la alternativa con los tiempos y recursos del expediente. Evita presentar la estimación como causalidad demostrada o sustituir revisión responsable por automatización ciega. Define qué medir: tiempo de resolución, errores, finalización por tipo de usuario y costos. Una mejora que acelera el promedio mientras excluye usuarios necesita revisión. Identifica un criterio de salida del piloto y una condición para ampliarlo.`,
    questions: [
      choice(
        "¿Qué alternativa se alinea mejor con el diagnóstico y los recursos?",
        [
          "A porque una pantalla nueva garantiza transformación",
          "B como piloto con integración autorizada, ayuda y medición",
          "C porque exigir otra visita mejora inclusión",
        ],
        1,
        "B aborda reingreso y notificación y reconoce capacidades y barreras; su impacto aún debe verificarse.",
      ),
      matching(
        "Relaciona la decisión con la dimensión del cambio.",
        [
          ["Expediente compartido autorizado", "Integración de procesos"],
          ["Capacitar a las funcionarias", "Capacidades del personal"],
          ["Mantener atención asistida", "Inclusión ciudadana"],
          ["Medir tiempos y errores", "Gestión orientada a resultados"],
        ],
        "La transformación combina proceso, personas, inclusión y evaluación; la herramienta no actúa sola.",
      ),
      ordering(
        "Ordena la transformación del servicio.",
        [
          "Validar problema y necesidad ciudadana",
          "Priorizar proceso y capacidades para un piloto",
          "Implementar y acompañar al equipo",
          "Evaluar resultados, corregir y decidir expansión",
        ],
        "El piloto debe producir evidencia para decidir si conviene ampliar la intervención.",
      ),
      numeric(
        "De doce días se eliminan dos de reingreso y dos de notificación. ¿Cuál es el tiempo estimado restante?",
        8,
        "días",
        "12 − 2 − 2 = 8 días. Es estimación del diseño; la medición posterior puede diferir.",
      ),
      crossword(
        "Completa conceptos de transformación.",
        [
          [
            "MADUREZ",
            "Desarrollo de capacidades y prácticas digitales verificables.",
          ],
          [
            "INTEGRACION",
            "Coordinación de información y procesos entre componentes.",
          ],
          ["PILOTO", "Implementación acotada para aprender antes de ampliar."],
        ],
        "La madurez se demuestra con capacidades y resultados; un piloto reduce incertidumbre.",
      ),
    ],
  },
  {
    week: 11,
    unit: unit3,
    title: "S11. Actores de la transformación digital del Estado",
    name: "Quién decide, quién opera y quién necesita ayuda",
    objective:
      "Mapear actores y responsabilidades para una experiencia centrada en la ciudadanía.",
    context: `EXPEDIENTE 11 · Equipo ficticio del servicio Puerto Claro Responde. La directora solicita un prototipo y descubre que tecnología puede construirlo, pero no puede decidir por sí sola qué requisito legal exige atención ni qué dato necesita una cuadrilla. La transformación necesita coordinación y responsabilidades explícitas.

Documento A, mapa de actores: ciudadanía presenta solicitudes y valida comprensión del recorrido; atención es responsable de registrar y aclarar; la dirección del servicio aprueba prioridades y resultado esperado; tecnología mantiene disponibilidad y permisos; el equipo jurídico y de protección de datos revisa requisitos y tratamiento; organizaciones comunitarias ayudan a identificar barreras. El proveedor puede ejecutar una integración, pero no sustituye la responsabilidad institucional.

Documento B, matriz de prueba: seis actividades necesitan una función que rinda cuentas del resultado y una o varias que ejecuten. Cinco tienen responsable de aprobación definido. “Resolver solicitudes urgentes” tiene tres personas marcadas como aprobadoras sin acuerdo sobre quién decide. Para este ejercicio, la cobertura clara cuenta solo actividades con una función de rendición de cuentas inequívoca. La matriz distingue R, ejecuta; A, responde por el resultado; C, es consultado; I, recibe información.

Documento C, entrevistas de navegación: Carmen usa teléfono y conexión irregular; Andrés utiliza lector de pantalla; una persona de atención procesa veinte expedientes por turno. Ninguna experiencia representa a todos. Un flujo debe permitir encontrar requisitos, enviar, obtener identificador y conocer estado, con una alternativa asistida y ayudas accesibles. Se prueba con diversidad de usuarios, sin pedir datos reales innecesarios.

Actúa como facilitador. Identifica a quien decide, quien opera y quien debe ser escuchado. Reparte tareas sin transformar una consulta en aprobación obligatoria de cada pantalla. La cobertura de responsables es una señal de coordinación, no prueba de capacidad real. Tu entrega es una matriz breve y una invitación de prueba que explique propósito, tareas, consentimiento cuando corresponda y uso de resultados.`,
    questions: [
      choice(
        "¿Cómo resolver la actividad con tres aprobadores contradictorios?",
        [
          "Asignarla solo al proveedor y retirar a la institución",
          "Acordar una función A inequívoca, ejecutores y consultas pertinentes",
          "Eliminar la actividad para mejorar la cobertura",
        ],
        1,
        "La rendición de cuentas necesita una decisión clara. Colaborar no exige ambigüedad sobre aprobación.",
      ),
      matching(
        "Relaciona las letras RACI con su significado.",
        [
          ["R", "Ejecuta la actividad"],
          ["A", "Responde por el resultado"],
          ["C", "Es consultado antes de decidir"],
          ["I", "Recibe información relevante"],
        ],
        "RACI ayuda a coordinar funciones; no sustituye comprobar recursos y competencias.",
      ),
      ordering(
        "Ordena el trabajo con actores.",
        [
          "Identificar usuarios y funciones institucionales",
          "Escuchar necesidades y barreras concretas",
          "Acordar responsabilidades y flujo de decisiones",
          "Probar la experiencia y devolver hallazgos",
        ],
        "Escuchar y asignar responsabilidades prepara una prueba que pueda conducir a correcciones.",
      ),
      numeric(
        "Cinco de seis actividades tienen una función A inequívoca. ¿Cuál es la cobertura clara? Redondea a dos decimales.",
        83.33,
        "por ciento",
        "5 / 6 × 100 = 83,33 %. No se cuenta como resuelta la actividad con aprobación contradictoria.",
      ),
      crossword(
        "Completa términos de coordinación.",
        [
          [
            "CIUDADANIA",
            "Personas que utilizan y deben poder influir en el servicio público.",
          ],
          [
            "GOBERNANZA",
            "Reglas y responsabilidades para dirigir y coordinar decisiones.",
          ],
          [
            "CONSULTA",
            "Solicitud de criterios a actores pertinentes antes de decidir.",
          ],
        ],
        "Una transformación centrada en las personas articula necesidades y decisiones institucionales.",
      ),
    ],
  },
  {
    week: 12,
    unit: unit3,
    title: "S12. Procesos de transformación digital del Estado.",
    name: "Construir un flujo sin transcripciones repetidas",
    objective:
      "Rediseñar un proceso y preparar una estructura funcional con controles y excepciones.",
    context: `EXPEDIENTE 12 · Proceso ficticio de certificados en Costa Abierta. El equipo construirá un prototipo en Google Sites, como propone el sílabo, o representará la misma estructura en un editor equivalente. El prototipo educativo muestra contenido y recorrido; no implica que un sitio público deba almacenar expedientes privados sin un sistema autorizado.

Documento A, recorrido actual: recibir formulario toma diez minutos; transcribirlo quince; revisar requisitos veinte; notificar por llamada diez. Son tiempos de trabajo por expediente, no días de espera ni duración total del trámite. La propuesta usa captura única con validación y elimina los quince minutos de transcripción. No altera el tiempo de revisión ni de notificación en esta fase.

Documento B, estructura del sitio: inicio con propósito y ayuda; requisitos con documentos y costos verificados; solicitar con instrucciones; seguimiento con mecanismo autorizado; preguntas frecuentes; información de privacidad y contacto. Cada página responde a una tarea. Los enlaces de “solicitar” y “consultar” deben distinguirse. No se publican números de expedientes reales ni listados de personas.

Documento C, excepciones: un campo incompleto se explica antes de enviar; una caída de conexión no debe convertir un borrador en entrega confirmada; un requisito que necesita revisión genera un estado comprensible y una opción de aclaración. La confirmación debe incluir identificador, fecha y próximo paso. Un mapa de flujo incluye tanto el camino esperado como esos desvíos.

Actúa como diseñador de proceso. Calcula trabajo administrativo con las unidades correctas y no anuncies que el trámite bajó exactamente quince días. Prepara títulos, enlaces y contenido antes de decorar. Cada cambio necesita dueño y verificación. Para evaluar, pide a una persona encontrar requisitos y seguir un trámite simulado sin explicaciones adicionales. Registra dónde duda y corrige el contenido o la ruta; culpar al usuario no mejora el proceso.`,
    questions: [
      choice(
        "¿Qué conclusión es correcta sobre la mejora propuesta?",
        [
          "Reduce quince minutos de trabajo por expediente; falta medir espera y efectos reales",
          "Reduce exactamente quince días de resolución",
          "Elimina toda revisión administrativa",
        ],
        0,
        "El expediente aporta tiempos de trabajo, no días de espera. La eliminación afecta únicamente la transcripción.",
      ),
      matching(
        "Relaciona la página con su tarea ciudadana.",
        [
          ["Requisitos", "Preparar lo necesario antes de solicitar"],
          ["Solicitar", "Iniciar y revisar el envío"],
          ["Seguimiento", "Conocer estado y próximo paso"],
          ["Ayuda y contacto", "Resolver dudas o pedir asistencia"],
        ],
        "El mapa se evalúa por las tareas que permite completar.",
      ),
      ordering(
        "Ordena un envío con controles y confirmación.",
        [
          "Consultar requisitos",
          "Completar campos y corregir errores detectados",
          "Revisar información y confirmar envío",
          "Recibir identificador y conocer siguiente paso",
        ],
        "La confirmación debe producirse después de un envío válido, no al abrir el formulario.",
      ),
      numeric(
        "El trabajo actual suma 10 + 15 + 20 + 10 minutos. Eliminando únicamente la transcripción de 15 minutos, ¿cuánto trabajo queda?",
        40,
        "minutos por expediente",
        "55 − 15 = 40 minutos. Esto no mide tiempo de espera ni duración total del servicio.",
      ),
      crossword(
        "Identifica conceptos del flujo.",
        [
          [
            "VALIDACION",
            "Comprobación de que datos y requisitos satisfacen reglas definidas.",
          ],
          [
            "EXCEPCION",
            "Situación que necesita una ruta distinta del flujo habitual.",
          ],
          [
            "CONFIRMACION",
            "Evidencia de que el envío se recibió con identificador y siguiente paso.",
          ],
        ],
        "Los desvíos y estados comprensibles son parte del diseño funcional.",
      ),
    ],
  },
  {
    week: 13,
    unit: unit3,
    title:
      "S13. Implementación de servicios digitales (UX, herramientas digitales).",
    name: "Validar un servicio antes de compartirlo",
    objective:
      "Implementar y comprobar navegación, accesibilidad y herramientas con pruebas de tareas.",
    context: `EXPEDIENTE 13 · Prototipo ficticio de Puerto Claro Responde. El equipo integra un formulario, una guía descargable y un canal de consulta. El prototipo tiene diez participantes en una prueba; ocho logran enviar una solicitud válida sin ayuda. Dos se detienen porque el botón “Listo” parece guardar, pero en realidad abre otro formulario. La prueba mide esa tarea y esa muestra, no toda la población.

Documento A, observaciones: una persona que navega con teclado no puede activar un elemento diseñado como texto con clic; otra no identifica un mensaje de error porque solo cambia a rojo. En un teléfono, la tabla de requisitos provoca desplazamiento horizontal. La guía PDF contiene una imagen del texto sin alternativa, y su enlace no avisa el formato ni tamaño. Un botón de WhatsApp publica automáticamente el relato en un mensaje; debe evitarse enviar datos sensibles por herramientas no autorizadas.

Documento B, ajustes propuestos: etiquetas claras de “Revisar” y “Enviar solicitud”; controles que funcionen con teclado y foco visible; errores con texto y relación con el campo; requisitos en diseño adaptable; guía con texto accesible y título descriptivo. Integrar una herramienta requiere valorar permisos, datos transmitidos y dependencia; no basta que el botón funcione.

Documento C, verificación: casos positivos y negativos del formulario, navegación en móvil y escritorio, teclado, enlaces y descarga; revisión de permisos y de contenido. Se registra resultado esperado, resultado observado, gravedad y evidencia. Después se corrige y repite la prueba afectada. Una pantalla atractiva no autoriza publicar un flujo que expone expedientes.

Tu misión es preparar la salida del piloto. Priorizas fallos que impiden tareas o afectan datos antes que sombras y animaciones. Calcula éxito de tarea sin ocultar los dos fallos. Conserva las limitaciones de la muestra y define pruebas adicionales; no uses ese porcentaje como certificación de accesibilidad.`,
    questions: [
      choice(
        "¿Qué ajuste merece prioridad antes de difundir el prototipo?",
        [
          "Añadir animaciones sin corregir navegación",
          "Corregir controles, errores y envío; revisar los datos que reciben herramientas externas",
          "Contar solo a quienes completaron para informar 100 %",
        ],
        1,
        "Se priorizan acceso efectivo y tratamiento seguro de datos; la muestra incluye fallos que deben investigarse.",
      ),
      matching(
        "Une el hallazgo con la corrección adecuada.",
        [
          [
            "Control que no responde al teclado",
            "Botón semántico y foco visible",
          ],
          [
            "Error indicado solo en rojo",
            "Texto explicativo asociado al campo",
          ],
          [
            "Tabla más ancha que el móvil",
            "Presentación adaptable de requisitos",
          ],
          [
            "PDF imagen sin alternativa",
            "Texto accesible y descarga descriptiva",
          ],
        ],
        "Las correcciones permiten completar tareas con dispositivos y capacidades diferentes.",
      ),
      ordering(
        "Ordena un ciclo de prueba de implementación.",
        [
          "Definir tarea y resultado esperado",
          "Observar ejecución y registrar fallos",
          "Corregir causas priorizadas",
          "Repetir la prueba afectada y documentar el resultado",
        ],
        "Validar implica comparar conducta esperada y real, corregir y volver a observar.",
      ),
      numeric(
        "Ocho de diez participantes enviaron una solicitud válida sin ayuda. ¿Cuál es la tasa de éxito observada?",
        80,
        "por ciento",
        "8 / 10 × 100 = 80 %. Es un resultado de la muestra, no una garantía para todos los usuarios.",
      ),
      crossword(
        "Resuelve términos de experiencia y prueba.",
        [
          [
            "PROTOTIPO",
            "Representación funcional utilizada para probar un servicio.",
          ],
          [
            "FOCO",
            "Indicador de qué control recibe la interacción de teclado.",
          ],
          ["ITERACION", "Ciclo de prueba y ajuste que mejora el resultado."],
        ],
        "La experiencia se valida mediante tareas y correcciones, no solo con opiniones estéticas.",
      ),
    ],
  },
  {
    week: 14,
    unit: unit4,
    title:
      "S 14. Infraestructura tecnológica y plataformas del gobierno digital. S. 14. Analítica web",
    name: "Leer un embudo sin confundir visitas con personas",
    objective:
      "Interpretar analítica y requisitos de infraestructura con indicadores definidos y privacidad.",
    context: `EXPEDIENTE 14 · Panel ficticio del servicio Puerto Claro Responde. Durante siete días se registran 1.000 sesiones de entrada, 700 sesiones que llegan a requisitos, 400 que inician formulario y 300 que generan confirmación válida. Son sesiones, no personas únicas: una persona puede entrar varias veces. El embudo atribuye pasos dentro de la misma sesión según la regla del piloto.

Documento A, eventos: “ver_requisitos”, “iniciar_solicitud” y “confirmacion_valida” son nombres técnicos. Una confirmación se registra después de respuesta válida del servidor; el clic sobre enviar no es suficiente. No se incluye cédula, correo ni contenido del relato en la herramienta analítica. Se deben revisar configuración, fundamento y avisos que correspondan antes de recoger datos en producción.

Documento B, operación: el mes tiene 43.200 minutos; se registraron 216 minutos de indisponibilidad. Se define disponibilidad observada como minutos sin indisponibilidad divididos por minutos totales. Para el reto ambos tiempos cubren el mismo período y no se excluye mantenimiento. Una medición necesita indicar qué recurso se vigiló; que cargue la portada no demuestra que funcione el formulario.

Documento C, infraestructura: HTTPS protege la comunicación en tránsito; copias de seguridad apoyan recuperación; monitoreo detecta fallos; permisos limitan acceso. El alojamiento de una página estática sirve la interfaz, pero los expedientes privados requieren autenticación y almacenamiento con controles adecuados. El proveedor de analítica no debe recibir automáticamente toda la información disponible.

Actúa como analista del servicio. Describe el mayor descenso del embudo usando numerador, denominador y unidad correctos. Evita explicar abandono como causa probada: los registros muestran dónde ocurre, no por qué. Propón una prueba o entrevista para contrastar hipótesis. Diferencia volumen, conversión y disponibilidad; medir más datos personales no equivale a comprender mejor el servicio.`,
    questions: [
      choice(
        "¿Qué interpretación del embudo es defendible?",
        [
          "300 personas únicas completaron con certeza",
          "Hay 300 sesiones con confirmación; hace falta investigar causas de los descensos sin incluir datos personales innecesarios",
          "Todos los abandonos se explican por lentitud demostrada",
        ],
        1,
        "La unidad es sesión. El embudo describe conducta registrada; no establece causas ni personas únicas.",
      ),
      matching(
        "Relaciona cada componente con su aporte.",
        [
          ["HTTPS", "Protección de comunicación en tránsito"],
          ["Monitoreo", "Detección de fallos del recurso observado"],
          ["Respaldo probado", "Recuperación tras pérdida de datos"],
          ["Analítica de eventos", "Observación del recorrido definido"],
        ],
        "Infraestructura y analítica cumplen funciones distintas; deben evaluarse con alcance explícito.",
      ),
      ordering(
        "Ordena el diseño de una medición responsable.",
        [
          "Definir decisión e indicador con su unidad",
          "Elegir eventos mínimos sin datos personales innecesarios",
          "Comprobar instrumentación y períodos comparables",
          "Interpretar con límites y contrastar hipótesis",
        ],
        "Un evento mal definido produce una cifra vistosa pero poco útil para decidir.",
      ),
      numeric(
        "El período tiene 43.200 minutos y 216 de indisponibilidad. ¿Cuál es la disponibilidad observada?",
        99.5,
        "por ciento",
        "(43.200 − 216) / 43.200 × 100 = 99,50 %. El alcance del recurso vigilado debe acompañar la cifra.",
      ),
      crossword(
        "Completa términos de medición.",
        [
          [
            "SESION",
            "Unidad de visita definida por la herramienta, que no equivale siempre a una persona.",
          ],
          [
            "EVENTO",
            "Acción registrada con una definición técnica verificable.",
          ],
          [
            "EMBUDO",
            "Secuencia que muestra progresión y descensos entre pasos.",
          ],
        ],
        "Las definiciones evitan interpretar visitas y clics como identidades o resoluciones.",
      ),
    ],
  },
  {
    week: 15,
    unit: unit4,
    title:
      "S.15. Indicadores de gestión (KPIs). S.15. Evaluación y mejora de servicios digitales",
    name: "Un plan de mejora que pueda comprobarse",
    objective:
      "Formular indicadores y priorizar acciones con datos comparables, riesgos y metas revisables.",
    context: `EXPEDIENTE 15 · Comité ficticio de calidad de Puerto Claro. El objetivo es mejorar la finalización válida, sin deteriorar accesibilidad ni seguridad. En el período base hubo 400 inicios y 240 confirmaciones válidas. Tras un piloto de mejora hubo 500 inicios y 350 confirmaciones válidas. Ambos períodos usan la misma definición del evento, pero distintos usuarios y momentos; la comparación describe un cambio observado, no demuestra por sí sola causalidad.

Documento A, ficha de indicador: nombre, propósito, fórmula, numerador, denominador, fuente, periodicidad, responsable y limitaciones. “Visitas totales” no sustituye resolución. La tasa de finalización válida es confirmaciones divididas por inicios. Una meta debe indicar plazo y condiciones; se propone revisar mensualmente y desagregar por dispositivo cuando haya calidad y cobertura suficientes.

Documento B, opciones de mejora: A cuesta USD 500, corrige errores de etiquetas y permite teclado; B cuesta USD 900 y añade animación; C cuesta USD 700, mejora mensajes de estado y seguimiento. Se cuenta con USD 1.200. La evidencia de pruebas identifica problemas de teclado y consultas repetidas sobre estado. Se propone A más C como combinación que atiende ambos hallazgos. Eso no asegura éxito: las acciones necesitan prueba y seguimiento.

Documento C, plan: cada acción incluye problema y evidencia, resultado esperado, encargado, fecha, costo e indicador; también condiciones para detener o ajustar si aparecen riesgos. El plan mantiene un canal asistido y revisión de permisos. No se ocultan fallos ni se cambian las definiciones para producir una mejora aparente.

Actúa como responsable de seguimiento. Distingue porcentaje de cambio relativo y puntos porcentuales. Compara tasas, no solo cantidades, porque los inicios difieren. Decide con presupuesto y evidencia; documenta incertidumbre. Un KPI sirve para orientar el servicio y contrastar acciones, no para reemplazar juicio profesional ni todo lo que valoran los usuarios.`,
    questions: [
      choice(
        "¿Qué inversión encaja con el presupuesto y los hallazgos?",
        [
          "A + C, USD 1.200, con pruebas de teclado y seguimiento",
          "B sola, porque animación garantiza resolución",
          "A + B, sin revisar que supera el presupuesto",
        ],
        0,
        "A y C suman USD 1.200 y abordan los problemas observados. Sus efectos deben comprobarse.",
      ),
      matching(
        "Une cada pieza de la ficha KPI con su función.",
        [
          ["Fórmula", "Regla reproducible del cálculo"],
          ["Fuente", "Origen verificable de los registros"],
          ["Responsable", "Función que revisa y actúa sobre el dato"],
          ["Limitación", "Condición que acota la interpretación"],
        ],
        "Una cifra útil conserva cálculo, procedencia, responsabilidad y alcance.",
      ),
      ordering(
        "Ordena la mejora orientada por evidencia.",
        [
          "Definir línea base y problema observado",
          "Priorizar acciones con costo, riesgo y resultado esperado",
          "Ejecutar un piloto y medir con definiciones estables",
          "Comparar, explicar límites y ajustar el plan",
        ],
        "Mantener definiciones comparables permite aprender; la observación temporal sola no prueba causalidad.",
      ),
      numeric(
        "La tasa pasó de 240/400 = 60 % a 350/500 = 70 %. ¿Cuál es el aumento en puntos porcentuales?",
        10,
        "puntos porcentuales",
        "70 − 60 = 10 puntos porcentuales. El cambio relativo sería 10/60 × 100 = 16,67 %, una medida diferente.",
      ),
      crossword(
        "Identifica vocabulario de evaluación.",
        [
          [
            "INDICADOR",
            "Medida definida para observar un resultado relevante.",
          ],
          ["LINEABASE", "Valor inicial con el que se compara el cambio."],
          ["META", "Resultado esperado con alcance y plazo establecidos."],
        ],
        "La línea base y una meta explícita ayudan a decidir si la intervención merece continuar.",
      ),
    ],
  },
  {
    week: 16,
    unit: unit4,
    title: "S 16. Evaluación Final",
    name: "Defensa del servicio ciudadano",
    objective:
      "Integrar diagnóstico, requisitos, prototipo y plan de mejora con una argumentación sustentada.",
    context: `EXPEDIENTE FINAL · Defensa del proyecto ficticio Puerto Claro Responde. El comité recibe un dossier con cuatro hitos: diagnóstico ciudadano, arquitectura y requisitos, prototipo funcional y plan de mejora. La evaluación exige explicar cómo cada decisión se sostiene en evidencia y reconocer lo que aún no está validado.

Documento A, resultados del piloto: 200 solicitudes comenzaron; 150 se confirmaron válidamente; 120 obtuvieron resolución dentro de la meta interna. El denominador de resolución a tiempo es el de solicitudes confirmadas, no todos los inicios. La meta es interna de esta simulación y no se presenta como un plazo legal. Se reportaron dos casos de navegación por teclado incompleta, corregidos y vueltos a probar. Un permiso cruzado sigue pendiente: una cuenta pudo consultar el expediente de otra. Ese fallo impide usar datos reales aunque el resto de indicadores sea atractivo.

Documento B, respaldo de decisiones: entrevistas muestran dificultad para conocer el estado; el prototipo incorpora seguimiento; la prueba mide consultas y éxito de tarea. La matriz legal conserva fuentes oficiales y pendientes de revisión. Los datos de prueba son ficticios. El formulario solicita solo campos justificados, pero la política de conservación aún requiere aprobación institucional.

Documento C, rúbrica de defensa: diagnóstico con necesidades y límites; arquitectura comprensible y requisitos trazables; demostración funcional con prueba positiva y negativa; indicadores reproducibles y plan con responsables. Un portafolio de capturas sin argumentos no basta. Tampoco basta un porcentaje alto si existen riesgos que invalidan el uso.

Tu rol es defender una decisión de salida: continuar el piloto educativo, corregir permisos, validar conservación y repetir pruebas antes de incorporar personas reales. Calcula el indicador solicitado con su denominador correcto. Explica qué fue observado, qué es hipótesis y qué sigue pendiente. El comité debe poder reconstruir tus cálculos y consultar evidencia sin recibir datos personales ni credenciales.`,
    questions: [
      choice(
        "¿Qué decisión de salida es responsable?",
        [
          "Publicar con datos reales porque la tasa de resolución es alta",
          "Continuar con datos ficticios, corregir permiso cruzado y validar pendientes antes de uso real",
          "Ocultar el fallo cruzado para no afectar la presentación",
        ],
        1,
        "Un resultado operativo favorable no compensa exposición de expedientes ni controles pendientes.",
      ),
      matching(
        "Relaciona cada hito con su evidencia principal.",
        [
          ["Diagnóstico", "Necesidades ciudadanas y problema sustentado"],
          ["Arquitectura", "Mapa, contenidos y requisitos trazables"],
          ["Implementación", "Prototipo y pruebas positivas y negativas"],
          ["Mejora", "Indicadores y acciones con responsables"],
        ],
        "La defensa debe vincular cada afirmación con la evidencia correspondiente del proyecto.",
      ),
      ordering(
        "Ordena la presentación de una defensa sustentada.",
        [
          "Exponer necesidad y evidencia del diagnóstico",
          "Justificar arquitectura y requisitos del servicio",
          "Demostrar prototipo y resultados de pruebas",
          "Interpretar indicadores, límites y próximos pasos",
        ],
        "El comité comprende mejor la solución cuando conoce primero el problema y luego el respaldo de las decisiones.",
      ),
      numeric(
        "De 150 solicitudes confirmadas, 120 se resolvieron dentro de la meta interna. ¿Cuál es la tasa de resolución a tiempo definida?",
        80,
        "por ciento",
        "120 / 150 × 100 = 80 %. Usar 200 como denominador produciría una métrica distinta del indicador solicitado.",
      ),
      crossword(
        "Completa conceptos de la defensa.",
        [
          [
            "DIAGNOSTICO",
            "Explicación de un problema apoyada en necesidades y evidencia.",
          ],
          [
            "VALIDACION",
            "Comprobación de una solución frente a criterios definidos.",
          ],
          [
            "DEFENSA",
            "Argumentación del proyecto que conecta decisiones, evidencia y límites.",
          ],
        ],
        "Una defensa sólida reconoce pendientes y riesgos, además de presentar resultados.",
      ),
    ],
  },
];

function references(week) {
  const base = [
    {
      name: "Sílabo GIG-406 · ULEAM · 2026-2",
      url: "./documents/geap-silabo.pdf",
    },
  ];
  if (week <= 5)
    return [
      ...base,
      {
        name: "ONU · Encuesta de gobierno electrónico (marco complementario)",
        url: "https://publicadministration.un.org/egovkb/en-us/Reports/UN-E-Government-Survey-2024",
      },
    ];
  if (week === 6 || week === 7)
    return [
      ...base,
      {
        name: "Defensoría del Pueblo del Ecuador · fuente institucional",
        url: "https://www.dpe.gob.ec/",
      },
      {
        name: "MINTEL · fuente institucional de gobierno digital",
        url: "https://www.telecomunicaciones.gob.ec/",
      },
    ];
  if (week === 8)
    return [
      ...base,
      {
        name: "Superintendencia de Protección de Datos Personales del Ecuador",
        url: "https://spdp.gob.ec/",
      },
    ];
  if (week === 9)
    return [
      ...base,
      {
        name: "NIST · Marco de ciberseguridad (referencia complementaria)",
        url: "https://www.nist.gov/cyberframework",
      },
    ];
  if (week === 12)
    return [
      ...base,
      {
        name: "Ayuda oficial de Google Sites",
        url: "https://support.google.com/sites/?hl=es",
      },
    ];
  if (week === 13)
    return [
      ...base,
      {
        name: "W3C · Introducción a accesibilidad web",
        url: "https://www.w3.org/WAI/fundamentals/accessibility-intro/es",
      },
    ];
  return [
    ...base,
    {
      name: "OCDE · Gobierno digital (referencia complementaria)",
      url: "https://www.oecd.org/en/topics/digital-government.html",
    },
  ];
}

export const geapCourse = {
  id: "gig-406",
  code: "GIG-406",
  name: "Gobierno Electrónico y Administración Pública",
  teacher: "ANDRADE ALVARADO SONIA PATRICIA",
  level: "Nivel 4 · Paralelo A",
  academicPeriod: "2026-2 PERIODO ORDINARIO",
  credits: "3.00",
  hours: "144 horas · 64 docencia / 32 práctica / 48 autónomo",
  description:
    "Diseña, implementa y evalúa servicios digitales centrados en la ciudadanía, con transparencia, privacidad y evidencia.",
  icon: "landmark",
  status: "activo",
  badge: "Servicio público digital",
  syllabusSource: "./documents/geap-silabo.pdf",
  syllabusNotes:
    "Se conservan todos los contenidos numerados. S3 agrupa sus dos subtemas; S9, S14 y S15 reúnen los dos rótulos de cada semana. La evaluación S16 se presenta después de S15 siguiendo la numeración del sílabo.",
  weeks: documents.map(({ week, unit, title }) => ({
    weekNumber: week,
    unit,
    title,
    enterpriseCase: "Expediente educativo · instituciones ficticias",
    maxAttempts: 2,
  })),
  activities: documents.map(
    ({ week, name, objective, context, questions }) => ({
      week,
      name,
      objective,
      context,
      label: "Simulación educativa · Datos ficticios",
      references: references(week),
      questions: questions.map((q, i) => ({
        ...q,
        id: `geap-w${week}-q${i + 1}`,
      })),
    }),
  ),
};
