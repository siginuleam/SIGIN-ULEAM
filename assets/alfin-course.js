import { syllabus } from "./syllabus.js";

// Todos los expedientes son simulaciones creadas para aprender. Ninguna cifra describe una empresa real.
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
const numeric = (prompt, correct, unit, explanation, tolerance = 0.01) => ({
  type: "numeric",
  prompt,
  correct,
  unit,
  tolerance,
  explanation,
});
const crossword = (prompt, entries, explanation) => ({
  type: "crossword",
  prompt,
  entries: entries.map(([word, clue]) => ({ word, clue })),
  explanation,
});

const activities = [
  {
    week: 1,
    name: "Sala de decisiones: ¿qué información permite reponer?",
    objective:
      "Convertir registros dispersos en una decisión trazable, distinguiendo datos, información y conocimiento.",
    context: `EXPEDIENTE 01 · Tienda ficticia Costa Viva. Eres analista de información y debes entregar una recomendación de reposición del arroz de 1 kg antes de las 11:00. El proveedor entrega mañana; cada caja contiene 12 paquetes. No se permite afirmar que estas son prácticas de una cadena real.

Documento A, cierre de inventario del lunes a las 18:00: existen 72 paquetes; 12 están dañados y no pueden venderse. Documento B, reservas confirmadas para el martes: 24 paquetes, que se retirarán antes del cierre. Documento C, estimación de ventas adicionales: 24 paquetes el martes y 60 el miércoles, total 84, calculada a partir de cuatro semanas comparables. Las reservas no están incluidas en esa estimación. El protocolo interno exige mantener 24 paquetes de seguridad después de cubrir toda la demanda. Para este ejercicio no hay devoluciones ni entregas pendientes, y la reposición llega antes de la demanda del miércoles.

Documento D, chat comercial: «el arroz se está agotando; compremos el doble». No contiene período, referencia del producto ni autor del cálculo. Los archivos de ventas incluyen código, fecha, unidades y sucursal; estos registros son datos. Comparar la demanda con el inventario utilizable produce información. Aplicar el protocolo de reservas y seguridad, explicando sus límites, convierte esa información en conocimiento útil para decidir.

El equipo dispone de un tablero compartido, pero todavía no distingue stock físico de stock vendible. El supervisor pide conservar los documentos A, B y C junto con el cálculo y registrar quién autorizó la compra. La estimación puede fallar si aparece una promoción extraordinaria: por eso el informe debe incluir esa incertidumbre y una hora de revisión. Una decisión rápida sin comprobar las unidades podría confundir cajas con paquetes; una decisión lenta podría dejar sin producto a clientes con reserva.`,
    questions: [
      choice(
        "¿Qué base de cálculo respeta el expediente y evita contar dos veces las reservas?",
        [
          "Stock utilizable de 60 paquetes; demanda total de 108; seguridad de 24.",
          "Stock de 72 paquetes; demanda de 84; reservas ya incluidas.",
          "Stock utilizable de 60 paquetes; demanda de 132; seguridad de 24.",
        ],
        0,
        "72 − 12 = 60 disponibles. La demanda es 24 + 84 = 108 porque la previsión excluye reservas. La seguridad es adicional.",
      ),
      numeric(
        "¿Cuántas cajas completas deben comprarse para cubrir la demanda y mantener la seguridad?",
        6,
        "cajas",
        "(108 + 24 − 60) / 12 = 6 cajas. No se requieren redondeos en este caso.",
      ),
      matching(
        "Relaciona cada elemento con su papel informacional.",
        [
          ["Fila de ventas con fecha y cantidad", "Dato registrado"],
          [
            "Comparación de demanda e inventario vendible",
            "Información contextualizada",
          ],
          [
            "Regla de reposición con seguridad y límites",
            "Conocimiento aplicado",
          ],
          [
            "Mensaje «compremos el doble» sin cálculo",
            "Afirmación sin respaldo suficiente",
          ],
        ],
        "La misma cifra puede aportar información al contextualizarse; la decisión necesita reglas y evidencia.",
      ),
      ordering(
        "Ordena el proceso de una recomendación que otra persona pueda revisar.",
        [
          "Delimitar producto, período y decisión",
          "Verificar inventario y separar unidades dañadas",
          "Integrar reservas, previsión y stock de seguridad",
          "Calcular cajas y señalar incertidumbre",
          "Registrar evidencia, responsable y hora de revisión",
        ],
        "La decisión se define antes de reunir evidencia; se conserva la trazabilidad después de justificar el cálculo.",
      ),
      crossword(
        "Completa los conceptos del expediente.",
        [
          ["DATO", "Registro individual que todavía necesita contexto."],
          [
            "STOCK",
            "Existencias del producto; deben distinguirse las físicas de las utilizables.",
          ],
          [
            "RESERVA",
            "Pedido confirmado que la previsión del caso no incluye.",
          ],
        ],
        "Estos conceptos evitan interpretar como equivalentes un registro, la disponibilidad y un compromiso de venta.",
      ),
    ],
  },
  {
    week: 2,
    name: "Auditoría de desperdicio: tres usuarios, tres necesidades",
    objective:
      "Priorizar requerimientos informacionales con alcance, usuarios, decisiones y evidencia mínima.",
    context: `EXPEDIENTE 02 · Planta ficticia AgroCosta. La gerencia tiene dos horas para decidir si debe revisar la cadena de frío o modificar la planificación de lotes. No se trata de una descripción de una empresa agroindustrial real. Producción solicita «todos los datos», calidad pregunta por temperaturas y finanzas necesita estimar pérdidas; tu tarea es convertir esas solicitudes en requerimientos verificables.

Documento A, registro de cuatro semanas: lote L1, 1.000 kg producidos y 60 kg descartados; L2, 1.000 y 110; L3, 1.000 y 50; L4, 1.000 y 100. El costo contable por kilogramo descartado es USD 2,50 para todos los lotes. La regla de alerta interna se activa si el descarte supera 8 % de la producción del lote. Esta regla es un umbral operativo, no una norma sanitaria.

Documento B, sensores: L2 y L4 presentan lecturas superiores a 8 °C; sin embargo, el sensor del turno nocturno tenía una calibración vencida. Documento C, entrevistas: dos operadores mencionan retrasos en despacho; la entrevista recoge percepciones, no mide cuántos minutos perdió cada lote. Documento D, correo comercial: el próximo pedido sale mañana. Calidad puede exportar lecturas, mantenimiento puede comprobar calibración y finanzas puede confirmar costos; ninguna fuente por sí sola demuestra la causa del desperdicio.

El comité exige primero identificar los lotes sobre el umbral y cuantificar su costo, luego contrastar las lecturas con sensores válidos y horas de despacho. El informe debe distinguir «coincide con» de «fue causado por». Para resolver el caso, un requerimiento completo indica usuario, decisión, variable, período, unidad y fuente. Recopilar hojas de vida de empleados no responde a esta decisión y añadiría datos personales innecesarios. La prioridad se asigna por urgencia y utilidad, no por el volumen del archivo disponible.`,
    questions: [
      choice(
        "¿Qué requerimiento está mejor delimitado para la decisión de las próximas dos horas?",
        [
          "Reunir todo el historial de la planta y las hojas de vida.",
          "Identificar lotes de las últimas cuatro semanas con descarte superior al 8 %, costo y lecturas de temperatura verificables.",
          "Comparar opiniones sobre calidad sin identificar lote ni período.",
        ],
        1,
        "Define variable, período, unidad de análisis y evidencia; responde a la decisión sin pedir datos irrelevantes.",
      ),
      numeric(
        "¿Cuál es el costo de descarte conjunto de los lotes que superan el umbral de 8 %?",
        525,
        "USD",
        "L2 alcanza 11 % y L4 10 %. (110 + 100) × 2,50 = USD 525. L1 y L3 están por debajo del umbral.",
      ),
      matching(
        "Asigna a cada usuario el requerimiento que le corresponde.",
        [
          ["Finanzas", "Costo de descarte por lote y período"],
          ["Calidad", "Temperaturas por turno con estado de calibración"],
          ["Producción", "Tiempos de elaboración y despacho por lote"],
          ["Gerencia", "Opciones de intervención y límites de la evidencia"],
        ],
        "Los requerimientos responden a decisiones diferentes y deben integrarse, no confundirse.",
      ),
      choice(
        "¿Qué conclusión es responsable con la evidencia disponible?",
        [
          "La temperatura causó todas las pérdidas, porque dos lotes coinciden.",
          "El turno nocturno debe ser sancionado con base en las entrevistas.",
          "L2 y L4 requieren revisión; aún hay que validar sensores y contrastar despacho antes de atribuir una causa.",
        ],
        2,
        "Una correlación y testimonios no establecen causalidad; la calibración vencida reduce la fiabilidad de las lecturas.",
      ),
      ordering(
        "Ordena una entrevista de requerimientos antes de descargar archivos.",
        [
          "Identificar usuario y decisión urgente",
          "Definir variable, período y unidad de análisis",
          "Localizar fuentes y responsables",
          "Verificar calidad y restricciones de los datos",
          "Entregar evidencia mínima y registrar pendientes",
        ],
        "Las fuentes se eligen después de precisar la necesidad; los pendientes deben acompañar la respuesta.",
      ),
    ],
  },
  {
    week: 3,
    name: "Comité de evidencia: elegir y aplicar un modelo ALFIN",
    objective:
      "Aplicar Big6 y distinguirlo de SCONUL, ACRL y AMI en un problema de información.",
    context: `EXPEDIENTE 03 · Cooperativa ficticia Bahía Digital. Un comité estudia si debe pilotar una aplicación de pagos en dos barrios. Tiene 48 horas para elaborar una recomendación; usar un modelo ayuda a ordenar el trabajo, pero no sustituye el análisis de las fuentes. No se atribuyen procedimientos a ningún banco o plataforma real.

Ficha de modelos: Big6 organiza seis etapas: definición de la tarea, estrategias de búsqueda, localización y acceso, uso de información, síntesis y evaluación. SCONUL describe siete pilares de capacidad: identificar, delimitar, planificar, recopilar, evaluar, gestionar y presentar. ACRL aporta marcos conceptuales, incluido «la autoridad se construye y es contextual». AMI integra alfabetización mediática e informacional: examina cómo se produce, representa y comunica un mensaje, con atención a participación y derechos.

Documento A, encuesta interna: respondieron 80 de 200 comerciantes invitados; 52 de los 80 declaran interés. La invitación se difundió exclusivamente por una aplicación móvil, por lo que podrían faltar comerciantes con menor conectividad. Documento B, proveedor: promete «adopción garantizada» y presenta testimonios seleccionados, sin método de selección. Documento C, ensayo académico: estudia barreras de adopción en otro país; aporta conceptos, pero no estima la aceptación de estos barrios. Documento D, comité de usuarios: pide conocer comisiones, protección de datos y opciones para quienes no tienen teléfono.

El comité debe diferenciar el 65 % de interés entre quienes respondieron del porcentaje de toda la población invitada. Evaluará utilidad, sesgo de selección y condiciones del piloto. Una fuente académica puede ser valiosa para el marco conceptual y poco adecuada para una tarifa vigente; el proveedor conoce su tarifa, pero tiene interés comercial. El producto final será una ficha de decisión con fuentes, limitaciones y una prueba pequeña antes de ampliar el servicio.`,
    questions: [
      ordering(
        "Aplica Big6: ordena las seis etapas del trabajo.",
        [
          "Definir la decisión y los datos necesarios",
          "Seleccionar estrategias y fuentes",
          "Localizar y acceder a los documentos",
          "Extraer y valorar la información útil",
          "Sintetizar la recomendación del piloto",
          "Evaluar resultado y proceso",
        ],
        "Big6 termina evaluando tanto la solución como el modo de obtenerla.",
      ),
      matching(
        "Relaciona cada necesidad con el marco más directo de la ficha.",
        [
          ["Ordenar seis etapas de resolución", "Big6"],
          [
            "Diagnosticar capacidades de identificar, gestionar y presentar",
            "SCONUL",
          ],
          ["Preguntar qué autoridad sirve para esta decisión", "ACRL"],
          ["Analizar representación, medios y derechos", "AMI"],
        ],
        "Los modelos son complementarios; el emparejamiento distingue su aporte principal según la ficha.",
      ),
      numeric(
        "¿Qué porcentaje de los 80 participantes expresó interés? No uses como denominador a los 200 invitados.",
        65,
        "% de participantes",
        "52 / 80 × 100 = 65 %. El sesgo de selección impide convertirlo automáticamente en demanda de los 200 comerciantes.",
      ),
      choice(
        "¿Qué uso de las fuentes aplica «autoridad contextual»?",
        [
          "Usar el ensayo extranjero para afirmar que 65 % de todos los comerciantes adoptará el servicio.",
          "Usar el proveedor para comprobar tarifas y contrastar sus promesas de adopción con evidencia independiente.",
          "Descartar cualquier fuente comercial incluso para consultar su propia tarifa.",
        ],
        1,
        "La idoneidad depende de la pregunta: tarifas y predicciones requieren evaluaciones distintas.",
      ),
      crossword(
        "Resuelve tres conceptos de la ficha.",
        [
          [
            "AUTORIDAD",
            "Idoneidad contextual de quien produce la información.",
          ],
          [
            "SINTESIS",
            "Integración argumentada de hallazgos en un producto útil.",
          ],
          ["EVALUAR", "Acción final de Big6 sobre proceso y resultado."],
        ],
        "Nombrar los conceptos ayuda a explicar por qué un procedimiento no garantiza por sí solo una fuente pertinente.",
      ),
    ],
  },
  {
    week: 4,
    name: "Trazabilidad sin exclusión en una cooperativa costera",
    objective:
      "Diseñar un registro accesible y evaluar brechas de acceso, habilidades y participación.",
    context: `EXPEDIENTE 04 · Cooperativa ficticia Mar Abierto. Veinte proveedores deben registrar origen, lote y fecha de entrega. El formulario vigente exige computadora, conexión estable y un video de 200 MB antes de las 18:00. La trazabilidad es obligatoria en este ejercicio, pero ese requisito no obliga a utilizar video. Los datos no describen prácticas de una empresa camaronera o atunera real.

Documento A, diagnóstico: ocho proveedores tienen computadora y conexión estable; doce solo teléfono con conexión intermitente. Documento B, prueba de registro: completaron el trámite ocho de los ocho del primer grupo y tres de los doce del segundo. No hay evidencias de fraude: los nueve registros faltantes no deben interpretarse como desinterés. Documento C, entrevista accesible: algunos usuarios leen con dificultad textos extensos; dos necesitan instrucciones en audio y texto, y el uso de solo colores para indicar errores genera confusión.

La propuesta B sustituye el video obligatorio por un formulario liviano con los tres campos, revisión antes de enviar y guardado local pendiente de sincronización. Se ofrecerá registro asistido en un punto de recepción. Antes de implementar el modo pendiente, el equipo debe definir cómo proteger el dispositivo y resolver duplicados; almacenar datos sin control también genera riesgo. La asistencia nunca debe eliminar la identificación del lote.

El presupuesto disponible es USD 600. Adaptar el formulario cuesta USD 300; preparar instrucciones en texto y audio cuesta USD 100; habilitar un turno de asistencia cuesta USD 200. Comprar cinco computadoras cuesta USD 2.000 y no resuelve por sí solo habilidades o conectividad. El comité evaluará la mejora separando resultados por grupo, tiempo empleado y errores, con consentimiento en las entrevistas. Promediar el éxito general ocultaría la desigualdad. La brecha digital comprende acceso, habilidades y beneficios obtenidos, no solamente posesión de equipos.`,
    questions: [
      numeric(
        "¿Cuál fue la tasa de finalización del grupo de teléfono y conexión intermitente?",
        25,
        "%",
        "3 / 12 × 100 = 25 %. El grupo con computadora llegó a 100 %; la diferencia no prueba falta de interés.",
      ),
      choice(
        "¿Qué propuesta cumple el presupuesto y conserva la trazabilidad?",
        [
          "Formulario liviano, instrucciones accesibles y turno de asistencia por USD 600.",
          "Eliminar origen y lote para que todos envíen una respuesta.",
          "Comprar cinco computadoras y conservar el video obligatorio.",
        ],
        0,
        "300 + 100 + 200 = 600. Se reduce la barrera técnica conservando los tres campos necesarios.",
      ),
      matching(
        "Relaciona barrera y respuesta adecuada.",
        [
          [
            "Conexión intermitente",
            "Guardado pendiente con sincronización y control de duplicados",
          ],
          [
            "Textos extensos difíciles de comprender",
            "Instrucciones breves en texto y audio",
          ],
          [
            "Errores señalados solo con color",
            "Etiquetas textuales junto a cada error",
          ],
          ["Ausencia de dispositivo propio", "Punto de registro asistido"],
        ],
        "La inclusión requiere adaptar el proceso a barreras diferentes sin sacrificar los datos esenciales.",
      ),
      ordering(
        "Ordena el diseño y la comprobación de una alternativa inclusiva.",
        [
          "Consultar barreras a los grupos afectados",
          "Definir los campos mínimos de trazabilidad",
          "Diseñar alternativas y proteger el modo pendiente",
          "Probar con usuarios de ambos grupos",
          "Comparar finalización, tiempo y errores por grupo",
        ],
        "Se consulta antes de diseñar; se mide por grupo para no ocultar exclusión con un promedio.",
      ),
      choice(
        "¿Qué indicador revela mejor si disminuyó la brecha?",
        [
          "Cantidad total de videos recibidos.",
          "Éxito, tiempo y errores separados por acceso y tipo de dispositivo.",
          "Cantidad de computadoras compradas sin probar el registro.",
        ],
        1,
        "La inclusión se observa en la posibilidad de completar el proceso y obtener beneficios, no solo en equipamiento.",
      ),
    ],
  },
  {
    week: 5,
    name: "Laboratorio de consultas: reducir desperdicio con una pregunta útil",
    objective:
      "Delimitar preguntas estratégicas y construir vocabularios que equilibren precisión y cobertura.",
    context: `EXPEDIENTE 05 · Distribuidora ficticia NutriCosta. La gerente pide «ideas de internet para evitar pérdidas». En realidad debe seleccionar una intervención para alimentos refrigerados vendidos en supermercados ecuatorianos, con evidencia publicada entre 2021 y 2025. La decisión compara redistribución, mejora de inventario y descuentos próximos al vencimiento. No se necesita demostrar que una empresa real aplica estas medidas.

Documento A, alcance acordado: sector minorista, Ecuador, alimentos refrigerados, desperdicio alimentario y resultados medidos. Se admitirán estudios latinoamericanos como antecedentes, pero se identificarán como cobertura externa. Documento B, vocabulario: «desperdicio alimentario», «pérdida de alimentos», food waste; «supermercado», retail, grocery; «redistribución», donación, donation; «inventario», forecast, forecasting. Los términos no son totalmente equivalentes en todos los documentos: hay que revisar cómo cada autor define pérdida y desperdicio.

Documento C, prueba 1: la consulta desperdicio AND supermercado recuperó 24 documentos, de los cuales 18 respondían al sector y fenómeno. Documento D, prueba 2: al añadir sinónimos con OR se recuperaron 40, de los cuales 22 resultaron pertinentes. La segunda consulta encuentra cuatro pertinentes adicionales, pero exige más revisión. Para este ejercicio, precisión = pertinentes recuperados / total recuperado; no conocemos todos los documentos pertinentes existentes, así que no podemos calcular exhaustividad.

El buscador permite AND, OR, paréntesis y comillas; los filtros de año y territorio se aplican por separado. Las comillas exigen una frase y pueden omitir variantes. El registro de búsqueda debe conservar consulta exacta, plataforma, filtros, fecha y criterio de inclusión. El equipo dispone de 45 minutos para un primer dossier: no basta tomar los primeros resultados patrocinados. Un resultado no se descarta solo por ser extranjero; se distingue evidencia directamente aplicable de antecedentes que necesitan adaptación.`,
    questions: [
      choice(
        "¿Qué pregunta transforma la solicitud inicial en una búsqueda evaluable?",
        [
          "¿Qué intervenciones reducen el desperdicio de alimentos refrigerados en supermercados de Ecuador según estudios 2021–2025?",
          "¿Qué marca alimentaria tiene más presencia en redes?",
          "¿Qué dicen todos los países sobre cualquier pérdida empresarial?",
        ],
        0,
        "Delimita intervención, resultado, sector, territorio y período sin confundir popularidad con evidencia.",
      ),
      choice(
        "¿Qué consulta reúne alternativas de vocabulario y combina los dos conceptos principales?",
        [
          '("desperdicio alimentario" OR "pérdida de alimentos" OR "food waste") AND (supermercado OR retail OR grocery)',
          '"desperdicio alimentario" AND "pérdida de alimentos" AND "food waste"',
          "(desperdicio OR supermercado OR Ecuador)",
        ],
        0,
        "OR reúne expresiones alternativas dentro de cada grupo; AND exige relación entre fenómeno y sector. Año y territorio se filtran aparte.",
      ),
      numeric(
        "Calcula la precisión de la prueba 2, expresada en porcentaje.",
        55,
        "%",
        "22 / 40 × 100 = 55 %. La consulta amplió cobertura pero redujo precisión respecto al 75 % de la prueba 1.",
      ),
      matching(
        "Asocia cada decisión de búsqueda con su propósito.",
        [
          ["OR entre sinónimos", "Ampliar alternativas de expresión"],
          [
            "AND entre fenómeno y sector",
            "Exigir presencia de ambos conceptos",
          ],
          ["Comillas en una frase", "Buscar esa secuencia de palabras"],
          ["Filtro de año", "Delimitar período de publicación"],
        ],
        "Los operadores actúan sobre conceptos y los filtros sobre campos; conviene registrar ambos.",
      ),
      ordering(
        "Ordena una estrategia reproducible.",
        [
          "Definir pregunta y criterios de inclusión",
          "Identificar conceptos y variantes de vocabulario",
          "Construir y ejecutar una consulta inicial",
          "Revisar pertinencia y ajustar términos",
          "Guardar consulta, filtros, fecha y resultados",
        ],
        "Una búsqueda es un proceso de prueba documentado; el primer resultado no determina la calidad.",
      ),
    ],
  },
  {
    week: 6,
    name: "Mesa documental: comparar cifras sin mezclar coberturas",
    objective:
      "Seleccionar fuentes pertinentes y examinar período, población, unidad y método antes de comparar datos.",
    context: `EXPEDIENTE 06 · Observatorio ficticio Puerto y Territorio. Un equipo prepara una nota para estudiar demanda logística en Manabí. Requiere contexto poblacional, actividad económica y trámites de importación. El dossier usa cifras inventadas; los organismos mencionados se incluyen solo para orientar la búsqueda de documentos oficiales reales.

Ficha de fuentes: INEC publica estadísticas poblacionales y de hogares; Banco Central del Ecuador ofrece estadísticas macroeconómicas; SENAE publica información aduanera y procedimientos; artículos científicos pueden aportar métodos y análisis, pero deben revisarse su fecha, cobertura y acceso al texto completo. Los datos abiertos no son automáticamente correctos ni comparables: una licencia permite ciertos usos, mientras metadatos y metodología explican qué miden.

Documento A, tabla de población: cantón Costa, 2022, 100.000 habitantes; la unidad es personas residentes. Documento B, población estimada del mismo cantón en 2025: 108.000, con método de proyección. Documento C, movimientos portuarios en 2025: 12.000 operaciones, incluyendo entradas y salidas; no representa 12.000 clientes distintos. Documento D, nota de prensa comercial: «el mercado creció 20 %», sin definir variable ni base. Documento E, procedimiento aduanero: versión actualizada en 2026 con enlace al documento original y fecha de vigencia; una copia de 2021 permanece en un blog.

Para el ejercicio se permite calcular el cambio entre A y B, indicando que B es una estimación y no un nuevo censo. No es válido dividir operaciones portuarias entre habitantes para afirmar cuántas personas importan. El equipo debe conservar organismo productor, tabla, fecha, cobertura, unidad y metodología junto al archivo descargado. Las decisiones jurídicas requieren comprobar la vigencia de la norma original, no solo la fecha de una noticia. El informe final separará datos observados, estimaciones y afirmaciones todavía no verificadas, y señalará cualquier serie que no pueda compararse.`,
    questions: [
      matching(
        "Selecciona el punto de partida institucional indicado en la ficha.",
        [
          ["Población y hogares", "INEC"],
          ["Estadísticas macroeconómicas", "Banco Central del Ecuador"],
          ["Procedimientos aduaneros vigentes", "SENAE"],
          [
            "Método para evaluar una relación económica",
            "Artículo científico con metodología revisada",
          ],
        ],
        "La fuente se elige por el dato que debe resolver, y después se verifica el documento específico.",
      ),
      numeric(
        "¿Cuál es el cambio porcentual entre la población 2022 y la estimación 2025?",
        8,
        "%",
        "(108.000 − 100.000) / 100.000 × 100 = 8 %. Debe declararse que se comparan un conteo y una proyección.",
      ),
      choice(
        "¿Qué afirmación respeta las unidades y límites del dossier?",
        [
          "Las 12.000 operaciones equivalen a 12.000 habitantes importadores.",
          "La población estimada aumenta 8 %; ese dato no prueba por sí solo crecimiento de la demanda logística.",
          "El mercado creció 20 % porque lo dijo una nota comercial.",
        ],
        1,
        "El cálculo poblacional es válido dentro del alcance descrito, pero no establece la demanda de un servicio distinto.",
      ),
      ordering(
        "Ordena la verificación de un requisito aduanero.",
        [
          "Identificar el trámite y jurisdicción aplicables",
          "Localizar documento original del organismo competente",
          "Comprobar versión, vigencia y modificaciones",
          "Registrar enlace y fecha de consulta",
          "Comunicar el requisito con su alcance y fuente",
        ],
        "La copia antigua puede orientar la búsqueda, pero no sustituye el documento vigente.",
      ),
      choice(
        "¿Qué conjunto de metadatos permite revisar una comparación?",
        [
          "Título del archivo y número de descargas.",
          "Organismo, período, cobertura, unidad y metodología.",
          "Color del gráfico y nombre de quien lo compartió.",
        ],
        1,
        "Dos números con unidades o coberturas distintas pueden aparentar una diferencia que no existe.",
      ),
    ],
    references: [
      {
        name: "INEC · estadísticas oficiales",
        url: "https://www.ecuadorencifras.gob.ec/",
      },
      { name: "Banco Central del Ecuador", url: "https://www.bce.fin.ec/" },
      {
        name: "SENAE · información oficial",
        url: "https://www.aduana.gob.ec/",
      },
    ],
  },
  {
    week: 7,
    name: "Búsqueda avanzada: auditar un repositorio farmacéutico",
    objective:
      "Aplicar lógica booleana y documentar falsos positivos y exclusiones indebidas.",
    context: `EXPEDIENTE 07 · Unidad ficticia Salud y Evidencia. Un equipo investiga cadena de frío de medicamentos en Ecuador y necesita documentos metodológicos, no publicidad. El repositorio de práctica aplica coincidencia de términos a etiquetas; acepta AND, OR, NOT y paréntesis. Las etiquetas simplifican un buscador real y permiten comprobar cada resultado.

Catálogo documental: D1 contiene «medicamento», «cadena fría», «Ecuador», «estudio»; D2 contiene «vacuna», «cadena fría», «Ecuador», «estudio»; D3 contiene «medicamento», «cadena fría», «Perú», «estudio»; D4 contiene «medicamento», «Ecuador», «publicidad»; D5 contiene «vacuna», «cadena fría», «Ecuador», «estudio», «publicidad». D5 es un estudio que analiza publicidad engañosa: la etiqueta no significa que el documento sea un anuncio. En el catálogo, D1, D2 y D5 son pertinentes para la pregunta acordada.

La consulta inicial medicamento AND "cadena fría" AND Ecuador devuelve D1. La ampliación (medicamento OR vacuna) AND "cadena fría" AND Ecuador devuelve D1, D2 y D5. Un compañero añade NOT publicidad para «limpiar» resultados y elimina D5. El equipo conoce tres documentos pertinentes en este catálogo, por lo que aquí sí puede calcular exhaustividad: pertinentes recuperados / pertinentes existentes. Este cálculo no se generaliza a toda la web, donde el conjunto completo suele ser desconocido.

La minería documental posterior debe extraer fecha, territorio, definición de cadena de frío y método de cada documento. Un gráfico bonito no convierte una pieza comercial en estudio. Tampoco basta una etiqueta «estudio»: habrá que leer su metodología antes de usarlo en una recomendación. El informe conservará la consulta inicial, cada cambio, documentos ganados o perdidos y una razón para aceptar o rechazarlos. La búsqueda es reproducible solo si se registran plataforma, campos consultados y fecha.`,
    questions: [
      choice(
        "¿Qué consulta recupera los tres documentos pertinentes definidos en el catálogo?",
        [
          "medicamento AND vacuna AND Ecuador",
          '(medicamento OR vacuna) AND "cadena fría" AND Ecuador',
          '(medicamento OR vacuna) AND "cadena fría" AND Ecuador NOT publicidad',
        ],
        1,
        "La segunda recupera D1, D2 y D5. NOT publicidad excluye un estudio pertinente que analiza ese tema.",
      ),
      numeric(
        "¿Cuál es la exhaustividad tras añadir NOT publicidad? Redondea a dos decimales.",
        66.67,
        "%",
        "Se conservan D1 y D2, pero se pierde D5: 2 / 3 × 100 = 66,67 %.",
        0.02,
      ),
      matching(
        "Relaciona documento y resultado de la consulta ampliada sin NOT.",
        [
          ["D1", "Incluido: medicamento, cadena fría y Ecuador"],
          ["D2", "Incluido: vacuna, cadena fría y Ecuador"],
          ["D3", "Excluido: territorio Perú"],
          ["D4", "Excluido: no contiene cadena fría"],
          ["D5", "Incluido: la publicidad no se excluye automáticamente"],
        ],
        "Las condiciones se comprueban documento por documento, respetando el agrupamiento OR.",
      ),
      ordering(
        "Ordena una mejora de búsqueda fundamentada.",
        [
          "Registrar consulta y resultados iniciales",
          "Identificar variantes del concepto principal",
          "Añadir OR dentro de un grupo entre paréntesis",
          "Examinar documentos ganados y exclusiones propuestas",
          "Guardar la versión elegida y su justificación",
        ],
        "Cambiar operadores sin inspeccionar resultados puede perder evidencia útil.",
      ),
      crossword(
        "Completa el vocabulario de la auditoría.",
        [
          ["CONSULTA", "Expresión exacta que se ejecuta en el buscador."],
          ["FILTRO", "Restricción aplicada a un campo, como año o territorio."],
          [
            "SESGO",
            "Distorsión que puede aparecer al excluir evidencia de forma injustificada.",
          ],
        ],
        "Documentar consultas y filtros permite detectar sesgos de selección informacional.",
      ),
    ],
  },
  {
    week: 8,
    name: "Dossier de consultoría: deduplicar, citar y recuperar",
    objective:
      "Organizar un expediente con metadatos verificables y diferenciar copia de corroboración independiente.",
    context: `EXPEDIENTE 08 · Consultora ficticia Faro Gerencial. Tu equipo prepara un dossier para decidir si conviene abrir un centro de distribución. Ha descargado archivos de correos, buscadores y una carpeta compartida. El cliente exige poder recuperar cada evidencia utilizada; no se describen prácticas de consultoras reales.

Inventario documental: R1, Ana Torres, «Rutas y costos costeros», informe técnico 2025, identificador DOC-101, enlace al original y fecha de consulta; R2, archivo «informe_final_v3.pdf», mismo autor, título e identificador DOC-101; R3, tabla capturada en imagen sin autor, período ni enlace; R4, Luis Vera, «Acceso vial estacional», artículo 2024, DOI de ejemplo 10.0000/ficticio.4, método y limitaciones; R5, copia parcial de R4 que omite anexos; R6, boletín municipal 2026 con cobertura local, emisor y fecha. Todos los títulos, personas e identificadores son inventados y no deben buscarse como publicaciones reales.

Para el ejercicio, R1/R2 representan una fuente y R4/R5 otra. R6 es una tercera fuente independiente. R3 no se cuenta como evidencia utilizable hasta localizar su procedencia. La regla de deduplicación compara identificador y contenido, no únicamente el nombre del archivo. Las notas deben separar citas textuales, paráfrasis y conclusiones propias. El gestor bibliográfico facilita organizar y exportar, pero los metadatos importados pueden contener errores.

El dossier tendrá carpeta de originales, índice de referencias y matriz: afirmación, fuente, localizador, método, limitación y uso en la decisión. Los documentos de costos y acceso vial no miden lo mismo; se conservan sus unidades antes de integrarlos. La propuesta de nombre «todo_final.pdf» impediría distinguir versiones. Se adoptará año_tema_autor_version y se registrará la fecha de consulta. Las copias se consolidan sin borrar información única y el equipo no presenta tres archivos repetidos como tres corroboraciones.`,
    questions: [
      numeric(
        "Tras consolidar duplicados y excluir R3 hasta verificarlo, ¿cuántas fuentes independientes utilizables hay?",
        3,
        "fuentes",
        "R1/R2 forman una, R4/R5 otra y R6 una tercera. R3 carece de procedencia verificada.",
      ),
      choice(
        "¿Qué decisión conserva mejor la trazabilidad?",
        [
          "Conservar cada archivo como una fuente independiente porque su nombre es distinto.",
          "Consolidar por identificador y contenido, conservar el original completo y registrar duplicados.",
          "Borrar todo documento con más de una copia sin comprobar su contenido.",
        ],
        1,
        "La deduplicación identifica fuentes equivalentes sin perder anexos ni información única.",
      ),
      matching(
        "Relaciona campo y función dentro de la matriz.",
        [
          ["Localizador", "Indica página, sección o tabla de la evidencia"],
          ["Método", "Explica cómo se obtuvo el resultado"],
          ["Limitación", "Delimita lo que el documento no permite concluir"],
          [
            "Uso en la decisión",
            "Vincula el hallazgo con una opción del proyecto",
          ],
        ],
        "Una referencia completa identifica la fuente; la matriz explica qué aporta y con qué límites.",
      ),
      ordering(
        "Ordena la preparación de una referencia importada.",
        [
          "Recuperar documento original completo",
          "Comprobar autor, título, año e identificador",
          "Consolidar copias y distinguir versiones",
          "Registrar localizador y nota de lectura",
          "Exportar referencia y revisar formato",
        ],
        "La exportación automática necesita metadatos correctos y revisión humana.",
      ),
      crossword(
        "Resuelve los conceptos de organización.",
        [
          ["METADATO", "Dato que describe un documento, como autor o fecha."],
          [
            "DOSSIER",
            "Expediente organizado que reúne evidencia para una decisión.",
          ],
          ["CITA", "Referencia que identifica el uso de una fuente ajena."],
        ],
        "Estos elementos permiten recuperar el documento y distinguir la evidencia de la interpretación propia.",
      ),
    ],
  },
  {
    week: 9,
    name: "Comité de inversión: puntuar una fuente sin convertirla en certeza",
    objective:
      "Evaluar actualidad, relevancia, autoridad, exactitud y propósito con una rúbrica explícita.",
    context: `EXPEDIENTE 09 · Comité ficticio Horizonte Industrial. Debes evaluar fuentes sobre demanda para una inversión local en 2026. No decidirás la inversión únicamente con una puntuación: la rúbrica ayuda a explicar fortalezas y vacíos, pero no garantiza resultados.

Ficha CRAAP: Currency corresponde a actualidad; Relevance a relevancia; Authority a autoridad; Accuracy a exactitud; Purpose a propósito. La rúbrica del caso asigna de 0 a 2 puntos en cada criterio: 0 = información ausente o inadecuada, 1 = respaldo parcial, 2 = respaldo suficiente para este uso. Un total de 8 a 10 permite incluir la fuente con sus límites; de 5 a 7 exige corroboración adicional; menos de 5 no permite fundamentar la recomendación. Es una regla didáctica local, no una certificación universal.

Documento A, estudio 2025: autores identificados, muestra de 120 empresas de Manabí, cuestionario y limitaciones disponibles. Puntajes acordados: actualidad 2, relevancia 2, autoridad 2, exactitud 1 porque no conocemos validación externa, propósito 2. Documento B, anuncio 2018: sin autor ni método, promete retorno garantizado y vende asesoría. Puntajes: 0, 1, 0, 0, 0. Documento C, informe nacional 2026: organismo identificado y método publicado, pero sin desglose local; su actualidad es buena y su relevancia para esta pregunta es parcial.

La muestra de A incluye únicamente empresas que aceptaron responder y no representa automáticamente todos los negocios. C puede contextualizar, pero no reemplaza una estimación local. B puede documentar una promesa comercial, no demostrar que se cumplirá. El comité debe registrar el propósito de cada uso: una fuente poco adecuada para pronosticar demanda puede ser útil para analizar publicidad. Antes de comparar cifras se revisarán cobertura, unidades y metodología. Una recomendación responsable señalará evidencia pendiente y condiciones bajo las cuales cambiaría su conclusión.`,
    questions: [
      numeric(
        "¿Cuál es la puntuación total del documento A?",
        9,
        "puntos sobre 10",
        "2 + 2 + 2 + 1 + 2 = 9. Permite incluirlo con límites según la rúbrica; no garantiza una inversión rentable.",
      ),
      matching(
        "Relaciona hallazgo y criterio CRAAP principal.",
        [
          ["Documento publicado en 2018 para una decisión 2026", "Actualidad"],
          ["Informe nacional sin desglose local", "Relevancia"],
          ["Autores identificados y experiencia documentada", "Autoridad"],
          ["Método, muestra y límites visibles", "Exactitud"],
          ["Promesa que acompaña venta de asesoría", "Propósito"],
        ],
        "Un hallazgo puede afectar varios criterios; aquí se identifica su relación más directa.",
      ),
      choice(
        "¿Qué conclusión sobre A es defendible?",
        [
          "Su 9/10 garantiza un retorno económico positivo.",
          "Puede sustentar parte del análisis, declarando autoselección y ausencia de validación externa.",
          "Su muestra de 120 prueba que todas las empresas de Manabí tienen igual demanda.",
        ],
        1,
        "La puntuación organiza una evaluación contextual, pero no elimina problemas de representatividad.",
      ),
      choice(
        "¿Cómo tratar el documento C?",
        [
          "Descartarlo solo porque no es local.",
          "Usarlo como contexto nacional y buscar datos locales antes de extrapolar.",
          "Aplicar sus cifras nacionales a cada cantón sin ajustes.",
        ],
        1,
        "Su actualidad no compensa automáticamente la diferencia de cobertura.",
      ),
      ordering(
        "Ordena una evaluación documentada.",
        [
          "Definir la pregunta y uso previsto de la fuente",
          "Examinar fecha, cobertura y autoría",
          "Revisar método, evidencia y propósito",
          "Registrar puntajes y limitaciones concretas",
          "Contrastar fuentes y justificar el uso final",
        ],
        "Los criterios se aplican a una necesidad concreta y terminan en una decisión de uso argumentada.",
      ),
    ],
    references: [
      {
        name: "Biblioteca Meriam · criterios CRAAP",
        url: "https://library.csuchico.edu/help/source-or-information-good",
      },
    ],
  },
  {
    week: 10,
    name: "Gabinete de crisis: una captura no equivale a seis confirmaciones",
    objective:
      "Verificar afirmaciones, reconocer dependencia entre fuentes y comunicar incertidumbre.",
    context: `EXPEDIENTE 10 · Marca ficticia Bebidas del Faro. A las 09:00 circula una captura que afirma: «la planta cerrará mañana por contaminación». La publicación reúne 6.000 visualizaciones y seis cuentas la repiten. Debes preparar un mensaje interno a las 12:00, preservando lo que se conoce y lo que falta por confirmar. No se atribuye una crisis a ninguna empresa real.

Cronología: 08:20, una cuenta sin identificación publica una imagen recortada; 08:40–09:10, seis cuentas la copian, sin enlazar documento original; 09:30, la jefatura solicita confirmar; 10:15, el organismo ficticio de control emite el comunicado C-17: «se realiza una inspección; no se ha emitido resolución de cierre». El comunicado muestra fecha, emisor y número. A las 10:45, un periodista consulta al mismo organismo y reproduce C-17. Una segunda noticia toma como fuente la primera. Por tanto, las noticias no agregan una segunda evidencia independiente sobre la resolución.

Documento A, captura: falta fecha, página completa y origen. Documento B, comunicado C-17: confirma inspección y ausencia de resolución a las 10:15, pero no garantiza resultados posteriores. Documento C, vocería empresarial: manifiesta cumplimiento, aunque tiene interés directo y no reemplaza la autoridad de control. La regla del gabinete prohíbe publicar «todo es falso» si solo se ha refutado el cierre inmediato.

La matriz debe separar afirmación, respaldo, origen y estado: confirmado, contradicho o pendiente. Para este caso, «hay inspección» está confirmado; «existe resolución de cierre a las 10:15» está contradicho; «qué concluirá la inspección» sigue pendiente. La recomendación es enlazar el comunicado, mencionar su hora y comprometer una actualización. La popularidad mide circulación, no veracidad. El sesgo de confirmación aparecería si el equipo solo buscara fuentes que apoyen su posición inicial.`,
    questions: [
      choice(
        "¿Qué mensaje corresponde a la evidencia de las 10:15?",
        [
          "No hay ningún problema y nunca habrá cierre.",
          "Hay una inspección; según C-17 no se ha emitido resolución de cierre a las 10:15. La situación puede actualizarse.",
          "La planta cerrará porque seis cuentas lo publicaron.",
        ],
        1,
        "El mensaje separa hecho, momento de verificación y límite temporal.",
      ),
      matching(
        "Clasifica las afirmaciones según el expediente.",
        [
          ["Hay inspección a las 10:15", "Confirmado por C-17"],
          ["Existe resolución de cierre a las 10:15", "Contradicho por C-17"],
          ["Qué concluirá la inspección", "Pendiente de evidencia"],
          [
            "Seis copias son seis verificaciones independientes",
            "Inferencia inválida por dependencia de origen",
          ],
        ],
        "Verificar exige examinar el origen, no simplemente contar publicaciones.",
      ),
      numeric(
        "De las seis cuentas que copian la captura, ¿cuántas aportan un nuevo documento original verificable?",
        0,
        "documentos nuevos",
        "Todas repiten la misma captura sin original. El número de publicaciones no crea independencia.",
      ),
      ordering(
        "Ordena la respuesta del gabinete.",
        [
          "Descomponer el mensaje viral en afirmaciones verificables",
          "Buscar origen completo y fecha de la captura",
          "Consultar documento del organismo competente",
          "Registrar estados, límites y hora de verificación",
          "Publicar un mensaje proporcionado y programar actualización",
        ],
        "La comunicación llega después de contrastar y conserva las dudas que permanecen abiertas.",
      ),
      choice(
        "¿Qué conducta muestra sesgo de confirmación?",
        [
          "Buscar evidencia que podría refutar la posición del equipo.",
          "Descartar C-17 solo porque contradice el mensaje que el equipo quería publicar.",
          "Consultar el documento original y señalar su hora.",
        ],
        1,
        "El sesgo consiste en privilegiar evidencia favorable y desatender la contradictoria sin razones metodológicas.",
      ),
    ],
  },
  {
    week: 11,
    name: "Mesa editorial: publicar con permisos y atribución",
    objective:
      "Distinguir cita, autorización de reutilización y límites de las licencias.",
    context: `EXPEDIENTE 11 · Agencia ficticia Archivo Comercial. Debes preparar una guía digital gratuita para estudiantes. El equipo ha seleccionado una fotografía, una gráfica y un párrafo. La distribución gratuita no elimina automáticamente derechos de autor ni condiciones de licencia. Las piezas de este expediente son ficticias y las reglas se presentan con fines de aprendizaje, no como asesoría jurídica para un caso real.

Inventario: P1, fotografía «Puerto al amanecer», autora ficticia Elena Mera, licencia CC BY 4.0; permite compartir y adaptar si se atribuye, enlaza la licencia y señala cambios. P2, gráfica «Costos por ruta», autor ficticio Marco Paz, licencia CC BY-ND 4.0; permite compartirla sin adaptar bajo sus condiciones. El equipo quiere cambiar colores, etiquetas y cifras: esa propuesta debe tratarse como adaptación y no se publicará bajo el permiso existente. P3, párrafo de 38 palabras de un informe protegido; se copiará literalmente como evidencia y debe distinguirse como cita, con referencia y página 7. La atribución no equivale a permiso para cualquier uso de una obra completa.

Ficha de publicación: una referencia identifica autor, fecha, título y fuente. La cita textual identifica las palabras ajenas y su localizador; una paráfrasis genuina también necesita citar. Cambiar dos palabras no convierte un párrafo copiado en una redacción propia. El expediente recomienda solicitar autorización cuando el uso propuesto no encaja en el permiso o buscar un recurso con licencia compatible.

Presupuesto: el equipo recibe autorización específica para una cuarta ilustración por USD 40 y compra otra por USD 25; atribuir esas piezas no anula el costo pactado. La revisión editorial registrará licencia, versión, autor, enlace, modificaciones y autorización adicional. No se presupone que una imagen encontrada en un buscador es libre: el resultado debe conducir a la fuente y a sus condiciones de uso.`,
    questions: [
      matching(
        "Asocia pieza y actuación conforme a la ficha.",
        [
          [
            "P1 · CC BY 4.0 adaptada",
            "Atribuir, enlazar licencia e indicar cambios",
          ],
          [
            "P2 · CC BY-ND con cambios propuestos",
            "Buscar permiso adicional o usar alternativa compatible",
          ],
          ["P3 · párrafo literal", "Distinguir cita, referencia y página 7"],
          [
            "Paráfrasis de una idea ajena",
            "Redactar con elaboración propia y citar la fuente",
          ],
        ],
        "Citar y obtener autorización resuelven cuestiones diferentes; las condiciones dependen del uso y la licencia.",
      ),
      choice(
        "¿Qué decisión respeta el permiso existente para P2?",
        [
          "Modificar cifras porque la guía será gratuita.",
          "Publicar la gráfica sin adaptación cumpliendo las condiciones, o conseguir autorización para modificarla.",
          "Cambiar el nombre del archivo para que deje de ser la misma obra.",
        ],
        1,
        "La ausencia de fines comerciales no sustituye una autorización para adaptar una pieza BY-ND.",
      ),
      ordering(
        "Ordena una revisión antes de publicar una imagen.",
        [
          "Localizar fuente y autoría de la pieza",
          "Comprobar licencia, versión y uso propuesto",
          "Obtener permiso adicional si hace falta",
          "Preparar atribución, enlace e indicación de cambios",
          "Guardar evidencia del permiso y revisar publicación",
        ],
        "Se verifica la compatibilidad antes de reutilizar; el registro conserva respaldo para futuras revisiones.",
      ),
      numeric(
        "¿Cuánto debe presupuestar el equipo por las dos autorizaciones pagadas indicadas?",
        65,
        "USD",
        "USD 40 + USD 25 = USD 65. La atribución no elimina los pagos acordados.",
      ),
      crossword(
        "Completa los términos editoriales.",
        [
          [
            "LICENCIA",
            "Condiciones que autorizan determinados usos de una obra.",
          ],
          ["AUTOR", "Persona identificada como creadora de la pieza."],
          ["CITA", "Señalamiento del uso de palabras o ideas de una fuente."],
        ],
        "Permiso, autoría y cita deben revisarse juntos; ninguno sustituye a los demás.",
      ),
    ],
    references: [
      {
        name: "CC BY 4.0 · resumen de condiciones",
        url: "https://creativecommons.org/licenses/by/4.0/deed.es",
      },
      {
        name: "CC BY-ND 4.0 · resumen de condiciones",
        url: "https://creativecommons.org/licenses/by-nd/4.0/deed.es",
      },
      { name: "SENADI", url: "https://www.derechosintelectuales.gob.ec/" },
    ],
  },
  {
    week: 12,
    name: "Auditoría de IA: un informe convincente con errores verificables",
    objective:
      "Validar cálculos, referencias y representatividad de una respuesta generativa sin exponer datos personales.",
    context: `EXPEDIENTE 12 · Equipo ficticio Costa Conectada. Una herramienta generativa entrega un borrador para ampliar cobertura de internet. La dirección exige auditarlo antes de citarlo. El tono profesional de una respuesta no prueba sus afirmaciones; la responsabilidad de la entrega permanece en el equipo que la utiliza.

Borrador de IA: «La Ley 999 de 2025 obliga a ofrecer el servicio; 20 puntos con costo de USD 15 producen un total de USD 350; 70 % de usuarios desea contratar; por tanto, la adopción está garantizada». La supuesta ley no incluye enlace ni organismo y no se ha localizado. El cálculo se puede verificar directamente. La palabra «garantizada» excede el alcance de una encuesta.

Documento A, cuestionario: 100 respuestas captadas exclusivamente en redes sociales; 70 indicaron interés. No se preguntó precio ni disponibilidad real para contratar. Documento B, costos del piloto: 20 puntos × USD 15; costo de instalación adicional de USD 100. Documento C, reglas del equipo: no introducir cédulas, correos ni teléfonos reales en herramientas no autorizadas. Se permite usar registros sintéticos. Documento D, bitácora: guardar fecha, herramienta, instrucción utilizada, partes incorporadas y validaciones humanas. Los usuarios sin redes sociales podrían estar subrepresentados, por lo que la encuesta no describe a toda la población.

El informe corregido debe identificar el uso de IA conforme a la política docente, sustituir afirmaciones no verificadas por pendientes y comprobar cálculos y referencias en fuentes pertinentes. «No localizada» no significa necesariamente «inexistente»: esa conclusión requeriría una comprobación más amplia. Para el piloto se puede recomendar una validación adicional con otros canales y preguntas de disposición a pagar. No es necesario compartir datos personales para explicar este método. La revisión debe preservar tanto los hallazgos útiles como sus límites, evitando aceptar o rechazar todo el texto por su origen.`,
    questions: [
      numeric(
        "¿Cuál es el costo total del piloto incluyendo instalación?",
        400,
        "USD",
        "20 × 15 = 300; sumando USD 100 de instalación, el total es USD 400. La IA calculó mal y omitió el gasto adicional.",
      ),
      choice(
        "¿Cómo corregir el fundamento legal del borrador?",
        [
          "Publicar la Ley 999 porque parece un título formal.",
          "Marcar la referencia como no verificada y comprobarla en una fuente oficial antes de usarla como fundamento.",
          "Afirmar inmediatamente que ninguna ley relacionada existe.",
        ],
        1,
        "Una referencia plausible necesita verificación; una búsqueda sin resultado tampoco demuestra por sí sola inexistencia.",
      ),
      matching(
        "Relaciona problema y acción de validación.",
        [
          [
            "Multiplicación 20 × 15 = 350",
            "Recalcular con los datos originales",
          ],
          ["Ley sin fuente", "Buscar texto oficial y vigencia"],
          [
            "Encuesta solo en redes",
            "Revisar sesgo de selección y ampliar canales",
          ],
          [
            "Solicitud de cédulas reales",
            "Usar datos sintéticos y herramientas autorizadas",
          ],
        ],
        "Cada error requiere un método distinto; el mismo detector no valida cálculos, leyes y representatividad.",
      ),
      ordering(
        "Ordena una auditoría antes de entregar el informe.",
        [
          "Identificar afirmaciones, cálculos y datos usados",
          "Recalcular cifras y recuperar fuentes originales",
          "Examinar sesgos y restricciones de privacidad",
          "Corregir errores y marcar lo no verificado",
          "Registrar uso de IA y validación humana",
        ],
        "El equipo documenta cómo transformó un borrador en un producto revisado.",
      ),
      crossword(
        "Completa términos de la auditoría.",
        [
          [
            "SESGO",
            "Distorsión asociada aquí a captar respuestas solo en redes.",
          ],
          ["FUENTE", "Origen verificable que debe respaldar una afirmación."],
          [
            "REVISION",
            "Control humano necesario antes de incorporar el borrador.",
          ],
        ],
        "La validación combina comprobación de origen, exactitud y límites de la evidencia.",
      ),
    ],
  },
  {
    week: 13,
    name: "Informe ambiental: intensidad menor, emisiones totales mayores",
    objective:
      "Sintetizar resultados con indicadores coherentes y distinguir cambio relativo de causalidad.",
    context: `EXPEDIENTE 13 · Planta ficticia Materiales del Pacífico. La dirección quiere un resumen ejecutivo de desempeño ambiental. Un borrador dice «redujimos nuestras emisiones y comprobamos el éxito de la nueva tecnología». Debes comprobar ambas afirmaciones usando los registros del caso; no se trata de un reporte de una cementera real.

Documento A, producción y emisiones directas: enero, 100 toneladas producidas y 50 toneladas de CO₂e; febrero, 120 toneladas producidas y 54 toneladas de CO₂e; marzo, 150 toneladas producidas y 60 toneladas de CO₂e. Todas las cifras tienen la misma cobertura y método. La intensidad se define como emisiones / producción, en toneladas de CO₂e por tonelada de producto. La variación relativa de intensidad entre enero y marzo es (intensidad de marzo − intensidad de enero) / intensidad de enero × 100.

Documento B, nota de operaciones: en febrero comenzó una prueba tecnológica y también cambió el volumen de producción. No hay grupo comparable sin intervención ni análisis que separe ambos factores. Documento C, alcance de medición: no se incluyen transporte de proveedores ni uso final del producto. Documento D, solicitud de audiencia: el director quiere un párrafo breve con hallazgo, riesgo y acción; el equipo técnico necesita cálculos y cobertura para revisar el resultado.

Un resumen adecuado distingue cantidades absolutas e indicadores relativos: puede mejorar la intensidad mientras suben las emisiones totales. Los tres meses permiten describir el período, pero no probar una tendencia duradera ni atribuirla solo a la tecnología. El dossier debe conservar tabla original, fórmulas y límites; la gráfica debe indicar unidades y comenzar en una escala que no exagere las diferencias. La propuesta de acción será medir más períodos y analizar factores operativos, no prometer reducciones futuras. La síntesis integra evidencia y explica incertidumbre sin ocultar datos que contradigan el mensaje inicial.`,
    questions: [
      numeric(
        "¿Cuál es la intensidad de emisiones de marzo?",
        0.4,
        "t CO₂e por t de producto",
        "60 / 150 = 0,40. Las unidades deben acompañar el indicador.",
      ),
      numeric(
        "¿En qué porcentaje disminuyó la intensidad entre enero y marzo? Introduce la magnitud positiva de la reducción.",
        20,
        "% de reducción",
        "Enero: 50/100 = 0,50. Marzo: 0,40. (0,50 − 0,40) / 0,50 × 100 = 20 %. Las emisiones totales aumentaron de 50 a 60.",
      ),
      choice(
        "¿Qué resumen ejecutivo respeta todos los documentos?",
        [
          "La intensidad bajó 20 % y las emisiones totales subieron; falta análisis para atribuir el cambio a la tecnología.",
          "Las emisiones totales bajaron 20 % y la tecnología ya demostró ser la causa.",
          "La planta no emite carbono porque mejoró su intensidad.",
        ],
        0,
        "El indicador relativo mejoró, pero el total subió y no hay diseño que permita atribución causal.",
      ),
      matching(
        "Relaciona elemento con su función en el informe.",
        [
          ["Tabla enero–marzo", "Evidencia del período observado"],
          ["Emisiones / producción", "Fórmula del indicador de intensidad"],
          ["Transporte de proveedores excluido", "Límite de cobertura"],
          ["Medir más períodos y factores", "Próximo paso verificable"],
        ],
        "Una síntesis útil conserva evidencia, indicador, alcance y acción; no solo la conclusión favorable.",
      ),
      ordering(
        "Ordena una síntesis ejecutiva revisable.",
        [
          "Precisar audiencia y pregunta del informe",
          "Comprobar unidades y cobertura de los datos",
          "Calcular indicadores y contrastar totales",
          "Redactar hallazgo con límites y acción",
          "Verificar que texto y gráfica coinciden",
        ],
        "La redacción debe seguir al análisis y comprobarse contra la evidencia original.",
      ),
    ],
  },
  {
    week: 14,
    name: "Centro de comunicación: avisar sin perder precisión",
    objective:
      "Adaptar mensajes a audiencias y canales manteniendo hechos, vigencia y coherencia.",
    context: `EXPEDIENTE 14 · Servicio ficticio Agua Clara. Una intervención de mantenimiento requiere avisar a residentes, personal técnico y comercios. Debes coordinar mensajes que permitan actuar sin generar una alarma más amplia que la evidencia. No se describe una interrupción real de un servicio público.

Documento A, aviso autorizado a las 08:00 del lunes: el martes se suspenderá el suministro de 09:00 a 12:00 en el sector Norte, calles A, B y C, por mantenimiento programado. Punto de información: mesa de atención. La recomendación es almacenar agua de forma segura antes del horario y evitar rumores sobre otros sectores. Documento B, orden técnica: la cuadrilla llega a las 08:30, verifica permisos y protección, aísla el tramo a las 09:00, realiza mantenimiento y comprueba el servicio antes de la reapertura. Los residentes no necesitan todos los códigos internos de equipos para prepararse.

Documento C, actualización autorizada a las 10:30 del martes: se prevé restauración a las 13:00, una hora después del plan original. El sector y las calles no cambian. Documento D, análisis de canales: 70 % de hogares consulta mensajería móvil; un grupo depende de avisos impresos y llamadas. El porcentaje restante no debe asumirse como totalmente desconectado, pues el documento no describe sus hábitos completos.

La estrategia usará mensaje móvil breve, aviso impreso accesible y actualización para atención telefónica. Todas las versiones mantendrán sector, calles, horario actualizado y contacto; cada una mostrará la hora de revisión. Una imagen sin texto alternativo puede impedir acceso; un mensaje con solo «urgente» no permite prepararse. Debe retirarse o marcarse como desactualizado el aviso de las 12:00 para evitar contradicciones. La eficacia se medirá por comprensión del horario y sector, no solo por número de publicaciones o reacciones.`,
    questions: [
      choice(
        "A las 10:30 del martes, ¿qué mensaje debe difundirse a residentes?",
        [
          "Mantenimiento en sector Norte, calles A, B y C; restauración prevista a las 13:00, actualización 10:30; consulte la mesa de atención.",
          "Se suspende el servicio en toda la ciudad hasta nuevo aviso.",
          "Mantenimiento hasta las 12:00, sin mencionar la actualización.",
        ],
        0,
        "Respeta el alcance y modifica el horario, conservando hora de actualización y contacto.",
      ),
      matching(
        "Relaciona audiencia y contenido prioritario.",
        [
          ["Residentes", "Sector, horario, preparación segura y contacto"],
          [
            "Cuadrilla técnica",
            "Secuencia de aislamiento, protección y comprobación",
          ],
          [
            "Mesa de atención",
            "Versión vigente y respuestas coherentes a consultas",
          ],
          [
            "Hogares que no usan mensajería",
            "Aviso impreso o llamada con los mismos hechos",
          ],
        ],
        "La forma y detalle cambian con la audiencia; los hechos autorizados permanecen iguales.",
      ),
      numeric(
        "¿Cuántas horas dura ahora la suspensión prevista entre 09:00 y 13:00?",
        4,
        "horas",
        "13 − 9 = 4 horas; el aviso original contemplaba 3. La extensión es de una hora.",
      ),
      ordering(
        "Ordena la gestión de una actualización.",
        [
          "Confirmar nuevo horario con responsable autorizado",
          "Preparar mensaje con alcance y hora de revisión",
          "Actualizar canales y guion de atención",
          "Retirar o marcar versiones anteriores",
          "Comprobar comprensión y registrar nuevas consultas",
        ],
        "La actualización debe sincronizar canales y versiones para evitar contradicciones.",
      ),
      choice(
        "¿Qué medición evalúa mejor el objetivo comunicativo?",
        [
          "Número de colores del aviso.",
          "Porcentaje de residentes consultados que identifica correctamente sector y nuevo horario.",
          "Cantidad de veces que se copia el mensaje sin leerlo.",
        ],
        1,
        "La finalidad es que las personas comprendan y puedan actuar, no solo que circule una publicación.",
      ),
    ],
  },
  {
    week: 15,
    name: "Auditoría del portafolio: evidencia de calidad y acceso",
    objective:
      "Aplicar una rúbrica de competencias y priorizar correcciones de accesibilidad comprobables.",
    context: `EXPEDIENTE 15 · Comité ficticio de Calidad del Aprendizaje. Recibes un portafolio digital de ocho evidencias de práctica. Tu misión es revisar cómo demuestra competencias informacionales y si otras personas pueden acceder al contenido. Los resultados no son una evaluación real de ULEAM.

Rúbrica del caso: trazabilidad vale 4 puntos; justificación de decisiones, 3; accesibilidad, 3. Se asigna la mitad del peso cuando el criterio está parcialmente cumplido y cero cuando no hay evidencia. Trazabilidad está completa: las ocho piezas tienen autor, fecha, enlace y localizador. Justificación es parcial: se citan las fuentes, pero solo se explica por qué se eligieron cuatro de ellas. Accesibilidad está ausente en esta revisión: la navegación requiere mouse, los gráficos distinguen grupos únicamente por rojo y verde, y un video de tres minutos no tiene subtítulos ni transcripción.

Documento A, prueba de teclado: no se llega al botón «enviar» porque es un elemento sin control accesible. Documento B, revisión del gráfico: categorías A y B no tienen etiquetas ni patrones. Documento C, revisión audiovisual: la explicación sobre búsqueda aparece únicamente en el audio. Documento D, ficha de mejora: usar controles semánticos con foco visible, ofrecer etiquetas junto al color y subtítulos revisados con alternativa textual. Un resultado automatizado sin errores no reemplaza la revisión manual ni la prueba con usuarios.

El comité dispone de una jornada de corrección y prioriza las barreras que impiden realizar la tarea: acceso por teclado al envío, comprensión del gráfico y contenido audiovisual. Luego ampliará las justificaciones con pregunta, criterios, alternativas descartadas y límites. No se evalúa la competencia por el número de archivos ni por el diseño de portada. Cada corrección se acompañará de evidencia antes/después y nueva prueba; un portafolio de calidad muestra el razonamiento y su evolución, además del producto final.`,
    questions: [
      numeric(
        "¿Qué puntuación obtiene el portafolio con la rúbrica indicada?",
        5.5,
        "puntos sobre 10",
        "Trazabilidad completa: 4. Justificación parcial: 3/2 = 1,5. Accesibilidad ausente: 0. Total 5,5.",
      ),
      matching(
        "Relaciona barrera y corrección verificable.",
        [
          [
            "Envío inaccesible por teclado",
            "Control semántico, foco visible y prueba sin mouse",
          ],
          [
            "Gráfico dependiente solo del color",
            "Etiquetas y patrones además del color",
          ],
          [
            "Información únicamente en audio",
            "Subtítulos revisados y alternativa textual",
          ],
          [
            "Fuentes sin justificación de selección",
            "Registrar criterios, alternativas y límites",
          ],
        ],
        "Las mejoras se prueban en la tarea concreta, no solo con una inspección visual.",
      ),
      choice(
        "¿Qué evidencia demuestra mejor la competencia informacional?",
        [
          "Una portada vistosa y ocho archivos sin explicación.",
          "Una decisión respaldada por fuentes recuperables, criterios de selección y límites.",
          "Una captura de una respuesta de IA aceptada sin comprobación.",
        ],
        1,
        "La competencia integra trazabilidad y razonamiento; acumular documentos no basta.",
      ),
      ordering(
        "Ordena el ciclo de corrección del portafolio.",
        [
          "Aplicar rúbrica y registrar barreras observadas",
          "Priorizar impedimentos de acceso a tareas esenciales",
          "Corregir controles, gráficos y alternativas textuales",
          "Ampliar justificaciones de fuentes",
          "Repetir pruebas y guardar evidencia antes y después",
        ],
        "Una corrección debe terminar en validación; el antes/después documenta el aprendizaje.",
      ),
      choice(
        "¿Qué implica un resultado automatizado sin errores?",
        [
          "La accesibilidad está garantizada para todas las personas.",
          "Puede complementar la revisión, pero faltan pruebas manuales y de uso.",
          "Ya no hace falta comprobar teclado ni comprender el gráfico.",
        ],
        1,
        "Las herramientas automáticas detectan solo parte de los problemas y no sustituyen todas las comprobaciones.",
      ),
    ],
    references: [
      {
        name: "W3C · pautas y recursos de accesibilidad",
        url: "https://www.w3.org/WAI/standards-guidelines/wcag/",
      },
    ],
  },
  {
    week: 16,
    name: "Desafío integral: recomendar un piloto con evidencia y límites",
    objective:
      "Integrar necesidad, búsqueda, evaluación, cálculo, uso ético y comunicación en una decisión gerencial.",
    context: `EXPEDIENTE 16 · Comité ficticio Bahía Productiva. Considera abrir un punto de distribución y necesita una recomendación al final del día. El presupuesto máximo es USD 6.000. Se permite un piloto de tres meses, pero no una apertura definitiva sin comprobar demanda y costos. Todos los registros son ficticios y el caso no describe una decisión de una institución real.

Documento A, estudio local 2025: autores identificados, cuestionario y muestra de 100 comercios; 60 declaran interés. Los participantes se eligieron por conveniencia y la pregunta no incluía precio. Documento B, encuesta complementaria de intención pagada: 30 comercios aceptarían el precio del piloto, aunque no han firmado contratos. Documento C, anuncio comercial: «duplicará sus ventas», sin método ni fuente. Documento D, propuesta del piloto: costo inicial USD 1.200; costo fijo USD 800 por mes; costo variable de USD 4 por entrega y precio de USD 10. Se proyectan 150 entregas mensuales durante tres meses. Para el cálculo no hay impuestos ni otros costos. Documento E, reglas éticas: usar datos agregados, conservar referencias y no publicar contactos de participantes.

El ingreso previsto es precio por entregas; el costo total incluye inversión inicial, fijos de tres meses y variables de las 450 entregas. Un margen negativo no prueba que ningún diseño futuro sea viable, pero impide presentar el piloto como rentable bajo estas condiciones. El interés declarado tampoco equivale a compra garantizada. Se puede recomendar rediseñar el piloto y contrastar demanda antes de comprometer recursos.

La entrega será una ficha ejecutiva con decisión, cálculo, calidad de las fuentes, riesgos y próximo paso. La matriz de evidencia deberá registrar el localizador de cada cifra y las limitaciones de las encuestas. El comité exige que se separen hechos del expediente, estimaciones y supuestos, y que cualquier uso de IA se declare y valide.`,
    questions: [
      numeric(
        "¿Cuál es el costo total del piloto de tres meses, con 450 entregas?",
        5400,
        "USD",
        "Inicial: 1.200. Fijos: 800 × 3 = 2.400. Variables: 4 × 450 = 1.800. Total USD 5.400, dentro del presupuesto de USD 6.000.",
      ),
      numeric(
        "¿Cuál es el resultado previsto del piloto: ingreso menos costo total? Introduce un número negativo si hay pérdida.",
        -900,
        "USD",
        "Ingresos: 10 × 450 = 4.500. Resultado: 4.500 − 5.400 = −900. Estar dentro del presupuesto no equivale a ser rentable.",
      ),
      matching(
        "Relaciona evidencia y límite que debe comunicarse.",
        [
          [
            "60 de 100 declaran interés",
            "Muestra por conveniencia y pregunta sin precio",
          ],
          ["30 aceptarían el precio", "Intención todavía sin contratos"],
          [
            "Anuncio promete duplicar ventas",
            "Afirmación sin método ni respaldo",
          ],
          [
            "Proyección de 150 entregas mensuales",
            "Supuesto que debe contrastarse antes de comprometer recursos",
          ],
        ],
        "La recomendación integra respaldo y límites de cada dato, sin convertir intención en certeza.",
      ),
      choice(
        "¿Qué recomendación es más sólida para el comité?",
        [
          "Abrir definitivamente porque 60 % manifestó interés.",
          "Rediseñar o justificar explícitamente el costo de aprendizaje del piloto, validar demanda pagada y no prometer rentabilidad con el escenario actual.",
          "Publicar contactos de los encuestados para conseguir clientes cuanto antes.",
        ],
        1,
        "El escenario prevé pérdida; un piloto podría ser una inversión de aprendizaje si se autoriza con límites, pero no debe presentarse como rentable.",
      ),
      ordering(
        "Ordena el procedimiento integral del comité.",
        [
          "Definir decisión, presupuesto y evidencia necesaria",
          "Localizar documentos y comprobar sus métodos",
          "Calcular escenario y distinguir supuestos de hechos",
          "Comparar opciones con riesgos y reglas éticas",
          "Comunicar recomendación y siguiente verificación",
        ],
        "La decisión final integra competencias de las unidades: necesidad, búsqueda, evaluación, síntesis y comunicación.",
      ),
    ],
  },
].map((activity) => ({
  label: "Simulación educativa · Datos ficticios",
  references: [],
  ...activity,
  questions: activity.questions.map((question, index) => ({
    id: `gig-502-w${activity.week}-q${index + 1}`,
    ...question,
  })),
}));

export const alfinCourse = {
  id: "gig-502",
  code: "GIG-502",
  name: "Alfabetización y Competencias Informacionales",
  teacher: syllabus.institution.teacher,
  description: syllabus.courses[0].description,
  weeks: syllabus.weeks.map((week) => ({ ...week })),
  activities,
};
