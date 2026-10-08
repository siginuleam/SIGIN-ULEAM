// Temas transcritos del sílabo CEX-103-AC, período 2026-2.
// Todos los números, empresas y expedientes de las actividades son simulaciones educativas.
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
const refs = {
  wto: {
    name: "OMC · Comprender la OMC",
    url: "https://www.wto.org/spanish/thewto_s/whatis_s/whatis_s.htm",
  },
  pro: {
    name: "PRO ECUADOR · Información y promoción de exportaciones",
    url: "https://www.proecuador.gob.ec/",
  },
  senae: {
    name: "SENAE · Servicio Nacional de Aduana del Ecuador",
    url: "https://www.aduana.gob.ec/",
  },
  bce: {
    name: "Banco Central del Ecuador · Estadísticas económicas",
    url: "https://www.bce.fin.ec/",
  },
  itc: {
    name: "Centro de Comercio Internacional · Recursos comerciales",
    url: "https://www.intracen.org/",
  },
  icc: {
    name: "ICC · Reglas Incoterms®",
    url: "https://iccwbo.org/business-solutions/incoterms-rules/",
  },
  ilo: {
    name: "OIT · Normas internacionales del trabajo",
    url: "https://www.ilo.org/es",
  },
  agro: {
    name: "Agrocalidad · Autoridad fito y zoosanitaria",
    url: "https://www.agrocalidad.gob.ec/",
  },
};
const unitNames = [
  "UNIDAD 1: CONCEPTOS BÁSICOS Y ANTECEDENTES DEL COMERCIO EXTERIOR.",
  "UNIDAD 2: TEORÍAS DEL COMERCIO INTERNACIONAL.",
  "UNIDAD 3: EL ESCENARIO INTERNACIONAL.",
  "UNIDAD 4: EL ROL DEL ESTADO.",
];
const topics = [
  "Encuadre y socialización del sílabo. 1.1. Conceptos, diferencias e importancia del comercio exterior y comercio Internacional.",
  "1.2. Elementos básicos del comercio exterior.",
  "1.3. Origen e Historia del Comercio Internacional.",
  "1.4. Evolución del comercio exterior en Ecuador.",
  "2.1. Diferencias políticas, económicas, legales, culturales entre países.",
  "2.2. Teorías clásicas del Comercio Internacional. 2.3. Teorías de los factores de la producción.",
  "2.4. Nuevas teorías del comercio internacional. 2.5. Teorías de la Ventaja Competitiva.",
  "2.6 Ética y responsabilidad en el comercio internacional.",
  "3.1. Globalización, Mundialización e internacionalización.",
  "3.2. Instituciones que regulan y facilitan el comercio internacional.",
  "3.3. Factores que afectan el comercio internacional.",
  "3.4. Medios y rutas de transporte internacional. 3.5. Introducción a los Incoterms y su aplicación básica en el comercio internacional.",
  "4.1. Normativa y Política Comercial del Ecuador. 4.2. Instituciones del Comercio Exterior en el Ecuador",
  "4.3. Operaciones de Exportación, importación e intercambio compensado.",
  "4.4. Balanza de pagos: Estructura, importancia e interpretación básica.",
  "4.4. Balanza de pagos: Estructura, importancia e interpretación básica. EXAMEN FINAL",
];

const activities = [
  {
    week: 1,
    name: "Misión 01 · ¿Vender fuera ya es comercio exterior?",
    objective:
      "Distinguir una operación internacional de una venta local y reconstruir su circuito comercial con evidencia.",
    context: `SIMULACIÓN EDUCATIVA · Cooperativa Costa Cacao. La empresa y todos los documentos de este expediente son ficticios. No describen operaciones de una organización real.

La cooperativa reúne a pequeños productores de Manabí. Actualmente entrega pasta de cacao a cafeterías de Manta. Su responsable comercial recibe dos solicitudes: una cafetería local pide 900 frascos y una tienda de Nordia, país ficticio, pide 1.200 frascos de 250 gramos. Tu equipo debe explicar a los productores qué cambia cuando el cliente está fuera del país. Una venta grande no es automáticamente una exportación: importa que la operación cruce una frontera y cómo se realiza y documenta.

Documento A — Oferta local: comprador establecido en Manta; 900 frascos; precio unitario USD 3,00; entrega en el local del comprador; pago por transferencia nacional. Documento B — Solicitud internacional: comprador establecido en Nordia; 1.200 frascos; precio unitario USD 3,40; entrega y distribución de gastos todavía por negociar; petición de información sobre composición, origen, embalaje y plazo. Es una solicitud, no una exportación ya ejecutada. No sumes cantidades de ambos pedidos cuando calcules el valor de B.

Guía de conceptos: comercio exterior observa las operaciones de un país con el resto del mundo; comercio internacional estudia el intercambio entre países y sus relaciones más amplias. Exportar es vender o enviar bienes hacia otro territorio conforme al régimen aplicable; importar es introducir bienes desde otro territorio. La aduana controla el movimiento transfronterizo de mercancías. El origen identifica dónde se obtiene o transforma un producto según las reglas correspondientes; no equivale automáticamente al puerto de salida.

Ruta de trabajo acordada para el ejercicio: primero confirmar producto y comprador; después negociar precio y condiciones; luego preparar documentos y despacho; finalmente transportar, entregar y conciliar el pago. Una divisa es moneda extranjera desde la perspectiva del país analizado. En Ecuador se usa el dólar estadounidense, por lo que no debe confundirse toda venta internacional con una conversión de moneda. Tu recomendación debe apoyarse en el expediente y señalar las condiciones todavía no acordadas.`,
    references: [refs.wto, refs.pro],
    questions: [
      choice(
        "¿Qué afirmación describe con precisión la solicitud B?",
        [
          "Ya se ejecutó una exportación por recibir un correo extranjero.",
          "Es una oportunidad de operación internacional; falta acordar condiciones y ejecutarla.",
          "Es comercio local porque se cotiza en dólares.",
          "Es una importación de la cooperativa.",
        ],
        1,
        "El domicilio extranjero del comprador abre una operación internacional, pero una solicitud no prueba despacho, entrega ni pago.",
      ),
      matching(
        "Relaciona cada concepto con el elemento pertinente del expediente.",
        [
          [
            "Comercio exterior",
            "Operaciones de Ecuador con compradores de otros países",
          ],
          ["Exportador", "Cooperativa que vende el producto hacia Nordia"],
          ["Importador", "Comprador que introduce el producto en Nordia"],
          [
            "Origen",
            "Criterio que identifica dónde se obtiene o transforma el producto",
          ],
        ],
        "El punto de vista importa: una misma mercancía se exporta desde Ecuador y se importa en el destino.",
      ),
      ordering(
        "Reconstruye la ruta acordada para esta primera operación.",
        [
          "Confirmar producto y comprador",
          "Negociar precio y condiciones",
          "Preparar documentos y despacho",
          "Transportar, entregar y conciliar el pago",
        ],
        "La secuencia evita despachar antes de definir lo que se vendió y quién asume los gastos.",
      ),
      numeric(
        "¿Cuál es el valor comercial de la solicitud B, antes de gastos todavía no negociados?",
        4080,
        "USD",
        "1.200 frascos × USD 3,40 = USD 4.080. No incluye la venta local ni presupone un Incoterm.",
      ),
      crossword(
        "Completa el vocabulario del primer expediente.",
        [
          [
            "ADUANA",
            "Autoridad que controla el movimiento transfronterizo de mercancías.",
          ],
          [
            "ORIGEN",
            "Identifica dónde se obtiene o transforma un bien según las reglas aplicables.",
          ],
          [
            "DIVISA",
            "Moneda extranjera desde la perspectiva del país analizado.",
          ],
        ],
        "Estas palabras permiten describir una operación con más precisión que decir solamente «venta al extranjero».",
      ),
    ],
  },
  {
    week: 2,
    name: "Misión 02 · El embarque que no cabe en su ficha",
    objective:
      "Construir una ficha comercial coherente y detectar diferencias entre unidades, peso neto, peso bruto y documentos.",
    context: `SIMULACIÓN EDUCATIVA · Taller de caracterización de un producto. Todas las cantidades, fichas y mensajes son inventados para el aprendizaje; no son una clasificación aduanera ni requisitos vigentes de un destino real.

Costa Cacao prepara una propuesta de exportación de barras de chocolate. La asistente registró «600 unidades» en la factura preliminar. El encargado de bodega advierte que preparó 600 cajas, no 600 barras. Si la discrepancia llega al comprador, se puede cobrar mal, reservar un transporte insuficiente o declarar cantidades inconsistentes. Tu misión consiste en reconstruir una ficha que permita a otra persona entender exactamente qué se venderá.

Ficha de producción: cada caja contiene 12 barras; cada barra tiene 90 gramos de producto; el envase y la caja suman 0,12 kilogramos por caja. No hay pallets incluidos en estos pesos. Son 600 cajas iguales. Peso neto significa únicamente mercancía; peso bruto incluye los embalajes considerados en la ficha. En este ejercicio, cada caja contiene 1,08 kilogramos netos y pesa 1,20 kilogramos brutos. Debes conservar las unidades y no mezclar gramos con kilogramos.

Carpeta comercial: la factura identifica vendedor, comprador, mercancía, cantidades, precios y condiciones; la lista de empaque detalla distribución por cajas y pesos; el documento de transporte acredita información del traslado según su modalidad; un documento de origen, cuando corresponda, sustenta una regla de origen. Ninguno reemplaza automáticamente a los demás. Una ficha comercial también debe incluir composición, presentación, conservación y vida útil: el comprador necesita verificar que el producto es adecuado antes de contratar.

Mensaje de control: «Para este taller, validaremos la clasificación arancelaria consultando descripción, ingredientes y proceso; no la deduciremos solo del nombre chocolate». La clasificación organiza mercancías para la gestión comercial y aduanera. En una operación real debe confirmarse en fuentes oficiales y con el detalle del producto. Secuencia de revisión: contar barras y cajas; calcular y contrastar pesos; comparar factura y empaque; registrar y corregir diferencias antes de enviar la propuesta. Tu respuesta debe hacer visible la corrección, no ocultar el dato original.`,
    references: [refs.senae, refs.pro],
    questions: [
      choice(
        "La factura dice «600 unidades» y bodega preparó 600 cajas. ¿Qué acción reduce el riesgo?",
        [
          "Aceptar el dato: caja y barra son equivalentes.",
          "Corregir la unidad y documentar 600 cajas / 7.200 barras en los documentos pertinentes.",
          "Cambiar el peso sin cambiar la cantidad.",
          "Enviar primero y aclarar cuando cobre el cliente.",
        ],
        1,
        "600 cajas × 12 barras = 7.200 barras. Cantidad y unidad deben quedar expresadas de forma consistente.",
      ),
      matching(
        "Une el documento con la pregunta que ayuda a responder.",
        [
          ["Factura comercial", "¿Qué se vende, a quién y por qué precio?"],
          [
            "Lista de empaque",
            "¿Cómo se distribuyen las cajas y cuánto pesan?",
          ],
          [
            "Documento de transporte",
            "¿Cómo se identifica el traslado contratado?",
          ],
          [
            "Ficha comercial",
            "¿Qué composición, presentación y conservación tiene el producto?",
          ],
        ],
        "Los documentos cumplen funciones complementarias; su información común debe coincidir.",
      ),
      ordering(
        "Ordena la revisión indicada por el mensaje de control.",
        [
          "Contar barras y cajas",
          "Calcular y contrastar pesos",
          "Comparar factura y lista de empaque",
          "Registrar y corregir diferencias antes de enviar",
        ],
        "Primero se establece la realidad física y después se verifica la coherencia documental.",
      ),
      numeric(
        "¿Cuál es el peso bruto total de las 600 cajas, sin pallets?",
        720,
        "kg",
        "Cada caja: 12 × 90 g = 1.080 g = 1,08 kg netos; + 0,12 kg de embalaje = 1,20 kg. 600 × 1,20 = 720 kg.",
      ),
      crossword(
        "Resuelve los términos de la ficha.",
        [
          ["NETO", "Peso del producto sin el embalaje considerado."],
          ["BRUTO", "Peso que incluye mercancía y embalaje."],
          [
            "EMPAQUE",
            "Protección y presentación que organiza físicamente la mercancía.",
          ],
        ],
        "Declarar peso neto como bruto puede producir reservas logísticas y documentos incorrectos.",
      ),
    ],
  },
  {
    week: 3,
    name: "Misión 03 · El archivo que cuenta una evolución",
    objective:
      "Reconstruir una trayectoria comercial y distinguir evidencia histórica, inferencia y causalidad no demostrada.",
    context: `SIMULACIÓN EDUCATIVA · Archivo histórico de una cooperativa ficticia. Los registros empresariales y sus fechas fueron creados para este ejercicio. Son una herramienta de análisis; no una historia real de las exportaciones ecuatorianas.

El comercio entre comunidades existía mucho antes de las empresas contemporáneas: el trueque intercambiaba bienes directamente; las monedas facilitaron comparar valores; las rutas ampliaron intercambios, junto con costos, riesgos e intermediación. No hubo una sola ruta ni una evolución idéntica en todos los pueblos. Tu trabajo consiste en conectar estos elementos generales con un archivo empresarial concreto sin presentar una coincidencia temporal como prueba de causalidad.

Tarjeta 1 — 1998: Costa Cacao vende sacos a compradores cercanos; los acuerdos se anotan en un cuaderno; no aparece cliente extranjero. Tarjeta 2 — 2005: una distribuidora extranjera compra el primer lote registrado para destino internacional; la carpeta conserva factura, lista de empaque y comprobante de recepción. Tarjeta 3 — 2012: se introduce registro de lotes y proveedores para responder a un comprador que pide trazabilidad. Tarjeta 4 — 2018: la cooperativa ofrece barras con marca propia y características diferenciadas, además de materia prima. Tarjeta 5 — 2024: incorpora un catálogo digital y recibe consultas desde nuevos mercados. El catálogo demuestra una herramienta comercial, no que cada consulta se convirtió en venta.

Cuaderno de análisis: una ruta une lugares de intercambio; un arancel es un gravamen aplicado a mercancías conforme al régimen correspondiente; la trazabilidad permite seguir lotes y registros. La existencia de un documento de recepción fortalece la evidencia de una operación ejecutada. Un mensaje de interés comercial aporta evidencia más limitada. La ausencia de un registro tampoco permite afirmar con certeza que nunca ocurrió una venta.

Informe solicitado: construye una cronología; diferencia venta local, exportación documentada, capacidad de control y diferenciación; explica cómo los medios de información pueden reducir obstáculos. La línea temporal no debe afirmar que «el catálogo causó todas las ventas» porque faltan datos sobre conversiones y otros factores. Para calcular intervalos usa diferencia entre años, sin contar cada año de manera inclusiva. La evidencia debe sostener exactamente el alcance de tu conclusión.`,
    references: [refs.wto, refs.pro],
    questions: [
      choice(
        "¿Qué conclusión está mejor sustentada por el archivo?",
        [
          "En 1998 ya se exportaba porque el cacao es exportable.",
          "El catálogo de 2024 garantiza ventas internacionales.",
          "En 2005 existe evidencia documental de una operación internacional ejecutada.",
          "La trazabilidad nació en el mundo en 2012.",
        ],
        2,
        "Factura, empaque y recepción de 2005 respaldan esa operación. Las demás afirmaciones exceden lo que muestra el archivo.",
      ),
      matching(
        "Relaciona cada evidencia con el cambio que respalda.",
        [
          ["Cuaderno de 1998", "Registro de ventas cercanas"],
          [
            "Carpeta de 2005",
            "Primera operación internacional documentada en el archivo",
          ],
          ["Registro de lotes de 2012", "Capacidad de trazabilidad"],
          ["Oferta de 2018", "Diferenciación mediante marca y presentación"],
        ],
        "Cada documento permite una afirmación acotada; no demuestra todos los resultados comerciales.",
      ),
      ordering(
        "Reconstruye la trayectoria de Costa Cacao de la más antigua a la más reciente.",
        [
          "Ventas locales en cuaderno (1998)",
          "Lote internacional documentado (2005)",
          "Registro de lotes y proveedores (2012)",
          "Barras con marca propia (2018)",
          "Catálogo digital (2024)",
        ],
        "Ordenar eventos ayuda a describir evolución; para explicar sus causas harían falta más fuentes.",
      ),
      numeric(
        "¿Cuántos años transcurrieron entre el lote internacional documentado y la oferta de barras con marca?",
        13,
        "años",
        "2018 − 2005 = 13 años. Es un intervalo temporal, no una medida del efecto de una política.",
      ),
      crossword(
        "Recupera tres conceptos del análisis histórico.",
        [
          [
            "TRUEQUE",
            "Intercambio directo de bienes sin una moneda como medio de pago.",
          ],
          [
            "ARANCEL",
            "Gravamen aplicado a mercancías conforme al régimen correspondiente.",
          ],
          ["RUTA", "Trayecto que conecta lugares de intercambio."],
        ],
        "Medios de pago, reglas y trayectos ayudan a entender cómo cambian las condiciones del comercio.",
      ),
    ],
  },
  {
    week: 4,
    name: "Misión 04 · ¿Diversificarse significa exportar más?",
    objective:
      "Interpretar una evolución comercial con datos comparables y distinguir crecimiento total de cambios en la composición.",
    context: `SIMULACIÓN EDUCATIVA · Observatorio de comercio de un país de práctica inspirado en preguntas ecuatorianas. Las cifras de la tabla son inventadas y NO son estadísticas del Ecuador. Para describir el país real se deben consultar las series y notas del Banco Central del Ecuador.

Tu equipo prepara una infografía titulada «¿Cambió la estructura exportadora?». Antes de usar números debe definir período, cobertura, unidad y fuente. Como hitos de contexto ecuatoriano, distingue el desarrollo de exportaciones petroleras desde la década de 1970, la adopción del dólar en 2000 y cambios posteriores en acuerdos y mercados. Estos hitos orientan preguntas históricas; no explican por sí solos cada variación anual ni se convierten en porcentajes de la tabla ficticia.

Tabla didáctica — exportaciones en millones de USD, misma cobertura y método. Año 2000: cacao 60; conservas de pescado 20; petróleo 120; total 200. Año 2025: cacao 90; conservas de pescado 70; petróleo 140; total 300. En esta tabla, cacao y petróleo se agrupan como bienes primarios; conservas como elaboración industrial. No es una clasificación completa de todos los bienes de un país real. Tampoco incorpora importaciones, por lo que no permite calcular una balanza comercial.

Memo de interpretación: crecimiento absoluto compara valores entre períodos; participación divide el componente por el total del mismo período. El total creció 100 millones, pero una categoría puede aumentar en dólares y perder participación. Las conservas pasan de 20/200 a 70/300. Los bienes primarios de 2025 suman 90 + 140. Diversificar puede significar incorporar productos, destinos o mayor variedad; una sola tabla de tres productos no mide todas esas dimensiones.

El editor propone escribir «la dolarización causó toda la expansión». Tu informe debe rechazar esa conclusión: no hay diseño causal, series suficientes ni comparación de factores. También debe evitar atribuir al Ecuador los valores del ejercicio. Procedimiento solicitado: declarar fuente y carácter simulado; validar los totales; calcular participaciones; comparar y redactar una conclusión con límites. Así la infografía comunica una tendencia verificable sin inventar una explicación histórica.`,
    references: [refs.bce, refs.pro],
    questions: [
      choice(
        "¿Cuál sería un pie de infografía responsable?",
        [
          "Datos oficiales del Ecuador: la dolarización explica toda la expansión.",
          "Tabla simulada: aumentan total y participación de conservas; no demuestra causas ni representa cifras reales de Ecuador.",
          "Las importaciones cayeron porque aumentaron las exportaciones.",
          "No hubo cambio porque sigue habiendo petróleo.",
        ],
        1,
        "La tabla permite comparar valores y participación, pero no medir importaciones ni demostrar causalidad.",
      ),
      matching(
        "Relaciona cada indicador con su cálculo o alcance.",
        [
          ["Crecimiento absoluto del total", "300 − 200 = 100 millones"],
          ["Participación de conservas en 2000", "20 ÷ 200 × 100 = 10 %"],
          ["Bienes primarios en 2025", "90 + 140 = 230 millones"],
          [
            "Balanza comercial",
            "Requiere exportaciones e importaciones comparables",
          ],
        ],
        "Un indicador responde una pregunta concreta y no reemplaza los demás.",
      ),
      ordering(
        "Organiza la revisión de la infografía antes de publicarla.",
        [
          "Declarar fuente y carácter simulado",
          "Validar que las categorías sumen los totales",
          "Calcular participaciones por período",
          "Comparar y redactar una conclusión con límites",
        ],
        "La revisión comienza por la identidad y alcance de los datos, antes de interpretar los porcentajes.",
      ),
      numeric(
        "En la tabla simulada, ¿qué porcentaje de las exportaciones de 2025 corresponde a bienes primarios? Redondea a dos decimales.",
        76.67,
        "%",
        "(90 + 140) ÷ 300 × 100 = 76,666… %, aproximadamente 76,67 %. No es un indicador real del Ecuador.",
        0.02,
      ),
      crossword(
        "Completa los términos para leer la evolución.",
        [
          ["DOLAR", "Moneda adoptada por Ecuador en el año 2000."],
          ["DESTINO", "Mercado hacia el que se dirige una exportación."],
          [
            "SERIE",
            "Conjunto de observaciones comparables a través del tiempo.",
          ],
        ],
        "Para estudiar evolución se necesitan series comparables y una interpretación que respete su cobertura.",
      ),
    ],
  },
  {
    week: 5,
    name: "Misión 05 · Elegir mercado con una matriz defendible",
    objective:
      "Comparar dos mercados ficticios mediante criterios económicos, legales, logísticos y culturales sin depender de estereotipos.",
    context: `SIMULACIÓN EDUCATIVA · Comité de selección de mercado. Nordia y Costamar son países ficticios. Los puntajes, exigencias y observaciones siguientes se crean exclusivamente para practicar una decisión comparativa.

Costa Cacao debe elegir dónde ensayar su primera venta de barras. El gerente prefiere Nordia porque recibió un mensaje entusiasta. La encargada de operaciones propone comparar evidencia antes de decidir. Tu equipo recibirá una matriz con cuatro criterios. Los puntajes van de 1 a 5: una puntuación mayor siempre indica mayor conveniencia para la cooperativa. Los pesos suman 100 %. No conviertas las preferencias personales del gerente en datos ni supongas que un país entero tiene una sola cultura.

Matriz — margen estimado, peso 30 %: Nordia 4, Costamar 3. Facilidad de cumplir requisitos documentados, peso 25 %: Nordia 2, Costamar 5. Fiabilidad logística, peso 25 %: Nordia 5, Costamar 3. Adecuación de propuesta comercial a la investigación del cliente, peso 20 %: Nordia 3, Costamar 4. La puntuación ponderada se obtiene multiplicando cada puntaje por su peso decimal y sumando resultados. No sumes porcentajes como si fueran puntajes independientes.

Notas del expediente: en Nordia el cliente pide rehacer etiqueta y demostrar conservación; en Costamar el borrador ya cumple la lista ficticia del taller. Los clientes de ambos mercados fueron entrevistados individualmente. La investigación de preferencias se refiere a esos compradores, no a toda la población. Como dimensión política, el comité revisará estabilidad de reglas y acceso a información; como dimensión económica, margen y capacidad de pago; como dimensión legal, requisitos y contratos; como dimensión cultural, idioma y expectativas comerciales verificadas.

Una mayor puntuación no elimina la necesidad de verificar requisitos oficiales en una operación real. El orden acordado es fijar criterios y pesos antes de puntuar, comprobar la evidencia, calcular y realizar una revisión de riesgos antes de seleccionar. Si cambia un peso, la elección puede cambiar. La recomendación debe explicar ventajas y límites del método, en lugar de afirmar que un mercado «es el mejor del mundo».`,
    references: [refs.itc, refs.pro],
    questions: [
      choice(
        "¿Qué conclusión corresponde a los puntajes y pesos definidos?",
        [
          "Nordia gana porque tiene un criterio con 5.",
          "Costamar obtiene 3,70 y supera a Nordia, que obtiene 3,55; la elección debe revisar riesgos.",
          "Ambos empatan al sumar los pesos.",
          "Se puede omitir el cumplimiento documental si el margen es alto.",
        ],
        1,
        "Nordia: 4×0,30 + 2×0,25 + 5×0,25 + 3×0,20 = 3,55. Costamar: 3×0,30 + 5×0,25 + 3×0,25 + 4×0,20 = 3,70.",
      ),
      matching(
        "Relaciona la dimensión con la investigación apropiada.",
        [
          [
            "Política",
            "Estabilidad de reglas y acceso a información institucional",
          ],
          ["Económica", "Margen previsto y capacidad de pago del cliente"],
          ["Legal", "Requisitos documentados y condiciones contractuales"],
          ["Cultural", "Idioma y expectativas verificadas del comprador"],
        ],
        "Una comparación útil usa evidencia concreta y evita convertir nacionalidades en estereotipos.",
      ),
      ordering(
        "Ordena la metodología de selección acordada.",
        [
          "Fijar criterios y pesos antes de puntuar",
          "Comprobar evidencia y asignar puntajes",
          "Calcular resultados ponderados",
          "Revisar riesgos y justificar la selección",
        ],
        "Establecer pesos después de ver el resultado permite manipular la elección.",
      ),
      numeric(
        "Calcula la puntuación ponderada de Costamar en la escala de 1 a 5.",
        3.7,
        "puntos",
        "3×0,30 + 5×0,25 + 3×0,25 + 4×0,20 = 0,90 + 1,25 + 0,75 + 0,80 = 3,70.",
      ),
      crossword(
        "Resuelve los conceptos de la matriz.",
        [
          ["CRITERIO", "Aspecto definido para evaluar opciones."],
          ["PESO", "Importancia relativa asignada a un criterio."],
          [
            "MARGEN",
            "Diferencia económica esperada entre ingresos y costos considerados.",
          ],
        ],
        "Explicitar criterios y pesos permite discutir la decisión y reproducir el cálculo.",
      ),
    ],
  },
  {
    week: 6,
    name: "Misión 06 · La negociación de los costos de oportunidad",
    objective:
      "Aplicar ventaja absoluta y comparativa y distinguirlas de explicaciones basadas en dotaciones de factores.",
    context: `SIMULACIÓN EDUCATIVA · Laboratorio de dos economías. Ecuador-laboratorio y Nordia-laboratorio son modelos simplificados: los tiempos de producción NO son datos de países reales ni predicciones comerciales.

Dos equipos disponen de horas de trabajo idénticas y pueden fabricar tabletas de chocolate o camisas. El modelo supone calidad equivalente, rendimientos constantes, ausencia de transporte y pleno uso del trabajo. Permite entender una teoría, pero no incorpora salarios, barreras, aprendizaje, ambiente ni todas las condiciones reales. Tu tarea es decidir la especialización usando costos de oportunidad; no basta mirar quién produce más rápido un solo bien.

Tabla de trabajo por unidad: Ecuador-laboratorio necesita 6 horas por tableta y 3 horas por camisa; Nordia-laboratorio necesita 8 horas por tableta y 2 horas por camisa. Ventaja absoluta significa requerir menos recursos por unidad: Ecuador-laboratorio la tiene en chocolate y Nordia-laboratorio en camisas. Costo de oportunidad indica cuánto de otro bien se deja de producir. En Ecuador-laboratorio, 6 horas usadas en una tableta permiten fabricar 2 camisas. En Nordia-laboratorio, 8 horas usadas en una tableta permiten fabricar 4 camisas.

Memo de negociación: la ventaja comparativa corresponde al menor costo de oportunidad. Si se acuerda intercambiar una tableta por 3 camisas, Ecuador-laboratorio obtiene más camisas que las 2 sacrificadas al fabricar una tableta; Nordia-laboratorio entrega 3 en vez de sacrificar 4 para fabricar su propia tableta. Ese rango ayuda a explicar ganancias posibles del intercambio en este modelo, sin asegurar cómo se distribuyen en la vida real.

Tarjeta de factores: las teorías de dotaciones analizan recursos como trabajo, capital y tierra y la intensidad con que los utilizan los bienes. No deben confundirse con afirmar «el país con más personas siempre exporta todo». Secuencia solicitada: leer requerimientos físicos; calcular costos de oportunidad; identificar ventaja comparativa; evaluar un intercambio mutuamente conveniente. Mantén separadas las unidades: horas por tableta, camisas por tableta y precio de intercambio son medidas distintas.`,
    references: [refs.wto, refs.itc],
    questions: [
      choice(
        "En el modelo, ¿qué especialización se apoya en la ventaja comparativa?",
        [
          "Ecuador-laboratorio en camisas y Nordia-laboratorio en chocolate.",
          "Ambos en chocolate porque tiene más horas.",
          "Ecuador-laboratorio en chocolate y Nordia-laboratorio en camisas.",
          "No hay ventaja comparativa porque ambos pueden fabricar ambos bienes.",
        ],
        2,
        "Ecuador sacrifica 2 camisas por tableta y Nordia 4; Ecuador tiene menor costo de oportunidad del chocolate. Nordia tiene menor costo de oportunidad de camisas.",
      ),
      matching(
        "Relaciona el concepto con la evidencia del laboratorio.",
        [
          [
            "Ventaja absoluta en chocolate",
            "6 horas frente a 8 horas por tableta",
          ],
          [
            "Costo de oportunidad en Ecuador-laboratorio",
            "2 camisas por tableta",
          ],
          [
            "Costo de oportunidad en Nordia-laboratorio",
            "4 camisas por tableta",
          ],
          [
            "Dotación de factores",
            "Disponibilidad relativa de trabajo, capital y tierra",
          ],
        ],
        "Ventaja absoluta compara recursos por unidad; comparativa compara sacrificios relativos.",
      ),
      ordering(
        "Ordena el razonamiento de la negociación.",
        [
          "Leer requerimientos de horas por bien",
          "Calcular costos de oportunidad",
          "Identificar la ventaja comparativa",
          "Evaluar el intercambio de 1 tableta por 3 camisas",
        ],
        "Sin costos de oportunidad no se puede justificar la especialización comparativa.",
      ),
      numeric(
        "¿Cuántas camisas deja de fabricar Nordia-laboratorio por producir una tableta de chocolate?",
        4,
        "camisas por tableta",
        "8 horas por tableta ÷ 2 horas por camisa = 4 camisas.",
      ),
      crossword(
        "Resuelve los términos de la teoría.",
        [
          [
            "CAPITAL",
            "Factor que incluye recursos productivos como maquinaria.",
          ],
          [
            "TRABAJO",
            "Factor asociado al esfuerzo humano usado en producción.",
          ],
          ["RELATIVO", "Carácter del costo que compara un bien con otro."],
        ],
        "Las teorías explican mecanismos distintos; una tabla de horas no describe todas las dotaciones o instituciones.",
      ),
    ],
  },
  {
    week: 7,
    name: "Misión 07 · Escala, diferenciación y una promesa verificable",
    objective:
      "Evaluar economías de escala y una propuesta de ventaja competitiva sin confundir tamaño, demanda y rentabilidad.",
    context: `SIMULACIÓN EDUCATIVA · Comité de expansión de Costa Cacao. La función de costos, las solicitudes y los atributos comerciales son inventados. No representan precios ni competitividad real de una empresa ecuatoriana.

La cooperativa recibe una consulta por barras de origen trazable. El gerente propone multiplicar producción por cuatro porque «si sale más barato, todo se venderá». Tu equipo debe diferenciar una reducción de costo medio de la existencia de compradores. Las nuevas teorías del comercio incorporan, entre otros mecanismos, economías de escala y diferenciación: intercambiar variedades puede tener sentido incluso entre economías parecidas. La ventaja competitiva también depende de capacidades, condiciones del entorno y decisiones sostenibles, no de un eslogan.

Hoja de costos del mes: costo fijo USD 12.000; costo variable USD 6 por unidad. Costo total = 12.000 + 6 × Q. Costo medio = costo total ÷ Q. Capacidad máxima disponible: 4.000 unidades. Producción actual: 1.000 unidades. Pedido confirmado: 1.000 unidades. Las 3.000 adicionales son solo una posibilidad sin orden de compra. No hay costos de almacenaje incluidos en la hoja, por lo que el análisis no puede concluir rentabilidad neta completa de producir todo.

Carpeta de diferenciación: registro de lotes que conecta proveedor y producto; pruebas internas de consistencia; diseño de etiqueta; propuesta de servicio de reposición. Un competidor vende otra presentación con un precio menor. El comité no dispone de una certificación externa de sostenibilidad y no puede anunciarla como existente. Debe distinguir atributos comprobados de aspiraciones. Reducir costo medio es una ventaja potencial; ofrecer calidad consistente y evidencia de trazabilidad puede generar valor diferente del precio.

Ruta para decidir: calcular costo medio a ambas escalas; validar pedidos y financiación; comparar atributos verificables; aprobar una expansión gradual con indicadores. A 1.000 unidades el costo medio es 18 dólares; a 4.000 será menor, pero los ingresos de unidades no vendidas no existen. Tu recomendación debe expresar esa tensión y evitar sacrificar confianza comercial mediante afirmaciones no demostradas.`,
    references: [refs.itc, refs.pro],
    questions: [
      choice(
        "¿Qué recomendación utiliza correctamente la información?",
        [
          "Producir 4.000 y contabilizar como ingresos las unidades sin comprador.",
          "Subir la escala sin revisar financiación porque el costo medio baja.",
          "Validar demanda y financiación; aprovechar escala gradualmente y comunicar atributos comprobados.",
          "Anunciar certificación externa porque se planea obtenerla.",
        ],
        2,
        "Menor costo medio no prueba ventas ni rentabilidad final. La trazabilidad sí puede comunicarse si existe evidencia; una certificación inexistente no.",
      ),
      matching(
        "Relaciona cada evidencia con el mecanismo que muestra.",
        [
          ["Costo fijo repartido entre más unidades", "Economía de escala"],
          ["Presentación distinta con atributos relevantes", "Diferenciación"],
          ["Registro que conecta proveedor y lote", "Trazabilidad verificable"],
          [
            "3.000 unidades sin orden de compra",
            "Riesgo de demanda no confirmada",
          ],
        ],
        "Escala y diferenciación pueden aportar ventajas, pero necesitan capacidad y demanda efectivas.",
      ),
      ordering(
        "Ordena el proceso de aprobación de la expansión.",
        [
          "Calcular costo medio a las dos escalas",
          "Validar pedidos y financiación",
          "Comparar atributos verificables de la oferta",
          "Aprobar expansión gradual con indicadores",
        ],
        "La expansión se sustenta en cálculos y evidencia, no únicamente en el deseo de producir más.",
      ),
      numeric(
        "Calcula el costo medio si efectivamente se producen 4.000 unidades.",
        9,
        "USD por unidad",
        "(12.000 + 6 × 4.000) ÷ 4.000 = 36.000 ÷ 4.000 = USD 9. Es costo productivo medio, no beneficio.",
      ),
      crossword(
        "Completa los conceptos de la estrategia.",
        [
          [
            "ESCALA",
            "Tamaño productivo cuyo aumento puede repartir costos fijos.",
          ],
          [
            "CALIDAD",
            "Consistencia del producto respecto de características definidas.",
          ],
          [
            "DEMANDA",
            "Compras potenciales que deben validarse antes de expandir.",
          ],
        ],
        "La ventaja competitiva combina capacidades y valor para el cliente con viabilidad comercial.",
      ),
    ],
  },
  {
    week: 8,
    name: "Misión 08 · El pedido urgente y la responsabilidad",
    objective:
      "Tomar una decisión comercial que integre evidencia laboral, afirmaciones ambientales y compromisos con el comprador.",
    context: `SIMULACIÓN EDUCATIVA · Auditoría de un pedido urgente. La jornada, tarifas y documentos siguientes pertenecen a un reglamento ficticio del taller. No son una liquidación laboral válida para Ecuador ni sustituyen la normativa aplicable.

Un comprador ofrece adelantar el pago si Costa Cacao entrega antes de lo previsto. El supervisor propone extender la jornada y usar un sello «100 % sostenible» en las cajas para mejorar imagen. La responsable de cumplimiento pide revisar los efectos sobre personas, costos y confianza. Ética comercial no consiste solo en cumplir una fecha; también exige que una afirmación publicitaria sea sustentable y que los acuerdos laborales se respeten.

Registro A — plantilla: 42 personas; cada una trabajó 45 horas en la semana. Regla didáctica del taller: jornada ordinaria de 40 horas; tarifa ordinaria USD 4 por hora; cada hora adicional se remunera a 1,5 veces esa tarifa. Solo debes calcular el pago de las horas adicionales, no toda la nómina. El reloj de asistencia registra 5 horas extra por persona. La oficina de pagos había preparado USD 840 para esas horas, calculándolas al valor ordinario.

Registro B — materiales: el proveedor de envases declara «reciclable según infraestructura disponible», pero no adjunta certificado de contenido reciclado ni un análisis de ciclo de vida. Registro C — trazabilidad: se pueden identificar proveedores y lotes, aunque faltan dos comprobantes de recepción. Registro D — comprador: permite ajustar plazo si se comunica el problema antes del despacho. Estos documentos no sustentan prometer que todo el producto es «100 % sostenible».

Protocolo acordado: identificar brechas con evidencia; corregir pago y registros; negociar un plazo realista; comunicar atributos verificables y guardar respaldo. Una declaración propia, una certificación externa y una intención de mejora no son equivalentes. Transparencia implica reconocer lo que todavía falta, no esconderlo detrás de una etiqueta atractiva. Tu decisión debe considerar bienestar, coherencia documental y viabilidad del pedido. En una operación real, las obligaciones laborales y ambientales deben validarse con las autoridades y profesionales correspondientes.`,
    references: [refs.ilo, refs.itc],
    questions: [
      choice(
        "¿Qué comunicación al comprador se sustenta en el expediente?",
        [
          "Producto 100 % sostenible y certificado, sin excepciones.",
          "Podemos demostrar parte de la trazabilidad y estamos cerrando dos registros; proponemos ajustar el plazo antes del despacho.",
          "La intención de mejorar equivale a una certificación externa.",
          "No informar las brechas mientras el comprador no pregunte.",
        ],
        1,
        "La propuesta reconoce capacidades y límites reales del expediente y utiliza la posibilidad de renegociación.",
      ),
      matching(
        "Relaciona la evidencia con lo que permite afirmar.",
        [
          [
            "Reloj con 45 horas",
            "5 horas adicionales por persona bajo la regla ficticia",
          ],
          [
            "Declaración de reciclabilidad",
            "Atributo condicionado a infraestructura disponible",
          ],
          [
            "Dos recepciones sin comprobante",
            "Brecha de trazabilidad pendiente",
          ],
          [
            "Permiso de ajustar plazo",
            "Oportunidad de negociar antes del despacho",
          ],
        ],
        "Las afirmaciones deben conservar las condiciones y el alcance de cada prueba.",
      ),
      ordering(
        "Ordena el protocolo responsable antes de entregar.",
        [
          "Identificar brechas con evidencia",
          "Corregir pago y registros pendientes",
          "Negociar un plazo realista con el comprador",
          "Comunicar atributos verificables y conservar respaldo",
        ],
        "Corregir y transparentar los problemas protege a las personas y la confianza comercial.",
      ),
      numeric(
        "Según la regla ficticia, ¿cuánto corresponde pagar en total por las horas adicionales de las 42 personas?",
        1260,
        "USD",
        "42 × (45 − 40) × (4 × 1,5) = 42 × 5 × 6 = USD 1.260. No incluye salario ordinario ni es asesoría laboral.",
      ),
      crossword(
        "Resuelve el vocabulario de responsabilidad.",
        [
          [
            "ETICA",
            "Análisis de decisiones y deberes hacia las personas y el entorno.",
          ],
          [
            "EVIDENCIA",
            "Respaldo necesario para sostener una afirmación comercial.",
          ],
          ["RESPETO", "Trato debido a personas y compromisos en la operación."],
        ],
        "Una promesa atractiva pierde valor si no se respalda o se consigue incumpliendo compromisos.",
      ),
    ],
  },
  {
    week: 9,
    name: "Misión 09 · Una barra y su red internacional",
    objective:
      "Reconocer interdependencias globales y diferenciar tendencias internacionales de acciones concretas de una empresa.",
    context: `SIMULACIÓN EDUCATIVA · Mapa de una cadena de valor. Países, proveedores, costos y acuerdos de este caso son ficticios. El expediente sirve para representar interdependencias, no para describir la cadena real de un producto comercial.

Una barra fabricada por Costa Cacao utiliza cacao local, un envase importado y un diseño encargado a una profesional de otro país. Se vende mediante una tienda extranjera, que paga usando un servicio financiero internacional. La etiqueta «hecho en Ecuador» no implica que cada insumo, servicio o decisión se origine en el mismo territorio. Tu equipo debe dibujar la red y explicar qué actividades dependen de otras antes de recomendar una expansión.

Ficha de costo por barra, en USD: cacao y transformación local 50; envase comprado a proveedor extranjero 30; diseño y servicios contratados en el extranjero 10; gestión local 10. Total considerado: 100. Para la pregunta numérica cuenta solo el envase como mercancía importada; el diseño es un servicio y no debe sumarse a ese porcentaje. El proveedor de envases tarda 20 días y no tiene sustituto aprobado. La tienda extranjera quiere pedidos cada 15 días, por lo que el equipo debe planificar inventario o desarrollar alternativas.

Guía conceptual del taller: globalización describe el crecimiento de conexiones e interdependencias económicas y de otros ámbitos; mundialización suele utilizarse como término próximo, aunque su enfoque cambia entre autores. No se evalúa una separación rígida universal entre ambos. Internacionalización empresarial se refiere a decisiones concretas de operar, comprar, vender o establecer vínculos fuera del mercado doméstico. Una orden de compra de envases es una acción empresarial; la expansión general de cadenas y redes es una tendencia de mayor alcance.

Notas de riesgo: una interrupción del proveedor de envases puede impedir usar cacao disponible; un fallo de comunicación puede retrasar el diseño; una demora en pago puede tensionar caja. La ruta de preparación es mapear eslabones; identificar dependencias críticas; validar alternativas e inventario; negociar un calendario coherente. El objetivo no es rechazar toda conexión exterior, sino decidir con información y reconocer que una cadena internacional necesita coordinación.`,
    references: [refs.wto, refs.itc],
    questions: [
      choice(
        "¿Cuál distingue correctamente tendencia y decisión empresarial?",
        [
          "Comprar envases extranjeros es una acción de internacionalización; la extensión de redes es una tendencia de globalización.",
          "Globalización solo significa tener una cuenta de correo.",
          "Mundialización y globalización tienen una separación rígida aceptada por todos los autores.",
          "Fabricar localmente impide tener interdependencias internacionales.",
        ],
        0,
        "La compra exterior es una acción de la empresa dentro de conexiones más amplias. Los términos globalización y mundialización varían según el marco académico.",
      ),
      matching(
        "Ubica cada eslabón en el mapa.",
        [
          ["Cacao y transformación", "Actividad local de producción"],
          [
            "Envase del extranjero",
            "Mercancía importada y dependencia de proveedor",
          ],
          ["Diseño desde otro país", "Servicio contratado internacionalmente"],
          ["Tienda extranjera", "Canal comercial en el mercado de destino"],
        ],
        "Una cadena incluye bienes y servicios; ambos pueden conectar varios territorios.",
      ),
      ordering(
        "Organiza la preparación antes de aceptar entregas cada 15 días.",
        [
          "Mapear los eslabones de la cadena",
          "Identificar dependencias críticas y plazos",
          "Validar alternativas e inventario",
          "Negociar un calendario coherente",
        ],
        "El plazo del envase debe coordinarse con producción y entregas; no se resuelve ignorando la dependencia.",
      ),
      numeric(
        "¿Qué porcentaje del costo considerado corresponde exclusivamente al envase como mercancía importada?",
        30,
        "%",
        "30 ÷ 100 × 100 = 30 %. El servicio de diseño internacional no se cuenta como mercancía importada en esta pregunta.",
      ),
      crossword(
        "Completa los términos de la cadena.",
        [
          ["RED", "Conjunto de vínculos entre actores de varios territorios."],
          ["INSUMO", "Bien utilizado para producir o presentar otro producto."],
          [
            "SERVICIO",
            "Prestación como diseño que puede contratarse a través de fronteras.",
          ],
        ],
        "Mapear los vínculos permite identificar interdependencias y decisiones que la empresa puede gestionar.",
      ),
    ],
  },
  {
    week: 10,
    name: "Misión 10 · La consulta enviada a la institución equivocada",
    objective:
      "Asignar funciones a instituciones internacionales y nacionales y construir una consulta comercial bien fundamentada.",
    context: `SIMULACIÓN EDUCATIVA · Mesa de orientación comercial. Los correos y necesidades del expediente son inventados. Los nombres institucionales corresponden a entidades reales; sus enlaces son material de consulta complementario y no autorizaciones para este envío ficticio.

La asistente de Costa Cacao redactó un mensaje a la OMC: «Por favor, aprueben nuestra factura y reserven un barco». El coordinador explica que reunir instituciones en una lista no permite saber qué hace cada una. Tu equipo debe convertir cinco solicitudes confusas en consultas dirigidas al actor adecuado. Diferencia una organización que administra un marco de reglas entre sus miembros de una autoridad aduanera o un proveedor privado de transporte.

Carpeta de necesidades: A, entender el marco multilateral de comercio y las funciones de la OMC; B, obtener orientación de promoción exportadora y acceso a recursos sobre mercados; C, consultar procedimientos aduaneros ecuatorianos; D, encontrar formación y herramientas para pequeñas empresas que participan en comercio; E, entender la distribución de obligaciones bajo reglas Incoterms. Ninguna solicitud incluye una controversia estatal formal ni pide asesoría para un litigio específico.

Fichas institucionales: OMC es un foro de acuerdos y reglas comerciales entre miembros, con funciones de negociación, seguimiento y solución de diferencias dentro de su marco; no valida facturas privadas ni reserva transporte. PRO ECUADOR facilita promoción exportadora y recursos de internacionalización. SENAE es la autoridad aduanera ecuatoriana. El Centro de Comercio Internacional, ITC, ofrece asistencia y recursos vinculados al desarrollo comercial. La Cámara de Comercio Internacional, ICC, publica reglas Incoterms; no es una autoridad aduanera estatal. Una naviera o un operador logístico presta servicios de traslado, una función comercial distinta.

Protocolo de consulta: describir producto, origen y destino; separar la pregunta institucional de la operativa; ubicar una fuente oficial; verificar fecha y alcance antes de tomar una decisión. Si una página ofrece información general, eso no demuestra que se cumplió un requisito de un producto concreto. Una buena consulta necesita contexto suficiente, pero no debe enviar datos personales innecesarios ni confundir recomendaciones promocionales con permisos obligatorios.`,
    references: [refs.wto, refs.itc, refs.pro, refs.senae, refs.icc],
    questions: [
      choice(
        "¿Cómo debería corregirse el correo inicial a la OMC?",
        [
          "Pedir a la OMC que cambie la etiqueta y cobre el pedido.",
          "Separar funciones: consultar marco multilateral en OMC, procedimientos en SENAE y transporte con un proveedor logístico.",
          "Mandar la misma petición a todas las instituciones sin contexto.",
          "Suponer que orientación promocional equivale a despacho aduanero aprobado.",
        ],
        1,
        "La institución debe corresponder a la función requerida; la OMC no ejecuta tareas comerciales privadas ni valida esa factura.",
      ),
      matching(
        "Asigna cada entidad a su función.",
        [
          ["OMC", "Marco multilateral de acuerdos y reglas comerciales"],
          ["PRO ECUADOR", "Orientación y promoción exportadora"],
          ["SENAE", "Procedimientos y control aduanero ecuatoriano"],
          ["ITC", "Recursos y asistencia para desarrollo comercial"],
          ["ICC", "Publicación de reglas Incoterms"],
        ],
        "Funciones complementarias no significan autoridades intercambiables.",
      ),
      ordering(
        "Ordena el protocolo para hacer una consulta útil.",
        [
          "Describir producto, origen y destino",
          "Separar pregunta institucional de operativa",
          "Ubicar una fuente oficial competente",
          "Verificar fecha y alcance antes de decidir",
        ],
        "La información precisa permite identificar la autoridad y el material aplicables.",
      ),
      choice(
        "¿Qué demuestra una guía general encontrada en un sitio oficial?",
        [
          "Que el embarque privado ya fue autorizado.",
          "Que no es necesario revisar el producto o destino.",
          "Que existe orientación cuyo alcance y aplicabilidad deben verificarse.",
          "Que el vendedor puede omitir documentos.",
        ],
        2,
        "Un recurso general ayuda a orientarse, pero no reemplaza la verificación de requisitos concretos.",
      ),
      crossword(
        "Identifica tres siglas de la mesa institucional.",
        [
          [
            "OMC",
            "Organización que reúne reglas y acuerdos comerciales multilaterales.",
          ],
          ["ITC", "Sigla del Centro de Comercio Internacional."],
          ["ICC", "Sigla de la Cámara de Comercio Internacional."],
        ],
        "Las siglas se vuelven útiles cuando puedes asociarlas con funciones y límites.",
      ),
    ],
  },
  {
    week: 11,
    name: "Misión 11 · El margen que cambió antes de cobrar",
    objective:
      "Analizar riesgos cambiarios, logísticos y regulatorios mediante un expediente de escenarios, distinguiendo hechos y probabilidades.",
    context: `SIMULACIÓN EDUCATIVA · Reunión de riesgos de un cobro internacional. Tipos de cambio, probabilidades y costos son supuestos didácticos, no cotizaciones, pronósticos ni recomendaciones financieras reales.

Costa Cacao pactó cobrar EUR 5.000 después de entregar un lote. Sus costos se pagan en dólares. Al elaborar presupuesto se usó USD 1,10 por euro; antes del cobro el tipo hipotético es USD 1,05 por euro. Tu equipo debe explicar por qué la cantidad de euros no cambió, pero sí el ingreso convertido a dólares. Este riesgo es diferente de que un cliente no pague y de que el transporte se retrase. Separarlos permite elegir acciones de prevención pertinentes.

Escenario cambiario: con la tasa presupuestada, 5.000 × 1,10 = USD 5.500; con la tasa nueva, 5.000 × 1,05 = USD 5.250. La comparación supone conversión de la totalidad al mismo tipo, sin comisiones. El expediente no especifica un producto de cobertura ni autoriza contratarlo. Una alternativa de gestión es negociar moneda de facturación o planificar escenarios, verificando costos y condiciones.

Escenario logístico: una tabla del taller asigna 60 % de probabilidad a entrega sin gasto adicional; 25 % a retraso con gasto de USD 400; 15 % a retraso con gasto de USD 1.000. Las probabilidades suman 100 %. El costo adicional esperado es la suma de cada costo por su probabilidad, no el máximo gasto ni una certeza. Escenario regulatorio: el comprador comunica que estudia un cambio de etiquetado, pero todavía no hay norma publicada. Debe registrarse como señal por verificar en una fuente oficial, no como obligación confirmada.

Protocolo de decisión: identificar exposición; medir impacto; seleccionar respuesta viable; monitorear evidencia. Respuestas posibles incluyen diversificar proveedores, dejar holgura logística o negociar condiciones de cobro. El informe debe conservar el carácter condicional de los escenarios y comparar acciones con el riesgo que atienden. Un porcentaje sin fuente o una comunicación informal no puede convertirse silenciosamente en hecho.`,
    references: [refs.bce, refs.pro],
    questions: [
      choice(
        "¿Qué interpretación del cobro es correcta?",
        [
          "El ingreso en USD aumenta porque el euro pasa de 1,10 a 1,05.",
          "Se cobrarán menos euros automáticamente.",
          "Con EUR 5.000 constantes, el ingreso convertido cae USD 250, antes de comisiones.",
          "No existe riesgo cambiario en operaciones de Ecuador.",
        ],
        2,
        "USD 5.500 − USD 5.250 = USD 250 menos. Que Ecuador use dólares no elimina exposición cuando se cobra en otra moneda.",
      ),
      matching(
        "Relaciona cada señal con el riesgo pertinente.",
        [
          ["Tipo de cambio del cobro en euros", "Riesgo cambiario"],
          ["Demora del traslado con gasto adicional", "Riesgo logístico"],
          [
            "Cliente que no paga lo pactado",
            "Riesgo de crédito o incumplimiento",
          ],
          [
            "Posible cambio de etiqueta no publicado",
            "Señal regulatoria pendiente de verificación",
          ],
        ],
        "No todas las pérdidas posibles tienen la misma causa ni requieren la misma respuesta.",
      ),
      ordering(
        "Ordena el protocolo de gestión de riesgos.",
        [
          "Identificar la exposición",
          "Medir el impacto de los escenarios",
          "Seleccionar una respuesta viable",
          "Monitorear evidencia y actualizar escenarios",
        ],
        "Una respuesta concreta debe dirigirse a una exposición que se identificó y se pudo evaluar.",
      ),
      numeric(
        "¿Cuál es el costo logístico adicional esperado según la tabla didáctica?",
        250,
        "USD",
        "0,60×0 + 0,25×400 + 0,15×1.000 = 0 + 100 + 150 = USD 250. Es un promedio ponderado, no un gasto seguro.",
      ),
      crossword(
        "Completa los términos del análisis.",
        [
          ["RIESGO", "Posibilidad de un resultado adverso bajo incertidumbre."],
          ["CAMBIO", "En «tipo de …», relación entre monedas."],
          [
            "ESCENARIO",
            "Conjunto explícito de supuestos usado para evaluar consecuencias.",
          ],
        ],
        "Declarar supuestos evita presentar un ejercicio de escenarios como una predicción exacta.",
      ),
    ],
  },
  {
    week: 12,
    name: "Misión 12 · Un Incoterm no es un seguro contra todo",
    objective:
      "Elegir una ruta viable y distinguir gastos, riesgos y obligaciones básicas bajo reglas Incoterms.",
    context: `SIMULACIÓN EDUCATIVA · Mesa logística de un lote no perecedero. Precios, tiempos, puertos y contrato son supuestos del taller. Las explicaciones se refieren a reglas Incoterms® 2020 y no reemplazan asesoría contractual ni requisitos reales.

Costa Cacao despachará un lote con valor base FOB hipotético de USD 24.000. La mercancía tolera 60 días de tránsito y gestión. El comprador necesita entrega dentro de 35 días. Ruta marítima del ejercicio: 25 días de transporte más 5 días de gestión; costo de flete USD 1.500 y seguro USD 120. Ruta aérea: 3 días más 5 de gestión; costo de flete USD 10.800. El presupuesto de flete admite hasta USD 4.500. No se añaden a estos datos otros cargos. Los números sirven para comparar rutas bajo los supuestos, no para reservar transporte.

Guía contractual: las reglas Incoterms distribuyen ciertas obligaciones, costos y riesgo entre comprador y vendedor; no resuelven por sí solas propiedad, forma de pago ni todos los incumplimientos. FOB y CIF se utilizan para transporte marítimo o por vías navegables interiores. En FOB el vendedor entrega cuando la mercancía está a bordo del buque designado en el puerto de embarque y allí se transfiere riesgo. En CIF también se transfiere riesgo a bordo en origen, aunque el vendedor contrata y paga flete y seguro hasta destino conforme a la regla.

Para mercancía en contenedor entregada a un transportista antes de subir al buque, FCA puede describir mejor el punto de entrega. DAP implica entrega a disposición del comprador en el lugar convenido, lista para descargar; el despacho de importación corresponde al comprador. El lugar designado y la versión deben expresarse en contrato. No es correcto decir «CIF mantiene todo riesgo en el vendedor hasta destino» solo porque paga el flete.

Secuencia de diseño: comprobar plazo y presupuesto; elegir modalidad; acordar punto y obligaciones; verificar documentos y contrato. En la cotización simplificada del ejercicio, pasar de la base FOB a CIF añade flete y seguro indicados. Tu propuesta debe explicar tanto viabilidad de ruta como transferencia de riesgo.`,
    references: [refs.icc, refs.senae],
    questions: [
      choice(
        "¿Qué propuesta cumple los supuestos sin interpretar mal CIF?",
        [
          "Usar vía aérea porque cabe en USD 4.500.",
          "La vía marítima tarda 30 días y cabe en presupuesto; bajo CIF el riesgo se transfiere a bordo en origen.",
          "CIF implica que el vendedor asume siempre el riesgo hasta la bodega final.",
          "FOB puede aplicarse indistintamente a cualquier viaje aéreo.",
        ],
        1,
        "25 + 5 = 30 días; el flete USD 1.500 cabe en USD 4.500. En CIF pagar transporte hasta destino no desplaza la transferencia de riesgo a destino.",
      ),
      matching(
        "Relaciona cada regla o concepto con su descripción básica.",
        [
          ["FOB", "Entrega a bordo en origen en transporte marítimo o fluvial"],
          ["CIF", "Riesgo a bordo en origen; vendedor contrata flete y seguro"],
          ["FCA", "Entrega al transportista en el lugar convenido"],
          [
            "DAP",
            "Entrega lista para descargar; comprador gestiona importación",
          ],
        ],
        "Los detalles del lugar de entrega y la versión acordada son esenciales; costos y riesgo no son lo mismo.",
      ),
      ordering(
        "Ordena el diseño logístico del expediente.",
        [
          "Comprobar plazo y presupuesto",
          "Elegir modalidad y ruta viable",
          "Acordar punto de entrega y obligaciones",
          "Verificar documentos y contrato",
        ],
        "La regla debe describir la operación elegida y el punto real de entrega.",
      ),
      numeric(
        "En la cotización simplificada, ¿cuál es el valor CIF al añadir los únicos flete y seguro indicados a USD 24.000?",
        25620,
        "USD",
        "24.000 + 1.500 + 120 = USD 25.620. Es una cotización didáctica con los costos expresamente incluidos.",
      ),
      crossword(
        "Resuelve los términos logísticos.",
        [
          ["FLETE", "Precio del transporte de la mercancía."],
          [
            "RIESGO",
            "Posibilidad de pérdida o daño cuya distribución se acuerda.",
          ],
          ["SEGURO", "Cobertura contratada bajo condiciones y límites."],
        ],
        "Que una parte pague flete o seguro no significa que conserve el riesgo durante todo el viaje.",
      ),
    ],
  },
  {
    week: 13,
    name: "Misión 13 · La ficha normativa antes de cotizar",
    objective:
      "Diferenciar política comercial, control aduanero y controles sectoriales, y calcular un arancel puramente didáctico.",
    context: `SIMULACIÓN EDUCATIVA · Expediente de revisión normativa. El gravamen, el listado documental y el destino de este taller son ficticios. No son tarifas vigentes ni una guía legal para importar o exportar un producto real.

Costa Cacao consulta una captura antigua que afirma: «todo chocolate paga 8 %». La analista propone dejar de usarla como regla universal. El tratamiento depende, entre otros aspectos, de clasificación, régimen, origen, destino, normativa y fecha. La política comercial fija orientaciones e instrumentos; la autoridad aduanera aplica procedimientos y controles dentro de su competencia; otras entidades pueden intervenir según el producto. Tu misión consiste en preparar una ficha con fuentes, responsables y límites antes de fijar un precio final.

Listado didáctico del comprador: factura coherente, lista de empaque y evidencia de origen cuando se solicite en el contrato del taller. Este listado no reemplaza requisitos oficiales. Fichas institucionales: SENAE atiende procedimientos y control aduanero; PRO ECUADOR proporciona orientación de promoción exportadora; Agrocalidad ejerce competencias fito y zoosanitarias. Los alimentos procesados y otros bienes regulados pueden exigir revisión de autoridades sanitarias competentes según producto y jurisdicción. No se debe pedir el mismo certificado para todas las mercancías por suponer que cualquier alimento está sujeto a idéntico control.

Hoja de cálculo ficticia: base aduanera acordada para la pregunta USD 10.000; arancel ad valorem didáctico 8 %; se excluyen de este cálculo IVA, tasas y otros tributos. «Ad valorem» significa calculado como porcentaje del valor de la base definida. Esta hoja no determina la base real de una operación ni afirma que el chocolate tenga esa tasa. Tampoco una preferencia por origen se aplica solo porque el vendedor la mencione: debe verificarse elegibilidad y respaldo.

Ruta de validación: identificar producto y características; comprobar clasificación y régimen con fuentes oficiales; verificar medidas, origen y vigencia; documentar condiciones en la cotización. Tu informe debe marcar cada dato como confirmado, supuesto o pendiente. La fecha de una captura y la presencia de un logotipo no aseguran vigencia. Guardar un enlace y su alcance ayuda a justificar la decisión sin prometer un permiso inexistente.`,
    references: [refs.senae, refs.pro, refs.agro],
    questions: [
      choice(
        "¿Qué tratamiento merece la captura «todo chocolate paga 8 %»?",
        [
          "Aplicarla a cualquier producto y país porque incluye un porcentaje.",
          "Usarla como regla oficial permanente.",
          "Verificar clasificación, régimen, origen, destino y vigencia; el 8 % del taller es solo un supuesto.",
          "Ignorar todos los tributos porque se trata de una exportación.",
        ],
        2,
        "Un porcentaje aislado no prueba el tratamiento aplicable; el ejercicio distingue su cálculo ficticio de la verificación normativa real.",
      ),
      matching(
        "Relaciona cada función con el actor o instrumento adecuado.",
        [
          [
            "SENAE",
            "Procedimientos y control aduanero dentro de su competencia",
          ],
          ["PRO ECUADOR", "Orientación de promoción exportadora"],
          ["Agrocalidad", "Competencias fito y zoosanitarias según producto"],
          [
            "Arancel ad valorem",
            "Porcentaje aplicado a una base de valor definida",
          ],
        ],
        "Control, orientación y cálculo tributario son funciones distintas.",
      ),
      ordering(
        "Ordena la validación antes de fijar condiciones definitivas.",
        [
          "Identificar producto y características",
          "Comprobar clasificación y régimen",
          "Verificar medidas, origen y vigencia",
          "Documentar condiciones y pendientes en la cotización",
        ],
        "Una norma solo puede evaluarse correctamente cuando se identifica la mercancía y la operación.",
      ),
      numeric(
        "Calcula únicamente el arancel didáctico del 8 % sobre la base ficticia de USD 10.000.",
        800,
        "USD",
        "10.000 × 0,08 = USD 800. Se excluyen otros tributos y no es una tasa real del producto.",
      ),
      crossword(
        "Completa los términos normativos.",
        [
          ["NORMA", "Disposición cuya vigencia y alcance deben comprobarse."],
          [
            "ARANCEL",
            "Gravamen asociado a mercancías bajo condiciones aplicables.",
          ],
          [
            "REGIMEN",
            "Tratamiento aduanero bajo el cual se presenta una operación.",
          ],
        ],
        "La ficha normativa convierte una intuición en requisitos y supuestos trazables.",
      ),
    ],
  },
  {
    week: 14,
    name: "Misión 14 · El intercambio que también necesita documentos",
    objective:
      "Analizar exportación, importación e intercambio compensado y reconciliar un acuerdo con componente de pago monetario.",
    context: `SIMULACIÓN EDUCATIVA · Negociación de mercancía por maquinaria. Partes, valores y condiciones fueron inventados. No se presentan como un contrato real ni como exención de obligaciones comerciales, fiscales o aduaneras.

Costa Cacao quiere adquirir una máquina de empaque de un fabricante de Nordia. Este acepta recibir cacao como parte del pago. El gerente cree que, al intercambiar bienes, «ya no hay importación, exportación ni documentación». Tu equipo debe demostrar por qué la forma de pago no elimina los movimientos transfronterizos ni la necesidad de valorar las prestaciones. Hay una operación de salida del cacao y otra de entrada de la máquina, aunque estén vinculadas por el mismo acuerdo.

Propuesta del taller: Costa Cacao entrega 1.500 kilogramos de cacao valorados contractualmente a USD 8 por kilogramo; el fabricante entrega una máquina valorada a USD 15.000. La diferencia se pagará en dólares. Para esta conciliación no se incorporan transporte, seguros, tributos ni comisiones; se registran como pendientes de negociación y pueden afectar el costo real final. Valorar la mercancía en el contrato permite calcular el componente monetario sin asumir que ambos bienes tienen el mismo valor.

Carpeta documental: descripción y valor de cada prestación; identificación de las partes; documentos de salida y entrada pertinentes; pruebas de entrega; comprobante del pago complementario. El acuerdo debe establecer calidad, lugar, plazo, responsabilidades, cómo se resolverían discrepancias y qué ocurre si solo una parte entrega. «Intercambio compensado» abarca acuerdos que vinculan prestaciones o compras y no significa automáticamente ausencia total de dinero. En este ejemplo existe una compensación parcial con saldo monetario.

Memo de riesgos: la máquina puede llegar después de que salga el cacao; el precio asignado puede diferir de otras ofertas; la garantía debe revisarse; las normas aplicables no desaparecen porque se llame trueque. Ruta de trabajo: valorar las dos prestaciones; calcular diferencia; acordar obligaciones y documentos; ejecutar y conciliar ambas entregas. La recomendación debe separar el valor compensado del dinero que falta y no confundir una menor necesidad de efectivo con una operación gratis.`,
    references: [refs.senae, refs.itc],
    questions: [
      choice(
        "¿Cuál describe el acuerdo sin ocultar obligaciones?",
        [
          "No hay comercio exterior porque parte del pago es cacao.",
          "Se vinculan una exportación y una importación; la compensación parcial no elimina documentación y deja un saldo en dinero.",
          "Ambos valores deben igualarse aunque cambien cantidades.",
          "El trueque elimina automáticamente tributos y garantías.",
        ],
        1,
        "La forma de pago no borra movimientos, valoración ni obligaciones aplicables; aquí USD 12.000 de cacao cubren parte de una máquina de USD 15.000.",
      ),
      matching(
        "Relaciona cada elemento con su papel en el acuerdo.",
        [
          ["Cacao que sale de Ecuador", "Prestación exportada de Costa Cacao"],
          [
            "Máquina que entra a Ecuador",
            "Prestación importada por Costa Cacao",
          ],
          [
            "Valor de cacao de USD 12.000",
            "Parte compensada del precio de la máquina",
          ],
          ["Diferencia en dólares", "Pago monetario complementario"],
        ],
        "Las dos prestaciones deben poder identificarse y conciliarse por separado.",
      ),
      ordering(
        "Ordena la preparación y cierre del intercambio.",
        [
          "Valorar las dos prestaciones",
          "Calcular el saldo monetario",
          "Acordar obligaciones y documentos",
          "Ejecutar y conciliar ambas entregas",
        ],
        "Conocer cantidades y valores permite negociar responsabilidades y verificar el cierre.",
      ),
      numeric(
        "¿Qué saldo monetario debe pagar Costa Cacao bajo los valores del taller?",
        3000,
        "USD",
        "Cacao: 1.500 × 8 = USD 12.000. Máquina: USD 15.000. Diferencia: 15.000 − 12.000 = USD 3.000.",
      ),
      crossword(
        "Completa el vocabulario del intercambio.",
        [
          ["SALDO", "Diferencia pendiente después de compensar prestaciones."],
          [
            "GARANTIA",
            "Compromiso cuyo alcance debe revisarse al comprar la máquina.",
          ],
          ["VALOR", "Magnitud monetaria asignada a cada prestación."],
        ],
        "La compensación exige valoración, condiciones verificables y conciliación, aunque reduzca pagos en dinero.",
      ),
    ],
  },
  {
    week: 15,
    name: "Misión 15 · La balanza que no termina en mercancías",
    objective:
      "Interpretar una cuenta corriente simplificada y distinguir bienes, servicios, renta y transferencias de financiación.",
    context: `SIMULACIÓN EDUCATIVA · Laboratorio de balanza de pagos. Las cifras siguientes se expresan en millones de USD y pertenecen a una economía ficticia. NO son datos del Ecuador. Para analizar Ecuador deben utilizarse estadísticas y notas metodológicas del Banco Central.

Una presentadora dice: «Las importaciones superan exportaciones, así que toda la balanza de pagos tiene ese mismo déficit». Tu equipo debe revisar la afirmación. La balanza de pagos registra transacciones entre residentes y no residentes durante un período. La cuenta corriente incluye bienes, servicios, ingreso primario e ingreso secundario. Una exportación de bienes no es una remesa; un préstamo externo no se convierte en ingreso corriente por entrar dinero a una cuenta bancaria.

Tabla del trimestre ficticio: bienes, créditos por exportaciones 800 y débitos por importaciones 950; servicios, créditos 180 y débitos 110; ingreso primario, créditos 30 y débitos 50; ingreso secundario, créditos 90 y débitos 10. En este laboratorio, saldo de cada componente = créditos − débitos. El ingreso primario puede incluir remuneraciones e ingresos de inversión; las transferencias personales se registran en ingreso secundario según su naturaleza. No se clasifica una transacción solo por la forma bancaria del pago.

Cuenta de capital simplificada: saldo positivo de 5. Para la discusión de financiación se supone ausencia de errores y omisiones. La cuenta corriente sumada a capital indica capacidad o necesidad de financiación. Un resultado de −15 señala necesidad de financiación neta por 15 bajo estos supuestos. Si se muestra la cuenta financiera con la convención «adquisición neta de activos menos pasivos», el saldo sería −15, no +15. Este ejercicio evita mezclar convenciones de signo y no desglosa activos, pasivos o reservas.

Ruta de resolución: clasificar transacciones; calcular cada saldo; sumar cuenta corriente; incorporar capital e interpretar la financiación. Un déficit corriente no equivale por sí solo a insolvencia ni un superávit prueba bienestar para todos. El informe debe mencionar cobertura, unidades, supuestos y límites antes de formular conclusiones de política.`,
    references: [refs.bce],
    questions: [
      choice(
        "¿Dónde se clasifica un nuevo préstamo recibido de un acreedor no residente?",
        [
          "Exportación de servicios porque entra dinero.",
          "Ingreso secundario como toda transferencia bancaria.",
          "Cuenta financiera como aumento de un pasivo, según el registro correspondiente.",
          "Exportación de bienes aunque no haya mercancía.",
        ],
        2,
        "Un préstamo genera una obligación financiera; no se convierte en ingreso corriente por su canal de pago.",
      ),
      matching(
        "Relaciona cada transacción con el componente apropiado.",
        [
          [
            "Venta de mercancía a no residente",
            "Bienes de la cuenta corriente",
          ],
          [
            "Servicio prestado a no residente",
            "Servicios de la cuenta corriente",
          ],
          ["Renta de inversión", "Ingreso primario"],
          ["Transferencia personal sin contraprestación", "Ingreso secundario"],
        ],
        "La naturaleza económica define la clasificación; movimiento bancario no significa categoría única.",
      ),
      ordering(
        "Ordena la resolución de la tabla.",
        [
          "Clasificar las transacciones",
          "Calcular créditos menos débitos por componente",
          "Sumar los cuatro saldos de cuenta corriente",
          "Incorporar capital e interpretar financiación",
        ],
        "Primero se obtiene corriente y después se analiza su relación con capital y financiación.",
      ),
      numeric(
        "¿Cuál es el saldo total de la cuenta corriente ficticia?",
        -20,
        "millones de USD",
        "Bienes −150; servicios +70; primario −20; secundario +80. Suma: −150 + 70 − 20 + 80 = −20.",
      ),
      crossword(
        "Completa los términos de la balanza.",
        [
          [
            "CORRIENTE",
            "Cuenta que reúne bienes, servicios e ingresos primario y secundario.",
          ],
          [
            "REMESA",
            "Envío personal que puede formar parte del ingreso secundario según su naturaleza.",
          ],
          ["PASIVO", "Obligación financiera, como un préstamo recibido."],
        ],
        "Interpretar una balanza exige comprender naturaleza y signos de las transacciones, no solo cuánto dinero entra.",
      ),
    ],
  },
  {
    week: 16,
    name: "Misión final · Defender un dossier de internacionalización",
    objective:
      "Integrar decisiones comerciales, documentación, riesgo y lectura de balanza de pagos en un examen basado en evidencia.",
    context: `SIMULACIÓN EDUCATIVA · Examen final integrador. Empresa, valores, destinos y transacciones son ficticios. Este dossier reúne aprendizajes de las 16 semanas; ninguna cifra se presenta como dato oficial ecuatoriano.

El comité docente recibe una propuesta de Costa Cacao. Debes revisarla como analista: detectar supuestos incorrectos, justificar una decisión y calcular resultados con las unidades pertinentes. La propuesta mantiene un producto de 500 cajas, cada una con 10 barras de 100 gramos. El peso neto total es 500 kilogramos; no se aporta peso bruto. La cotización FOB hipotética es USD 12.500. Costos considerados: producción USD 7.000, traslado y preparación hasta el punto FOB USD 900, documentación USD 300. No hay impuestos, intereses ni otros gastos incluidos en el margen del taller.

Anexo logístico: si se pactara CIF en la misma operación marítima del ejercicio, se añadirían flete USD 1.000 y seguro USD 100 tanto al precio acordado como a los costos asumidos por el vendedor. En FOB y CIF, el riesgo se transfiere a bordo en origen bajo las reglas básicas descritas; pagar más transporte no equivale a conservar riesgo hasta destino. Para contenedores entregados antes de embarcar se debe revisar si FCA expresa mejor el punto real de entrega. Debe precisarse lugar y versión de la regla.

Anexo de integridad: hay trazabilidad de todos los lotes, pero no certificación externa de sostenibilidad. Se puede comunicar lo primero con respaldo; no anunciar lo segundo. Anexo macroeconómico, en millones de USD: bienes, exportaciones 12,5 e importaciones 8; servicios, exportaciones 1 e importaciones 2; ingreso primario y secundario, saldo cero en este esquema. La cuenta corriente resulta 3,5. Estos flujos agregados no son la contabilidad de beneficio de la empresa.

Ruta de defensa: validar cantidades y fuentes; comprobar documentos y condiciones; calcular margen; presentar decisión con límites y seguimiento. El margen solicitado es ingreso FOB menos los únicos costos indicados: no es utilidad neta real ni saldo de balanza de pagos. Tu respuesta debe reconocer datos faltantes sin rellenarlos con cifras inventadas.`,
    references: [refs.bce, refs.icc, refs.senae],
    questions: [
      choice(
        "¿Qué observación mejora el dossier sin inventar datos?",
        [
          "Anunciar sostenibilidad certificada porque existe trazabilidad.",
          "Afirmar peso bruto de 500 kg porque es el peso neto.",
          "Verificar peso bruto y punto de entrega; comunicar trazabilidad respaldada sin anunciar una certificación inexistente.",
          "Confundir el margen empresarial con el saldo corriente de 3,5 millones.",
        ],
        2,
        "Peso neto no determina bruto; trazabilidad no equivale a certificación. La cuenta corriente agregada y el margen de una empresa son medidas diferentes.",
      ),
      matching(
        "Relaciona cada resultado con su significado.",
        [
          ["500 kilogramos", "Peso neto de 500 cajas × 10 barras × 100 gramos"],
          ["USD 8.200", "Costos FOB considerados: 7.000 + 900 + 300"],
          ["USD 13.600", "Precio CIF didáctico: 12.500 + 1.000 + 100"],
          ["3,5 millones de USD", "Saldo corriente del anexo macroeconómico"],
        ],
        "Mantener las unidades evita mezclar producción, costos, precios y estadísticas de una economía.",
      ),
      ordering(
        "Ordena la defensa final de la propuesta.",
        [
          "Validar cantidades y fuentes del expediente",
          "Comprobar documentos y condiciones de entrega",
          "Calcular el margen con los costos indicados",
          "Presentar decisión, límites y seguimiento",
        ],
        "El dossier debe permitir reproducir la conclusión y saber qué queda pendiente.",
      ),
      numeric(
        "¿Cuál es el margen de la cotización FOB, considerando solo los costos indicados?",
        4300,
        "USD",
        "12.500 − (7.000 + 900 + 300) = 12.500 − 8.200 = USD 4.300. No es utilidad neta real; faltan otras partidas.",
      ),
      crossword(
        "Completa las claves del dossier final.",
        [
          [
            "DOSSIER",
            "Carpeta estructurada de evidencia y propuesta comercial.",
          ],
          [
            "MARGEN",
            "Diferencia entre ingreso y los costos definidos para el cálculo.",
          ],
          [
            "ORIGEN",
            "Dato que se verifica bajo reglas aplicables, no solo por el puerto de salida.",
          ],
        ],
        "La integración final exige argumentos y evidencia, además de memorizar términos.",
      ),
    ],
  },
];

activities.forEach((activity) => {
  activity.label =
    "Simulación educativa · expediente ficticio con evidencia suficiente";
  activity.references.unshift({
    name: "Sílabo CEX-103-AC · ULEAM · 2026-2",
    url: "./documents/comercio-silabo.pdf",
  });
  activity.questions.forEach((question, index) => {
    question.id = `cex-w${activity.week}-q${index + 1}`;
  });
});

export const commerceCourse = {
  id: "cex-103",
  code: "CEX-103-AC",
  name: "Comercio Exterior",
  teacher: "ANDRADE ALVARADO SONIA PATRICIA",
  career: "COMERCIO EXTERIOR - 2026 NS - MATRIZ",
  level: "1",
  parallel: "C",
  period: "2026-2 PERIODO ORDINARIO",
  description:
    "Del primer expediente comercial a la defensa de una propuesta internacional: casos, documentos y decisiones con evidencia.",
  source: "Sílabo CEX-103-AC · PAA-03-F-003 · generado 1/9/2026",
  syllabusSource: "./documents/comercio-silabo.pdf",
  sourceNotes:
    "El PDF coloca S.9 después de S.12 en su tabla; aquí se respeta la numeración explícita. S.15 y S.16 comparten el tema 4.4; se conserva y se agrega EXAMEN FINAL en S.16, como indica el sílabo.",
  weeks: topics.map((title, index) => ({
    weekNumber: index + 1,
    unit: unitNames[Math.floor(index / 4)],
    title,
    enterpriseCase: activities[index].name,
    activity: activities[index],
  })),
  activities,
};
