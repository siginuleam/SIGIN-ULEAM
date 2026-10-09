import { syllabus } from "./syllabus.js";

// Prácticas didácticas originales: conceptos y casos ficticios alineados al sílabo.
const activities = [
  {
    "week": 1,
    "name": "ALFIN y AMI: de recibir mensajes a construir conocimiento",
    "objective": "Distinguir datos, información y conocimiento, y reconocer competencias ALFIN/AMI.",
    "label": "Simulación educativa · práctica",
    "context": "Conceptos clave\nLa alfabetización informacional (ALFIN) permite reconocer una necesidad, buscar información, evaluarla y usarla de forma ética. La alfabetización mediática e informacional (AMI) añade el análisis de cómo los medios producen y representan mensajes, sus intereses y la participación responsable. Un dato es un registro; la información integra registros con contexto; el conocimiento surge al interpretar y aplicar información con criterio. La sociedad del conocimiento exige estas capacidades, no solamente acceso a tecnología.\n\nCaso breve\nUn equipo universitario analiza una campaña ficticia de una tienda. Recibe comentarios de consumidores, una noticia y un anuncio que presenta una opinión como si fuera una comprobación. Debe explicar qué sabe, qué falta por verificar y cómo se construyó el mensaje. Tener capturas no basta: necesitan origen, contexto y criterios. La tienda es una simulación y no representa prácticas de una empresa real.\n\nQué debes hacer\nDistingue los niveles de significado, identifica la necesidad y examina propósito, evidencia y circulación. El producto será una explicación propia que cite sus fuentes y conserve incertidumbres; copiar el anuncio no demuestra aprendizaje.",
    "questions": [
      {
        "type": "choice",
        "prompt": "El equipo necesita decidir qué conoce de la campaña. ¿Qué acción aplica ALFIN?",
        "options": [
          "Identificar el medio de cada mensaje y considerar comprobada toda información con autor.",
          "Delimitar la necesidad y evaluar origen, contexto y evidencia antes de interpretar.",
          "Reunir materiales relacionados y definir la necesidad al concluir la redacción."
        ],
        "correct": 1,
        "explanation": "ALFIN integra necesidad, búsqueda, evaluación y uso ético; disponer de archivos no completa el proceso."
      },
      {
        "type": "choice",
        "prompt": "La campaña mezcla opinión y comprobación. ¿Qué revisión aporta AMI además de localizar fuentes?",
        "options": [
          "Comprobar referencias sin examinar cómo se construye y recibe la representación.",
          "Elegir el canal más difundido como indicador de que la representación es completa.",
          "Examinar quién produce el mensaje, sus intereses y la representación de consumidores."
        ],
        "correct": 2,
        "explanation": "AMI examina producción, representación y propósito, además de la información que transmite el mensaje."
      },
      {
        "type": "matching",
        "prompt": "Relaciona concepto y significado.",
        "pairs": [
          {
            "left": "Dato",
            "right": "Registro que necesita contexto"
          },
          {
            "left": "Información",
            "right": "Registros interpretables con contexto"
          },
          {
            "left": "Conocimiento",
            "right": "Interpretación aplicada con criterio"
          },
          {
            "left": "AMI",
            "right": "Análisis de medios y participación responsable"
          }
        ],
        "explanation": "Los niveles no equivalen a cantidad de archivos; dependen del contexto y de la interpretación."
      },
      {
        "type": "ordering",
        "prompt": "Ordena una indagación informacional responsable.",
        "items": [
          "Reconocer la necesidad de información",
          "Buscar fuentes pertinentes",
          "Evaluar evidencia y propósito",
          "Elaborar una interpretación propia y citar",
          "Comunicar límites y revisar lo aprendido"
        ],
        "explanation": "La necesidad orienta la búsqueda; la evaluación precede a la interpretación comunicada."
      },
      {
        "type": "crossword",
        "prompt": "Completa conceptos del aprendizaje informacional.",
        "entries": [
          {
            "word": "DATO",
            "clue": "Registro que todavía requiere contexto."
          },
          {
            "word": "CONTEXTO",
            "clue": "Circunstancias que permiten interpretar un mensaje."
          },
          {
            "word": "CRITERIO",
            "clue": "Base explícita para evaluar y justificar una elección."
          }
        ],
        "explanation": "ALFIN exige pasar de registros aislados a interpretaciones justificadas."
      }
    ],
    "references": [
      {
        "name": "Framework for Information Literacy for Higher Education",
        "title": "Framework for Information Literacy for Higher Education",
        "author": "Association of College and Research Libraries (ACRL)",
        "url": "https://www.ala.org/acrl/standards/ilframework",
        "section": "Introducción; Research as Inquiry",
        "purpose": "Reconocer ALFIN como indagación, uso reflexivo y participación en la creación de conocimiento."
      },
      {
        "name": "Media and information literacy curriculum for teachers",
        "title": "Media and information literacy curriculum for teachers",
        "author": "UNESCO",
        "url": "https://unesdoc.unesco.org/ark:/48223/pf0000192971",
        "section": "Módulo sobre currículo y marco de competencias AMI",
        "purpose": "Relacionar acceso, evaluación, producción de mensajes y participación responsable."
      }
    ]
  },
  {
    "week": 2,
    "name": "Una solicitud vaga se convierte en necesidad informacional",
    "objective": "Diferenciar necesidad, demanda y comportamiento informacional.",
    "label": "Simulación educativa · práctica",
    "context": "Conceptos clave\nLa necesidad informacional es una brecha entre lo que se sabe y lo que hace falta comprender para actuar. La demanda es la solicitud expresada, que puede ser vaga. El comportamiento informacional reúne acciones de búsqueda, selección, consulta y uso, influidas por propósito, experiencia y contexto. Entrevistar al usuario ayuda a precisar audiencia, decisión, alcance y producto esperado. La indagación es iterativa: una pregunta puede cambiar al descubrir nuevos conceptos.\n\nCaso breve\nLa coordinadora de una biblioteca universitaria ficticia pide «información sobre estudiantes». El equipo no sabe si quiere mejorar orientación, evaluar acceso a fuentes o preparar un taller. Un estudiante propone descargar todo lo disponible; otra propone preguntar qué decisión debe apoyar el informe. No se necesitan datos personales para entender el problema.\n\nQué debes hacer\nTransforma la solicitud en un requerimiento verificable. Distingue expresar una petición de identificar su necesidad real. Selecciona fuentes por su pertinencia al propósito, registra vacíos y reformula cuando el conocimiento disponible no responda a la pregunta. Justifica cada paso en vez de recopilar archivos por costumbre.",
    "questions": [
      {
        "type": "choice",
        "prompt": "La coordinadora solicita «información sobre estudiantes». ¿Qué aclaración organiza el requerimiento?",
        "options": [
          "La fuente disponible más completa, fijando el propósito según sus campos.",
          "El producto que el equipo suele entregar, manteniendo el alcance de trabajos anteriores.",
          "La decisión que debe apoyar y la audiencia que utilizará el informe."
        ],
        "correct": 2,
        "explanation": "La decisión y audiencia permiten interpretar la demanda y delimitar la necesidad."
      },
      {
        "type": "choice",
        "prompt": "Un concepto nuevo cambia la comprensión del problema. ¿Cómo responde una indagación iterativa?",
        "options": [
          "Reformular y documentar la razón del cambio para conservar el propósito.",
          "Conservar la primera pregunta para que la estrategia nunca varíe.",
          "Cambiar al tema del documento más reciente aunque no responda al usuario."
        ],
        "correct": 0,
        "explanation": "Research as Inquiry reconoce preguntas que evolucionan; el cambio debe tener una razón documentada."
      },
      {
        "type": "matching",
        "prompt": "Relaciona término y descripción.",
        "pairs": [
          {
            "left": "Necesidad",
            "right": "Brecha de conocimiento relevante para actuar"
          },
          {
            "left": "Demanda",
            "right": "Solicitud expresada por el usuario"
          },
          {
            "left": "Comportamiento informacional",
            "right": "Acciones y hábitos de búsqueda y uso"
          },
          {
            "left": "Requerimiento",
            "right": "Descripción delimitada de lo que debe obtenerse"
          }
        ],
        "explanation": "Una demanda no describe automáticamente la necesidad; hay que investigar el contexto."
      },
      {
        "type": "ordering",
        "prompt": "Ordena la aclaración de una necesidad.",
        "items": [
          "Escuchar la solicitud inicial",
          "Identificar propósito y audiencia",
          "Delimitar tema, alcance y producto",
          "Seleccionar fuentes pertinentes",
          "Revisar vacíos y ajustar el requerimiento"
        ],
        "explanation": "La búsqueda se orienta por el propósito y se reajusta al evaluar lo encontrado."
      },
      {
        "type": "crossword",
        "prompt": "Completa términos de una entrevista informacional.",
        "entries": [
          {
            "word": "NECESIDAD",
            "clue": "Brecha de conocimiento que origina la indagación."
          },
          {
            "word": "DEMANDA",
            "clue": "Petición que el usuario expresa."
          },
          {
            "word": "ALCANCE",
            "clue": "Límites del tema y del uso previsto."
          }
        ],
        "explanation": "La entrevista distingue necesidad de demanda y acuerda límites útiles."
      }
    ],
    "references": [
      {
        "name": "Framework for Information Literacy for Higher Education",
        "title": "Framework for Information Literacy for Higher Education",
        "author": "ACRL",
        "url": "https://www.ala.org/acrl/standards/ilframework",
        "section": "Research as Inquiry: Knowledge Practices",
        "purpose": "Practicar preguntas que evolucionan, delimitar alcance e identificar lagunas de conocimiento."
      }
    ]
  },
  {
    "week": 3,
    "name": "Modelos ALFIN: elegir el aporte de cada marco",
    "objective": "Distinguir Big6, SCONUL, ACRL y UNESCO-AMI sin tratarlos como equivalentes.",
    "label": "Simulación educativa · práctica",
    "context": "Conceptos clave\nBig6, desarrollado por Michael B. Eisenberg y Robert E. Berkowitz, propone definir la tarea, plantear estrategias, localizar y acceder, usar información, sintetizar y evaluar. SCONUL describe siete pilares: identificar, delimitar, planificar, recopilar, evaluar, gestionar y presentar; desarrollan capacidades que pueden revisitarse. ACRL ofrece marcos conceptuales, como autoridad contextual y búsqueda como exploración estratégica, no una receta lineal. UNESCO-AMI conecta acceso, evaluación, producción y participación con lectura crítica de medios y derechos.\n\nCaso breve\nUn equipo universitario ficticio prepara una guía para verificar noticias. Necesita organizar su trabajo, diagnosticar habilidades del grupo y examinar cómo juzga fuentes. Un integrante quiere llamar «Big6» a cualquier lista de capacidades; otro supone que una fuente oficial sirve para toda pregunta. El equipo debe reconocer aportes complementarios sin confundirlos.\n\nQué debes hacer\nUsa Big6 para ordenar el problema, SCONUL para revisar capacidades y ACRL para justificar criterios contextualizados. Añade AMI cuando analices producción y representación de mensajes. La autoridad depende de la pregunta y del uso; seguir etapas no garantiza una fuente adecuada. Explica qué marco aporta cada decisión y revisa tanto producto como proceso.",
    "questions": [
      {
        "type": "choice",
        "prompt": "El equipo quiere ordenar la resolución y evaluar el producto. ¿Qué elección aplica un modelo según su función?",
        "options": [
          "Usar Big6 para la secuencia y complementar con juicio crítico de fuentes.",
          "Usar los marcos ACRL como etapas lineales equivalentes a las seis de Big6.",
          "Usar los pilares SCONUL como garantía de que seguir un orden valida el producto."
        ],
        "correct": 0,
        "explanation": "Big6 estructura seis etapas de resolución y permite evaluar producto y proceso; el juicio de fuentes sigue siendo necesario."
      },
      {
        "type": "choice",
        "prompt": "La guía necesita valorar una fuente oficial para una pregunta concreta. ¿Qué decisión responde a ACRL?",
        "options": [
          "Trasladar autoridad institucional a cualquier tema para mantener un criterio estable.",
          "Examinar experiencia y contexto de la fuente respecto al uso previsto.",
          "Equiparar autoridad a presencia de referencias sin revisar pertinencia del contenido."
        ],
        "correct": 1,
        "explanation": "Authority Is Constructed and Contextual exige examinar experiencia, contexto y necesidad concreta."
      },
      {
        "type": "matching",
        "prompt": "Relaciona modelo y aporte.",
        "pairs": [
          {
            "left": "Big6",
            "right": "Proceso de resolución en seis etapas"
          },
          {
            "left": "SCONUL",
            "right": "Siete pilares de capacidad informacional"
          },
          {
            "left": "ACRL",
            "right": "Marcos conceptuales para juicio reflexivo"
          },
          {
            "left": "UNESCO-AMI",
            "right": "Lectura crítica de medios y participación con derechos"
          }
        ],
        "explanation": "Son aportes complementarios; no deben reducirse a la misma lista."
      },
      {
        "type": "ordering",
        "prompt": "Ordena Big6 para la guía de noticias.",
        "items": [
          "Definir la tarea de verificación",
          "Diseñar estrategias de información",
          "Localizar y acceder a fuentes",
          "Usar información pertinente",
          "Sintetizar la guía",
          "Evaluar producto y proceso"
        ],
        "explanation": "La evaluación del producto y proceso cierra la secuencia Big6."
      },
      {
        "type": "crossword",
        "prompt": "Completa conceptos de los marcos.",
        "entries": [
          {
            "word": "PILAR",
            "clue": "Capacidad del modelo SCONUL."
          },
          {
            "word": "MARCO",
            "clue": "Estructura conceptual reflexiva de ACRL."
          },
          {
            "word": "ETAPA",
            "clue": "Momento de resolución dentro de Big6."
          }
        ],
        "explanation": "Pilar, marco y etapa nombran funciones diferentes en los modelos."
      }
    ],
    "references": [
      {
        "name": "Framework for Information Literacy for Higher Education",
        "title": "Framework for Information Literacy for Higher Education",
        "author": "ACRL",
        "url": "https://www.ala.org/acrl/standards/ilframework",
        "section": "Authority Is Constructed and Contextual; Searching as Strategic Exploration",
        "purpose": "Distinguir un marco conceptual de una secuencia de trabajo."
      },
      {
        "name": "The SCONUL Seven Pillars of Information Literacy: Core Model",
        "title": "The SCONUL Seven Pillars of Information Literacy: Core Model",
        "author": "SCONUL",
        "url": "https://www.sconul.ac.uk/sites/default/files/documents/coremodel.pdf",
        "section": "Identify, Scope, Plan, Gather, Evaluate, Manage, Present",
        "purpose": "Leer los siete pilares como capacidades relacionadas y revisables."
      },
      {
        "name": "Media and information literacy curriculum for teachers",
        "title": "Media and information literacy curriculum for teachers",
        "author": "UNESCO",
        "url": "https://unesdoc.unesco.org/ark:/48223/pf0000192971",
        "section": "Marco de competencias AMI",
        "purpose": "Complementar la búsqueda con análisis de medios y participación ética."
      }
    ]
  },
  {
    "week": 4,
    "name": "Inclusión informacional: acceso no significa participación",
    "objective": "Distinguir barreras de acceso, habilidades y uso significativo.",
    "label": "Simulación educativa · práctica",
    "context": "Conceptos clave\nLa brecha digital incluye desigualdades de acceso, habilidades y beneficios obtenidos. La inclusión informacional requiere que las personas puedan localizar, comprender y usar información pertinente. Accesibilidad significa que las personas con distintas capacidades puedan percibir, comprender, navegar e interactuar. El diseño no debe imponer un único dispositivo o canal cuando eso excluye a quienes necesitan participar.\n\nCaso breve\nUna red universitaria ficticia organiza orientación para pequeños productores. Publica una imagen con instrucciones, exige computadora y supone que todos conocen términos técnicos. Algunos participantes usan teléfono; otros requieren texto alternativo o explicación sencilla. Entregar equipos ayudaría al acceso, pero no resolvería por sí solo comprensión ni barreras de interacción. No se describen procedimientos de una cadena productiva real.\n\nQué debes hacer\nIdentifica la barrera antes de proponer una solución. Conserva el contenido esencial en formatos comprensibles, ofrece alternativas y prueba tareas con personas afectadas. Valora si pueden participar y utilizar información, no solo si tienen conexión. Explica por qué consulta a usuarios, accesibilidad e instrucciones claras forman parte de la inclusión.",
    "questions": [
      {
        "type": "choice",
        "prompt": "La orientación impone computadora y lenguaje técnico. ¿Qué intervención aborda inclusión informacional?",
        "options": [
          "Priorizar entrega de dispositivos y asumir resuelta la comprensión al disponer de acceso.",
          "Relacionar barreras con alternativas de acceso, explicación y prueba de uso.",
          "Simplificar formato conservando vocabulario técnico porque inclusión atiende solo conectividad."
        ],
        "correct": 1,
        "explanation": "La inclusión aborda acceso, comprensión e interacción; los equipos no resuelven todas las dimensiones."
      },
      {
        "type": "choice",
        "prompt": "El equipo debe aceptar o revisar el recurso. ¿Qué evidencia demuestra participación real?",
        "options": [
          "Que el recurso esté disponible en el canal institucional con acceso público.",
          "Que una persona con computadora familiarizada con el contenido lo use sin dificultad.",
          "Que personas con distintas condiciones puedan comprender y completar la tarea."
        ],
        "correct": 2,
        "explanation": "La participación y el uso significativo se comprueban con tareas y personas que afrontan barreras."
      },
      {
        "type": "matching",
        "prompt": "Relaciona barrera y respuesta.",
        "pairs": [
          {
            "left": "Imagen con contenido indispensable",
            "right": "Alternativa textual equivalente"
          },
          {
            "left": "Lenguaje técnico desconocido",
            "right": "Explicación clara de conceptos"
          },
          {
            "left": "Canal que exige un dispositivo",
            "right": "Alternativa compatible con acceso disponible"
          },
          {
            "left": "Interacción inaccesible",
            "right": "Prueba con teclado y tecnologías de apoyo"
          }
        ],
        "explanation": "La respuesta se elige por barrera y conserva el significado, no solo la apariencia."
      },
      {
        "type": "ordering",
        "prompt": "Ordena una intervención inclusiva.",
        "items": [
          "Consultar necesidades y barreras",
          "Precisar contenido esencial",
          "Diseñar alternativas accesibles",
          "Probar comprensión e interacción",
          "Ajustar según experiencia de usuarios"
        ],
        "explanation": "Consultar y probar evita suponer que todos usan información del mismo modo."
      },
      {
        "type": "crossword",
        "prompt": "Completa conceptos de inclusión.",
        "entries": [
          {
            "word": "BRECHA",
            "clue": "Desigualdad de acceso, habilidades o beneficios."
          },
          {
            "word": "ACCESO",
            "clue": "Posibilidad inicial de llegar a la información."
          },
          {
            "word": "USO",
            "clue": "Aplicación significativa que la inclusión debe hacer posible."
          }
        ],
        "explanation": "Acceso es necesario, pero la inclusión también requiere habilidades y beneficios de uso."
      }
    ],
    "references": [
      {
        "name": "Introduction to Web Accessibility",
        "title": "Introduction to Web Accessibility",
        "author": "W3C Web Accessibility Initiative",
        "url": "https://www.w3.org/WAI/fundamentals/accessibility-intro/",
        "section": "What is Web Accessibility; Accessibility is Important for Individuals, Businesses, Society",
        "purpose": "Relacionar acceso digital, barreras y participación sin reducir inclusión a dispositivos."
      }
    ]
  },
  {
    "week": 5,
    "name": "De un tema amplio a una pregunta de investigación",
    "objective": "Formular una pregunta estratégica y distinguir conceptos de términos de búsqueda.",
    "label": "Simulación educativa · práctica",
    "context": "Conceptos clave\nUn tema nombra un campo amplio; una pregunta de investigación expresa qué se quiere comprender dentro de un alcance. Debe ser clara, investigable y relacionada con el propósito. Los conceptos son ideas centrales; los términos son palabras usadas para buscarlas. Un vocabulario reúne sinónimos, variantes y expresiones relacionadas, sin asumir que todos significan exactamente lo mismo. Investigar implica ajustar preguntas cuando se reconoce un vacío o aparece una perspectiva relevante.\n\nCaso breve\nUn equipo universitario ficticio propone investigar «información en empresas». La docente pide una pregunta sobre cómo estudiantes evalúan fuentes al preparar una recomendación. El equipo debe delimitar población, práctica y contexto, y preparar términos como evaluación de fuentes, credibilidad y alfabetización informacional. No necesita descargar datos empresariales ni inventar procedimientos de una organización real.\n\nQué debes hacer\nDistingue una pregunta investigable de una opinión o un tema general. Separa conceptos y expresiones de búsqueda, revisa equivalencias y documenta ajustes. La pregunta guía selección y lectura; los resultados no sustituyen la explicación del propósito. Elige un alcance que permita reunir y valorar evidencia pertinente.",
    "questions": [
      {
        "type": "choice",
        "prompt": "¿Qué pregunta delimita la práctica informacional sin anticipar su resultado?",
        "options": [
          "¿Qué fuentes populares sobre información en empresas deben usar estudiantes?",
          "¿Por qué la falta de credibilidad explica toda selección de materiales universitarios?",
          "¿Cómo justifican estudiantes universitarios la credibilidad de fuentes en una recomendación académica?"
        ],
        "correct": 2,
        "explanation": "La pregunta identifica práctica, población y contexto sin presuponer un juicio que debería investigarse."
      },
      {
        "type": "choice",
        "prompt": "El equipo prepara vocabulario para buscar. ¿Cómo tratar credibilidad y evaluación de fuentes?",
        "options": [
          "Como expresiones relacionadas cuyo significado debe examinarse antes de combinarlas.",
          "Como sinónimos exactos que pueden sustituirse en todos los textos.",
          "Como enfoques incompatibles que obligan a excluir uno desde la consulta inicial."
        ],
        "correct": 0,
        "explanation": "Un vocabulario útil reconoce variantes y diferencias de significado; no inventa equivalencia absoluta."
      },
      {
        "type": "matching",
        "prompt": "Relaciona componente y función.",
        "pairs": [
          {
            "left": "Tema",
            "right": "Campo general de interés"
          },
          {
            "left": "Pregunta",
            "right": "Problema concreto que orienta indagación"
          },
          {
            "left": "Concepto",
            "right": "Idea central que se desea explorar"
          },
          {
            "left": "Término",
            "right": "Expresión usada para recuperar documentos"
          }
        ],
        "explanation": "Formular la pregunta permite extraer conceptos y después buscar sus expresiones."
      },
      {
        "type": "ordering",
        "prompt": "Ordena la formulación estratégica.",
        "items": [
          "Reconocer el tema y propósito",
          "Delimitar población, práctica y contexto",
          "Redactar una pregunta investigable",
          "Identificar conceptos y variantes",
          "Revisar resultados y justificar ajustes"
        ],
        "explanation": "Los términos nacen de conceptos delimitados y se revisan tras explorar evidencia."
      },
      {
        "type": "crossword",
        "prompt": "Completa conceptos de formulación.",
        "entries": [
          {
            "word": "PREGUNTA",
            "clue": "Problema explícito que guía la investigación."
          },
          {
            "word": "TEMA",
            "clue": "Campo amplio del que se parte."
          },
          {
            "word": "TERMINO",
            "clue": "Palabra o expresión concreta para buscar."
          }
        ],
        "explanation": "Una pregunta no equivale al tema ni a una lista de términos."
      }
    ],
    "references": [
      {
        "name": "Framework for Information Literacy for Higher Education",
        "title": "Framework for Information Literacy for Higher Education",
        "author": "ACRL",
        "url": "https://www.ala.org/acrl/standards/ilframework",
        "section": "Research as Inquiry; Searching as Strategic Exploration",
        "purpose": "Delimitar preguntas y convertir conceptos en vocabulario revisable de búsqueda."
      }
    ]
  },
  {
    "week": 6,
    "name": "Escoger fuentes según lo que necesitamos comprender",
    "objective": "Distinguir fuentes institucionales, científicas y datos abiertos por función y límites.",
    "label": "Simulación educativa · práctica",
    "context": "Conceptos clave\nLas fuentes institucionales comunican documentos producidos por organismos y sus decisiones; las científicas presentan investigaciones con métodos y argumentos; los datos abiertos son recursos reutilizables bajo condiciones que deben revisarse. Ninguna categoría garantiza automáticamente pertinencia o exactitud. La fuente primaria aporta material original al problema; una secundaria interpreta otros materiales. La autoridad es contextual: depende de pregunta, experiencia, proceso y uso.\n\nCaso breve\nUn equipo universitario ficticio estudia orientación académica. Encuentra un reglamento vigente, un artículo sobre comprensión de instrucciones y un conjunto de datos con diccionario y licencia. El reglamento permite conocer requisitos institucionales; el artículo aporta método y discusión; el conjunto exige entender qué significan sus campos. Un blog que resume todo puede orientar la búsqueda, pero no reemplaza los originales.\n\nQué debes hacer\nAsocia necesidad y fuente, examina autoría, versión, cobertura y proceso de creación. Antes de reutilizar datos, lee significado de campos y condiciones. Justifica por qué una fuente sirve para una pregunta y no necesariamente para otra. Conserva enlaces al original y declara límites de uso.",
    "questions": [
      {
        "type": "choice",
        "prompt": "El equipo necesita confirmar una exigencia académica vigente. ¿Qué selección es pertinente?",
        "options": [
          "Consultar el reglamento original y comprobar versión y ámbito aplicables.",
          "Usar un artículo científico sobre aprendizaje para inferir el requisito institucional.",
          "Usar un resumen reciente como sustituto del original porque es más accesible."
        ],
        "correct": 0,
        "explanation": "La decisión institucional se verifica en el documento original, comprobando vigencia y alcance."
      },
      {
        "type": "choice",
        "prompt": "El conjunto de datos permite descarga y ofrece licencia. ¿Qué puede concluir el equipo?",
        "options": [
          "Que la apertura garantiza exactitud y hace innecesaria la revisión metodológica.",
          "Que puede reutilizarlo bajo condiciones, revisando además metadatos y calidad.",
          "Que basta el diccionario para autorizar cualquier reutilización sin consultar licencia."
        ],
        "correct": 1,
        "explanation": "Apertura y calidad son propiedades distintas; deben revisarse licencia, metadatos y método."
      },
      {
        "type": "matching",
        "prompt": "Relaciona recurso y aporte principal.",
        "pairs": [
          {
            "left": "Reglamento original",
            "right": "Requisito institucional y alcance"
          },
          {
            "left": "Artículo de investigación",
            "right": "Método, argumentos y limitaciones"
          },
          {
            "left": "Diccionario de datos",
            "right": "Significado de campos y categorías"
          },
          {
            "left": "Licencia de datos",
            "right": "Condiciones de reutilización"
          }
        ],
        "explanation": "Se elige la pieza por la pregunta que puede resolver y se revisan límites."
      },
      {
        "type": "ordering",
        "prompt": "Ordena la selección de una fuente.",
        "items": [
          "Definir la información requerida",
          "Identificar el tipo de recurso pertinente",
          "Localizar el documento original",
          "Comprobar autoría, proceso y versión",
          "Registrar uso previsto y limitaciones"
        ],
        "explanation": "El uso previsto guía la selección; el origen y proceso respaldan la evaluación."
      },
      {
        "type": "crossword",
        "prompt": "Completa términos de fuentes.",
        "entries": [
          {
            "word": "ORIGINAL",
            "clue": "Documento de procedencia que conviene recuperar."
          },
          {
            "word": "METADATO",
            "clue": "Descripción que ayuda a interpretar un recurso."
          },
          {
            "word": "LICENCIA",
            "clue": "Condiciones de uso y reutilización de un material."
          }
        ],
        "explanation": "La fuente se interpreta con procedencia, descripción y condiciones."
      }
    ],
    "references": [
      {
        "name": "Framework for Information Literacy for Higher Education",
        "title": "Framework for Information Literacy for Higher Education",
        "author": "ACRL",
        "url": "https://www.ala.org/acrl/standards/ilframework",
        "section": "Authority Is Constructed and Contextual; Information Creation as a Process",
        "purpose": "Escoger fuentes según pregunta, proceso de producción y uso previsto."
      }
    ]
  },
  {
    "week": 7,
    "name": "Laboratorio booleano: combinar conceptos sin perder significado",
    "objective": "Interpretar AND, OR, NOT y paréntesis en una estrategia documental.",
    "label": "Simulación educativa · práctica",
    "context": "Conceptos clave\nLos operadores booleanos combinan condiciones de búsqueda. AND exige ambos conceptos; OR admite cualquiera de las alternativas; NOT excluye documentos que contienen un término. Los paréntesis agrupan alternativas antes de combinarlas con otra condición. Una exclusión puede eliminar documentos pertinentes que mencionen el término; por eso debe revisarse. La minería documental extrae campos o conceptos con reglas explícitas y necesita lectura contextual.\n\nCaso breve\nUn equipo universitario ficticio busca documentos sobre alfabetización informacional o mediática en educación superior. Desea admitir ambos enfoques y mantener el contexto universitario. Alguien propone exigir ambos nombres simultáneamente; otra persona propone excluir «publicidad» aunque puede haber investigaciones útiles que la analicen críticamente. El buscador del ejercicio interpreta literalmente los operadores y grupos indicados.\n\nQué debes hacer\nRepresenta alternativas con OR y une el grupo al contexto con AND. Explica por qué NOT no garantiza calidad. Después de recuperar, examina qué estudia el documento antes de extraer conceptos. La actividad trata lógica de búsqueda y significado, no conteos de resultados ni cálculos.",
    "questions": [
      {
        "type": "choice",
        "prompt": "La pregunta admite ALFIN o AMI y exige contexto universitario. ¿Qué consulta conserva esa lógica?",
        "options": [
          "(ALFIN AND AMI) OR universidad",
          "(ALFIN OR AMI) AND universidad",
          "ALFIN OR (AMI AND universidad)"
        ],
        "correct": 1,
        "explanation": "OR admite cualquiera de los enfoques y AND exige contexto; los paréntesis conservan el grupo."
      },
      {
        "type": "choice",
        "prompt": "El equipo propone NOT publicidad. ¿Qué objeción conceptual debe examinar?",
        "options": [
          "Siempre mejora calidad porque elimina todo documento con interés comercial.",
          "Solo afecta publicidad comercial y conserva cualquier análisis académico sin revisión.",
          "Puede excluir investigaciones pertinentes que analizan críticamente publicidad."
        ],
        "correct": 2,
        "explanation": "La exclusión opera sobre términos, no sobre calidad o finalidad del documento."
      },
      {
        "type": "matching",
        "prompt": "Relaciona operador y efecto.",
        "pairs": [
          {
            "left": "AND",
            "right": "Exige ambas condiciones"
          },
          {
            "left": "OR",
            "right": "Admite alternativas"
          },
          {
            "left": "NOT",
            "right": "Excluye la condición indicada"
          },
          {
            "left": "Paréntesis",
            "right": "Agrupan una parte de la consulta"
          }
        ],
        "explanation": "Los operadores expresan lógica y deben relacionarse con los conceptos de la pregunta."
      },
      {
        "type": "ordering",
        "prompt": "Ordena una consulta revisable.",
        "items": [
          "Identificar conceptos y contexto",
          "Agrupar términos alternativos",
          "Combinar grupos con condiciones necesarias",
          "Inspeccionar pertinencia y exclusiones",
          "Guardar consulta y justificar ajustes"
        ],
        "explanation": "La inspección contextual precede a usar resultados como evidencia."
      },
      {
        "type": "crossword",
        "prompt": "Completa vocabulario de búsqueda avanzada.",
        "entries": [
          {
            "word": "OPERADOR",
            "clue": "Elemento que combina condiciones booleanas."
          },
          {
            "word": "CONSULTA",
            "clue": "Expresión que se ejecuta para buscar."
          },
          {
            "word": "GRUPO",
            "clue": "Conjunto de alternativas delimitado con paréntesis."
          }
        ],
        "explanation": "Agrupar y combinar condiciones permite representar mejor la necesidad."
      }
    ],
    "references": [
      {
        "name": "PubMed User Guide",
        "title": "PubMed User Guide",
        "author": "National Library of Medicine / NCBI",
        "url": "https://pubmed.ncbi.nlm.nih.gov/help/#combining-search-terms-with-boolean-operators",
        "section": "Combining search terms with Boolean operators",
        "purpose": "Leer AND, OR, NOT y agrupación como lógica de combinación de conceptos."
      }
    ]
  },
  {
    "week": 8,
    "name": "Un dossier digital que permite recuperar el razonamiento",
    "objective": "Organizar referencias, metadatos, notas y versiones con trazabilidad.",
    "label": "Simulación educativa · práctica",
    "context": "Conceptos clave\nUn dossier digital reúne fuentes y notas relacionadas con una decisión o investigación. Los metadatos describen el recurso: autor, título, fecha, tipo e identificador. Un gestor bibliográfico facilita organizar y citar, pero los datos importados necesitan revisión. Las colecciones agrupan recursos por proyecto; las etiquetas señalan temas o estados. Un duplicado no es una fuente independiente y las versiones deben distinguirse.\n\nCaso breve\nUn equipo universitario ficticio prepara una revisión sobre búsqueda informacional. Tiene un artículo completo, otra copia del mismo y notas que mezclan texto literal con ideas propias. Quiere crear una carpeta llamada «todo» y generar citas automáticamente. La docente pide poder identificar qué documento respalda cada afirmación y dónde se encuentra el pasaje utilizado.\n\nQué debes hacer\nRevisa metadatos, consolida duplicados y separa citas, paráfrasis e interpretación. Registra localizadores y notas de uso, organizando por propósito y estado. No borres una versión sin examinar diferencias. El dossier debe permitir recuperar evidencia y comprender por qué fue seleccionada, no solo guardar archivos.",
    "questions": [
      {
        "type": "choice",
        "prompt": "El equipo necesita que cada afirmación pueda revisarse. ¿Qué organización lo permite?",
        "options": [
          "Colecciones por tema sin localizador, considerando suficiente la cercanía temática.",
          "Referencias exportadas automáticamente, usando formato correcto como prueba de exactitud.",
          "Metadatos comprobados, notas de uso y localizador del pasaje original."
        ],
        "correct": 2,
        "explanation": "Metadatos y localizadores permiten recuperar el original y revisar el uso de evidencia."
      },
      {
        "type": "choice",
        "prompt": "Hay dos copias del mismo artículo. ¿Qué tratamiento conserva evidencia sin inflar corroboración?",
        "options": [
          "Comparar versiones, consolidar equivalentes y conservar información única.",
          "Contarlas por separado porque sus nombres de archivo indican dos entradas.",
          "Conservar la copia más reciente y descartar la otra sin comparar contenido."
        ],
        "correct": 0,
        "explanation": "La copia no crea independencia; la consolidación debe preservar versiones e información pertinente."
      },
      {
        "type": "matching",
        "prompt": "Relaciona recurso organizativo y finalidad.",
        "pairs": [
          {
            "left": "Metadatos",
            "right": "Identificar el documento"
          },
          {
            "left": "Colección",
            "right": "Agrupar recursos de un proyecto"
          },
          {
            "left": "Etiqueta",
            "right": "Señalar tema o estado de revisión"
          },
          {
            "left": "Localizador",
            "right": "Encontrar el pasaje utilizado"
          }
        ],
        "explanation": "La organización une identificación, recuperación y razonamiento sobre el uso."
      },
      {
        "type": "ordering",
        "prompt": "Ordena la incorporación al dossier.",
        "items": [
          "Recuperar documento completo",
          "Comprobar metadatos y versión",
          "Revisar duplicados y organizar",
          "Registrar notas con atribución y localizador",
          "Verificar cita y vínculo con la afirmación"
        ],
        "explanation": "El gestor facilita trabajo, pero no reemplaza revisión intelectual."
      },
      {
        "type": "crossword",
        "prompt": "Completa conceptos del dossier.",
        "entries": [
          {
            "word": "DOSSIER",
            "clue": "Expediente organizado para una investigación."
          },
          {
            "word": "ETIQUETA",
            "clue": "Marcador temático o de estado de un recurso."
          },
          {
            "word": "NOTA",
            "clue": "Registro de lectura que distingue evidencia e interpretación."
          }
        ],
        "explanation": "Un dossier recuperable documenta recursos y pensamiento del equipo."
      }
    ],
    "references": [
      {
        "name": "Collections and Tags",
        "title": "Collections and Tags",
        "author": "Zotero Documentation",
        "url": "https://www.zotero.org/support/collections_and_tags",
        "section": "Collections; Tags; Duplicate Items",
        "purpose": "Organizar referencias con colecciones y etiquetas, y distinguir copias de evidencia independiente."
      },
      {
        "name": "Adding Items to Zotero",
        "title": "Adding Items to Zotero",
        "author": "Zotero Documentation",
        "url": "https://www.zotero.org/support/adding_items_to_zotero",
        "section": "Adding Items; Editing Items",
        "purpose": "Revisar metadatos antes de reutilizar una referencia importada."
      }
    ]
  },
  {
    "week": 9,
    "name": "CRAAP: evaluar según el uso previsto",
    "objective": "Aplicar criterios de actualidad, relevancia, autoridad, exactitud y propósito.",
    "label": "Simulación educativa · práctica",
    "context": "Conceptos clave\nCRAAP reúne preguntas sobre actualidad (vigencia), relevancia (relación con la necesidad), autoridad (autoría y competencia), exactitud (respaldo verificable) y propósito (intención e intereses). Son dimensiones de juicio, no una puntuación que garantice verdad. Una fuente reciente puede ser poco pertinente; una fuente antigua puede servir para un análisis histórico. La autoridad debe examinarse respecto al uso.\n\nCaso breve\nUn equipo universitario ficticio compara materiales para explicar verificación de noticias. Una guía identifica autores y referencias; un texto promocional promete resultados infalibles sin método. La guía puede merecer mayor atención, pero todavía hay que revisar alcance y argumentos. El patrocinio de una fuente es un dato para valorar propósito, no una prueba automática de falsedad.\n\nQué debes hacer\nAplica preguntas concretas al material y justifica qué puede apoyar. Distingue fecha de vigencia, prestigio de evidencia y promoción de respaldo. Si falta método o referencia, registra la limitación y busca corroboración. Evalúa para una necesidad definida y comunica razones; no elijas por apariencia, ni garantices resultados por cumplir una lista.",
    "questions": [
      {
        "type": "choice",
        "prompt": "La guía tiene autores y referencias. ¿Qué decisión aplica CRAAP al uso previsto?",
        "options": [
          "Examinar relación con la necesidad, respaldo y límites antes de seleccionarla.",
          "Priorizar autoridad del equipo y asumir que sus referencias verifican cada afirmación.",
          "Priorizar fecha de edición y considerar secundaria la pertinencia al problema."
        ],
        "correct": 0,
        "explanation": "Identificación ayuda, pero la evaluación requiere comprobar contenido y uso."
      },
      {
        "type": "choice",
        "prompt": "La fuente declara patrocinio. ¿Cómo usar ese dato sin confundir propósito y exactitud?",
        "options": [
          "Descartarla en todo uso porque el patrocinio invalida incluso evidencia comprobable.",
          "Examinar incentivos y contrastar afirmaciones antes de decidir qué puede apoyar.",
          "Aceptar su contenido por transparente, considerando innecesario contrastar lo declarado."
        ],
        "correct": 1,
        "explanation": "Propósito alerta sobre incentivos; no sustituye revisión de exactitud y pertinencia."
      },
      {
        "type": "matching",
        "prompt": "Relaciona pregunta y criterio CRAAP.",
        "pairs": [
          {
            "left": "¿Sigue vigente para este uso?",
            "right": "Actualidad"
          },
          {
            "left": "¿Responde al problema?",
            "right": "Relevancia"
          },
          {
            "left": "¿Quién está en condiciones de sostenerlo?",
            "right": "Autoridad"
          },
          {
            "left": "¿Qué evidencia permite comprobarlo?",
            "right": "Exactitud"
          },
          {
            "left": "¿Qué intenta conseguir?",
            "right": "Propósito"
          }
        ],
        "explanation": "Cada criterio aborda una dimensión diferente de la valoración contextual."
      },
      {
        "type": "ordering",
        "prompt": "Ordena una evaluación argumentada.",
        "items": [
          "Definir necesidad y uso de la fuente",
          "Examinar fecha, autoría y alcance",
          "Revisar respaldo e intención del mensaje",
          "Contrastar afirmaciones y registrar límites",
          "Justificar el uso o descarte ante la necesidad"
        ],
        "explanation": "No se ordenan criterios equivalentes de forma arbitraria; se organiza el proceso de valoración."
      },
      {
        "type": "crossword",
        "prompt": "Completa criterios de juicio.",
        "entries": [
          {
            "word": "AUTORIDAD",
            "clue": "Idoneidad contextual de quien produce una fuente."
          },
          {
            "word": "PROPOSITO",
            "clue": "Intención e intereses del mensaje."
          },
          {
            "word": "VIGENCIA",
            "clue": "Actualidad relevante para el uso previsto."
          }
        ],
        "explanation": "La evaluación combina criterios y explica su pertinencia, sin garantías automáticas."
      }
    ],
    "references": [
      {
        "name": "Evaluating Information: Applying the CRAAP Test",
        "title": "Evaluating Information: Applying the CRAAP Test",
        "author": "Meriam Library, California State University, Chico",
        "url": "https://library.csuchico.edu/sites/default/files/craap-test.pdf",
        "section": "Currency, Relevance, Authority, Accuracy, Purpose",
        "purpose": "Aplicar preguntas sobre vigencia, pertinencia, autoría, respaldo e intención sin convertirlas en garantía."
      }
    ]
  },
  {
    "week": 10,
    "name": "Desinformación: distinguir circulación de verificación",
    "objective": "Reconocer origen, dependencia de fuentes, sesgos y límites de afirmaciones.",
    "label": "Simulación educativa · práctica",
    "context": "Conceptos clave\nUna afirmación requiere evidencia pertinente; repetición y popularidad no la verifican. La verificación cruzada compara documentos y fuentes de procedencia reconocible, examinando si dependen del mismo origen. El sesgo de confirmación consiste en favorecer lo que coincide con una creencia y desatender evidencia contraria. Una captura sin contexto puede distorsionar significado; verificar exige recuperar original y distinguir confirmado de pendiente.\n\nCaso breve\nUn grupo universitario ficticio recibe una captura que atribuye a una organización una prohibición. Varios mensajes la repiten, pero todos usan la misma imagen. El documento completo describe una recomendación en un contexto limitado, no la prohibición general. El grupo necesita explicar la diferencia sin acusar intenciones que no puede demostrar.\n\nQué debes hacer\nDescompón el mensaje en afirmaciones, localiza su procedencia y contrasta alcance. No cuentes copias como corroboraciones independientes. Examina también evidencia que podría cambiar tu posición y comunica lo verificado junto a las dudas. Si no conoces intención del emisor, no la inventes para sostener la corrección.",
    "questions": [
      {
        "type": "choice",
        "prompt": "Las copias de la captura afirman una prohibición general. ¿Qué acción permite revisar esa lectura?",
        "options": [
          "Reunir copias de distintos canales y tratarlas como confirmaciones del contenido.",
          "Recuperar el original y comparar su contexto y alcance con el mensaje.",
          "Priorizar el texto más reciente sin rastrear si depende de la misma captura."
        ],
        "correct": 1,
        "explanation": "El documento completo permite examinar contexto y distinguir recomendación de prohibición."
      },
      {
        "type": "choice",
        "prompt": "El grupo cree que la captura es falsa. ¿Qué acción reduce su sesgo de confirmación?",
        "options": [
          "Buscar únicamente documentos contrarios a la captura para fortalecer la corrección.",
          "Descartar fuentes favorables al mensaje por no coincidir con el juicio inicial.",
          "Examinar también evidencia que podría sostener o refutar su interpretación inicial."
        ],
        "correct": 2,
        "explanation": "Una revisión crítica considera evidencia contraria y puede modificar su conclusión."
      },
      {
        "type": "matching",
        "prompt": "Relaciona situación y concepto.",
        "pairs": [
          {
            "left": "Mensajes copian una captura",
            "right": "Dependencia de origen"
          },
          {
            "left": "Imagen sin pasaje completo",
            "right": "Pérdida de contexto"
          },
          {
            "left": "Descartar evidencia contraria sin razones",
            "right": "Sesgo de confirmación"
          },
          {
            "left": "Comparar documento y afirmación",
            "right": "Verificación cruzada"
          }
        ],
        "explanation": "La evaluación atiende procedencia, contexto y sesgos del propio analista."
      },
      {
        "type": "ordering",
        "prompt": "Ordena la verificación del mensaje.",
        "items": [
          "Identificar afirmación concreta",
          "Localizar documento original",
          "Comparar significado y alcance",
          "Contrastar evidencia y dudas",
          "Comunicar corrección con fuente y límites"
        ],
        "explanation": "La corrección llega después de examinar origen y alcance, preservando lo pendiente."
      },
      {
        "type": "crossword",
        "prompt": "Completa términos de lectura crítica.",
        "entries": [
          {
            "word": "ORIGEN",
            "clue": "Procedencia que debe localizarse al verificar."
          },
          {
            "word": "SESGO",
            "clue": "Distorsión de juicio que puede favorecer creencias previas."
          },
          {
            "word": "CONTRASTE",
            "clue": "Comparación de evidencia pertinente para una afirmación."
          }
        ],
        "explanation": "Origen y contraste ayudan a detectar distorsiones y revisar creencias."
      }
    ],
    "references": [
      {
        "name": "Media and information literacy curriculum for teachers",
        "title": "Media and information literacy curriculum for teachers",
        "author": "UNESCO",
        "url": "https://unesdoc.unesco.org/ark:/48223/pf0000192971",
        "section": "Módulo sobre noticias, medios e información ética",
        "purpose": "Analizar origen, representaciones e intereses de mensajes que circulan."
      },
      {
        "name": "Framework for Information Literacy for Higher Education",
        "title": "Framework for Information Literacy for Higher Education",
        "author": "ACRL",
        "url": "https://www.ala.org/acrl/standards/ilframework",
        "section": "Authority Is Constructed and Contextual: Knowledge Practices",
        "purpose": "Contrastar procedencia y respaldo sin confundir popularidad con autoridad."
      }
    ]
  },
  {
    "week": 11,
    "name": "Autoría y licencias: citar no concede cualquier permiso",
    "objective": "Distinguir citación, paráfrasis y condiciones de reutilización.",
    "label": "Simulación educativa · práctica",
    "context": "Conceptos clave\nCitar identifica el uso de palabras o ideas ajenas; no concede por sí solo autorización ilimitada para reutilizar una obra. Una paráfrasis expresa comprensión propia y también atribuye la idea. Copiar con cambios superficiales no demuestra elaboración. Las licencias indican usos permitidos y condiciones. CC BY permite compartir y adaptar con atribución, enlace a la licencia e indicación de cambios; ausencia de licencia visible no equivale a libertad de uso.\n\nCaso breve\nUn equipo universitario ficticio prepara una guía. Quiere incluir una ilustración CC BY y un párrafo ajeno. Alguien propone recortar la imagen sin registrar cambios y reemplazar algunas palabras del párrafo para llamarlo propio. La tarea exige explicar qué pertenece a fuentes y qué elaboró el equipo, recuperando condiciones del recurso original.\n\nQué debes hacer\nDistingue atribución de permiso, cita literal de paráfrasis y adaptación de uso sin cambios. Verifica condiciones antes de publicar y conserva evidencia de autoría y licencia. No inventes permiso cuando falta información. Redacta de modo que el lector pueda distinguir voces y localizar las fuentes.",
    "questions": [
      {
        "type": "choice",
        "prompt": "El equipo recorta una ilustración CC BY. ¿Qué acción satisface las condiciones enseñadas?",
        "options": [
          "Conservar atribución y omitir el cambio porque la adaptación mantiene el tema.",
          "Indicar el cambio y considerar innecesario identificar al autor tras modificarla.",
          "Conservar atribución, enlazar licencia e indicar que se recortó."
        ],
        "correct": 2,
        "explanation": "CC BY permite adaptar bajo condiciones explícitas, entre ellas señalar cambios."
      },
      {
        "type": "choice",
        "prompt": "El grupo desea incorporar la explicación ajena con su propia voz. ¿Qué constituye paráfrasis responsable?",
        "options": [
          "Expresar comprensión propia y atribuir la idea, sin simular autoría original.",
          "Reorganizar frases manteniendo redacción ajena y considerarlas propias por nuevo orden.",
          "Cambiar términos por sinónimos y considerar que eso elimina necesidad de referencia."
        ],
        "correct": 0,
        "explanation": "La paráfrasis exige elaboración y atribución; cambiar unas palabras no elimina autoría ajena."
      },
      {
        "type": "matching",
        "prompt": "Relaciona práctica y función.",
        "pairs": [
          {
            "left": "Citación",
            "right": "Identificar uso de una fuente"
          },
          {
            "left": "Licencia",
            "right": "Definir usos y condiciones autorizados"
          },
          {
            "left": "Paráfrasis",
            "right": "Expresar una idea comprendida con voz propia y atribución"
          },
          {
            "left": "Cita literal",
            "right": "Distinguir palabras ajenas y localizarlas"
          }
        ],
        "explanation": "Permiso y atribución responden a preguntas diferentes y deben revisarse."
      },
      {
        "type": "ordering",
        "prompt": "Ordena la reutilización responsable.",
        "items": [
          "Localizar recurso y autoría",
          "Comprobar licencia y uso propuesto",
          "Obtener permiso adicional si resulta necesario",
          "Preparar atribución y declarar modificaciones",
          "Revisar publicación y guardar respaldo"
        ],
        "explanation": "Las condiciones se comprueban antes de usar; el respaldo permite revisar autorización y atribución."
      },
      {
        "type": "crossword",
        "prompt": "Completa términos de uso ético.",
        "entries": [
          {
            "word": "AUTOR",
            "clue": "Persona identificada como creadora del recurso."
          },
          {
            "word": "LICENCIA",
            "clue": "Condiciones que autorizan determinados usos."
          },
          {
            "word": "CITA",
            "clue": "Identificación del uso de palabras o ideas ajenas."
          }
        ],
        "explanation": "Reconocer autoría no sustituye verificar permisos de reutilización."
      }
    ],
    "references": [
      {
        "name": "Creative Commons Attribution 4.0 International · resumen",
        "title": "Creative Commons Attribution 4.0 International · resumen",
        "author": "Creative Commons",
        "url": "https://creativecommons.org/licenses/by/4.0/deed.es",
        "section": "Eres libre de; Bajo las condiciones siguientes",
        "purpose": "Distinguir permiso de compartir/adaptar y obligaciones de atribución."
      },
      {
        "name": "Framework for Information Literacy for Higher Education",
        "title": "Framework for Information Literacy for Higher Education",
        "author": "ACRL",
        "url": "https://www.ala.org/acrl/standards/ilframework",
        "section": "Information Has Value",
        "purpose": "Relacionar propiedad intelectual, atribución y responsabilidad en el uso de ideas."
      }
    ]
  },
  {
    "week": 12,
    "name": "IA generativa: texto convincente no es evidencia",
    "objective": "Validar respuestas generativas con fuentes, límites y responsabilidad humana.",
    "label": "Simulación educativa · práctica",
    "context": "Conceptos clave\nLa IA generativa produce respuestas a partir de patrones y puede generar afirmaciones plausibles sin respaldo. Fluidez no demuestra exactitud. Validar exige comprobar fuentes originales y distinguir hallazgos confirmados de pendientes. Los sesgos pueden reproducir representaciones limitadas; privacidad exige no introducir datos personales en herramientas no autorizadas. Integridad académica implica declarar uso según política y mantener responsabilidad por la entrega.\n\nCaso breve\nUn equipo universitario ficticio pide a una herramienta una explicación de ALFIN. Recibe una referencia que no logra recuperar y una descripción que trata ACRL como receta lineal. La herramienta también invita a cargar datos de compañeros para personalizar. El equipo dispone de los marcos originales y debe revisar el borrador antes de incorporarlo.\n\nQué debes hacer\nIdentifica afirmaciones, recupera fuentes y corrige conceptos con respaldo. No fabriques una referencia ni atribuyas certeza a lo no verificado. Usa ejemplos ficticios cuando no se requieran datos reales y registra cómo empleaste y revisaste la herramienta. La IA puede apoyar exploración, pero no sustituye juicio ni autoría responsable.",
    "questions": [
      {
        "type": "choice",
        "prompt": "La IA cita una referencia no recuperada. ¿Qué tratamiento mantiene rigor sin inferir de más?",
        "options": [
          "Marcarla no verificada y comprobarla antes de usarla como fundamento.",
          "Aceptarla provisionalmente como evidencia porque coincide con otros textos del borrador.",
          "Declararla inexistente solo porque una búsqueda inicial no la recuperó."
        ],
        "correct": 0,
        "explanation": "Una referencia plausible requiere recuperación y contraste; la ausencia de comprobación debe conservarse."
      },
      {
        "type": "choice",
        "prompt": "La herramienta pide datos de compañeros para personalizar un ejemplo conceptual. ¿Qué respuesta es proporcional?",
        "options": [
          "Compartir correos porque personalizar el texto convierte todo dato en necesario.",
          "Usar ejemplos ficticios y respetar finalidad y políticas de privacidad.",
          "Eliminar nombres pero compartir los demás identificadores sin revisar la autorización."
        ],
        "correct": 1,
        "explanation": "Personalización no justifica exponer datos; la tarea conceptual puede usar simulaciones."
      },
      {
        "type": "matching",
        "prompt": "Relaciona riesgo y respuesta crítica.",
        "pairs": [
          {
            "left": "Fluidez sin evidencia",
            "right": "Contrastar afirmaciones con fuentes"
          },
          {
            "left": "Referencia no recuperable",
            "right": "No usar como fundamento verificado"
          },
          {
            "left": "Representación limitada",
            "right": "Examinar sesgos y perspectivas ausentes"
          },
          {
            "left": "Entrega asistida por IA",
            "right": "Declarar uso y revisión según política"
          }
        ],
        "explanation": "La validación distingue riesgos y exige responsabilidad humana sobre el producto."
      },
      {
        "type": "ordering",
        "prompt": "Ordena la revisión del borrador.",
        "items": [
          "Identificar afirmaciones y recursos citados",
          "Recuperar fuentes originales",
          "Contrastar conceptos y examinar sesgos",
          "Corregir y señalar lo no verificado",
          "Registrar uso de IA y revisión humana"
        ],
        "explanation": "Primero se identifica y contrasta; luego se corrige y documenta el proceso."
      },
      {
        "type": "crossword",
        "prompt": "Completa conceptos de validación.",
        "entries": [
          {
            "word": "SESGO",
            "clue": "Representación o juicio limitado que debe examinarse."
          },
          {
            "word": "FUENTE",
            "clue": "Origen verificable que respalda una afirmación."
          },
          {
            "word": "INTEGRIDAD",
            "clue": "Responsabilidad y transparencia en el trabajo académico."
          }
        ],
        "explanation": "El uso reflexivo exige evidencia, revisión de sesgos e integridad."
      }
    ],
    "references": [
      {
        "name": "Guidance for generative AI in education and research",
        "title": "Guidance for generative AI in education and research",
        "author": "UNESCO · Fengchun Miao y Wayne Holmes",
        "url": "https://unesdoc.unesco.org/ark:/48223/pf0000386693",
        "section": "Controversies around generative AI; Regulating the use; Facilitating creative use",
        "purpose": "Revisar límites, privacidad, sesgos y responsabilidad humana en educación e investigación."
      }
    ]
  },
  {
    "week": 13,
    "name": "Síntesis: relacionar ideas, no pegar fragmentos",
    "objective": "Transformar evidencia en una explicación propia que conserva voces y límites.",
    "label": "Simulación educativa · práctica",
    "context": "Conceptos clave\nResumir identifica lo esencial de un texto; sintetizar relaciona ideas de distintas fuentes para responder una pregunta. La síntesis distingue acuerdo, diferencia y límites, sin presentar perspectivas como equivalentes cuando no lo son. La paráfrasis expresa comprensión y atribuye ideas. ACRL concibe el conocimiento académico como conversación en la que los argumentos se relacionan y revisan; interpretar no equivale a copiar.\n\nCaso breve\nUn equipo universitario ficticio prepara una explicación de alfabetización informacional. Un texto enfatiza búsqueda; otro considera evaluación y uso ético; un tercero analiza participación. El equipo propone pegar extractos en secuencia, pero necesita explicar cómo se complementan y qué diferencias de propósito tienen. Ningún fragmento aislado representa por sí solo toda la discusión.\n\nQué debes hacer\nReconoce ideas centrales y agrúpalas por la pregunta, no por el orden de descarga. Compara relaciones, conserva atribución y redacta un argumento propio con alcance explícito. No inventes consenso ni omitas evidencia incómoda. El producto debe mostrar cómo se transforma información leída en conocimiento comunicable y revisable.",
    "questions": [
      {
        "type": "choice",
        "prompt": "¿Qué producto integra fuentes en una síntesis y no solo en resúmenes consecutivos?",
        "options": [
          "Resumir cada texto por separado y asumir que la secuencia explica sus relaciones.",
          "Relacionar búsqueda, evaluación y participación según la pregunta, con atribución y límites.",
          "Elegir el concepto más frecuente y tratar las otras perspectivas como equivalentes."
        ],
        "correct": 1,
        "explanation": "Sintetizar relaciona perspectivas según una pregunta y conserva procedencia de las ideas."
      },
      {
        "type": "choice",
        "prompt": "Los textos tienen propósitos distintos. ¿Cómo integrarlos sin falsear su significado?",
        "options": [
          "Usar una misma definición para todos para evitar discrepancias en la redacción.",
          "Excluir diferencias porque la síntesis debe presentar una sola voz sin matices.",
          "Explicar contexto y diferencias antes de justificar cómo se relacionan."
        ],
        "correct": 2,
        "explanation": "La síntesis reconoce diferencias y límites; no fuerza equivalencias ni consenso."
      },
      {
        "type": "matching",
        "prompt": "Relaciona operación y función.",
        "pairs": [
          {
            "left": "Resumen",
            "right": "Recuperar lo esencial de un texto"
          },
          {
            "left": "Síntesis",
            "right": "Relacionar ideas para responder una pregunta"
          },
          {
            "left": "Paráfrasis",
            "right": "Expresar comprensión con atribución"
          },
          {
            "left": "Límite",
            "right": "Indicar lo que la evidencia no permite afirmar"
          }
        ],
        "explanation": "Las operaciones aportan al conocimiento comunicable y mantienen transparencia de las voces."
      },
      {
        "type": "ordering",
        "prompt": "Ordena una síntesis académica.",
        "items": [
          "Definir la pregunta que debe responderse",
          "Reconocer ideas centrales en fuentes",
          "Comparar acuerdos, diferencias y contexto",
          "Redactar una relación argumentada con atribución",
          "Revisar respaldo y límites del producto"
        ],
        "explanation": "Se lee y compara antes de redactar; luego se comprueba qué respalda cada afirmación."
      },
      {
        "type": "crossword",
        "prompt": "Completa conceptos de transformación informacional.",
        "entries": [
          {
            "word": "SINTESIS",
            "clue": "Integración de ideas en una explicación argumentada."
          },
          {
            "word": "RESUMEN",
            "clue": "Recuperación de lo esencial de un texto."
          },
          {
            "word": "ARGUMENTO",
            "clue": "Razonamiento que conecta evidencia y conclusión."
          }
        ],
        "explanation": "Una síntesis articula ideas y muestra el razonamiento, no solo fragmentos."
      }
    ],
    "references": [
      {
        "name": "Framework for Information Literacy for Higher Education",
        "title": "Framework for Information Literacy for Higher Education",
        "author": "ACRL",
        "url": "https://www.ala.org/acrl/standards/ilframework",
        "section": "Scholarship as Conversation; Research as Inquiry",
        "purpose": "Relacionar perspectivas, distinguir atribución y elaborar síntesis sin ocultar límites."
      }
    ]
  },
  {
    "week": 14,
    "name": "Comunicación estratégica: el mismo conocimiento para distintas audiencias",
    "objective": "Adaptar propósito, lenguaje, formato y canal sin alterar los hechos.",
    "label": "Simulación educativa · práctica",
    "context": "Conceptos clave\nLa comunicación estratégica parte de propósito y audiencia. Un mensaje académico argumenta; una orientación explica acciones; una síntesis ejecutiva prioriza decisión y límites. El canal y formato condicionan cómo se percibe el contenido, pero no autorizan a cambiar evidencia. ACRL invita a examinar creación de información como proceso: elecciones de producción y presentación influyen en uso y comprensión.\n\nCaso breve\nUn equipo universitario ficticio explica cómo evaluar fuentes. La docente necesita criterios y fundamentación; estudiantes nuevos requieren instrucciones claras; una difusión breve debe invitar a consultar la guía. Copiar el mismo texto extenso en todos los espacios puede impedir comprensión. Simplificar no significa convertir una recomendación limitada en certeza.\n\nQué debes hacer\nDefine qué debe comprender o hacer cada audiencia. Selecciona lenguaje, orden y canal adecuados, manteniendo conceptos y alcance. Prevé acceso al material completo cuando uses formatos breves. Comprueba comprensión con tareas o preguntas, no solo si el mensaje se publicó. Explica por qué tus elecciones responden a propósito y destinatario. La ruta acordada parte del propósito, identifica luego audiencia, selecciona contenido y canal, prepara la versión y termina comprobando comprensión.",
    "questions": [
      {
        "type": "choice",
        "prompt": "Los estudiantes nuevos deben aplicar criterios. ¿Qué adaptación facilita comprensión sin alterar contenido?",
        "options": [
          "La fundamentación extensa del comité sin cambiar vocabulario ni jerarquía.",
          "Una versión breve sin límites porque la simplificación exige suprimir matices.",
          "Instrucciones claras con conceptos necesarios y ruta a la explicación completa."
        ],
        "correct": 2,
        "explanation": "La adaptación facilita comprensión conservando contenido y límites, sin promesas injustificadas."
      },
      {
        "type": "choice",
        "prompt": "Al pasar la guía a un canal breve, ¿qué debe mantener coherencia entre versiones?",
        "options": [
          "Hechos, conceptos y límites respaldados, aunque cambie extensión y detalle.",
          "La misma cantidad de información, aunque impida lectura en ese canal.",
          "El objetivo de persuadir, aunque eso permita reforzar conclusiones no sostenidas."
        ],
        "correct": 0,
        "explanation": "El formato cambia según propósito y audiencia; la evidencia y el alcance permanecen coherentes."
      },
      {
        "type": "matching",
        "prompt": "Relaciona audiencia y prioridad.",
        "pairs": [
          {
            "left": "Docente revisora",
            "right": "Fundamentación y criterios"
          },
          {
            "left": "Estudiante que comienza",
            "right": "Pasos comprensibles y vocabulario explicado"
          },
          {
            "left": "Lectura breve de difusión",
            "right": "Idea central y acceso al recurso completo"
          },
          {
            "left": "Usuario con otra forma de acceso",
            "right": "Formato equivalente accesible"
          }
        ],
        "explanation": "La comunicación adapta presentación a necesidades sin distorsionar significado."
      },
      {
        "type": "ordering",
        "prompt": "Aplica la ruta acordada para diseñar el mensaje, desde el propósito hasta la comprobación.",
        "items": [
          "Definir propósito comunicativo",
          "Identificar audiencia y necesidades",
          "Elegir contenido, lenguaje y canal",
          "Preparar versión coherente y accesible",
          "Comprobar comprensión y ajustar"
        ],
        "explanation": "La evaluación de comprensión permite revisar elecciones de producción."
      },
      {
        "type": "crossword",
        "prompt": "Completa conceptos de comunicación estratégica.",
        "entries": [
          {
            "word": "AUDIENCIA",
            "clue": "Destinatario cuyas necesidades orientan el mensaje."
          },
          {
            "word": "CANAL",
            "clue": "Medio elegido para comunicar."
          },
          {
            "word": "PROPOSITO",
            "clue": "Resultado de comprensión o acción que se busca."
          }
        ],
        "explanation": "Propósito, audiencia y canal explican por qué se crea un mensaje de cierta forma."
      }
    ],
    "references": [
      {
        "name": "Framework for Information Literacy for Higher Education",
        "title": "Framework for Information Literacy for Higher Education",
        "author": "ACRL",
        "url": "https://www.ala.org/acrl/standards/ilframework",
        "section": "Information Creation as a Process: Knowledge Practices",
        "purpose": "Comprender elección de formato, propósito y audiencia al crear un producto informacional."
      }
    ]
  },
  {
    "week": 15,
    "name": "Portafolio accesible: demostrar competencia y explicar decisiones",
    "objective": "Vincular evidencia, reflexión y accesibilidad en un producto de aprendizaje.",
    "label": "Simulación educativa · práctica",
    "context": "Conceptos clave\nUn portafolio de competencias conserva productos, criterios, reflexión y mejoras; no es solamente una carpeta. La trazabilidad permite recuperar evidencia. La justificación explica por qué se eligieron fuentes y qué límites tienen. Accesibilidad requiere contenido perceptible e interacción posible: una imagen significativa necesita alternativa equivalente y el foco de teclado debe ser visible. Calidad se comprueba mediante criterios y tareas, no solo apariencia.\n\nCaso breve\nUn estudiante universitario ficticio presenta un portafolio con fuentes completas, pero no explica su selección. Un gráfico comunica categorías solo con color, y la navegación pierde el foco visible. La portada es atractiva, aunque eso no elimina barreras ni demuestra el proceso de juicio. Necesita revisar contenido y modo de acceso.\n\nQué debes hacer\nIdentifica qué evidencia demuestra competencia y qué corrección permite participar. Conserva información esencial con alternativas y prueba la tarea sin depender del ratón. Añade razones y reflexión sobre cambios. Un comprobador automático puede ayudar, pero no sustituye todas las revisiones de uso y comprensión. El comité registra cambios al implementarlos y después los valida en tareas; la comprobación final fundamenta la reflexión.",
    "questions": [
      {
        "type": "choice",
        "prompt": "El portafolio contiene fuentes completas. ¿Qué añadido demuestra el juicio informacional?",
        "options": [
          "Razones de selección, límites y reflexión sobre el uso de evidencia.",
          "Una clasificación temática, considerándola equivalente a justificar elecciones.",
          "Un formato de referencia uniforme como prueba suficiente de reflexión."
        ],
        "correct": 0,
        "explanation": "La competencia se demuestra mediante razonamiento y uso, no acumulación de productos."
      },
      {
        "type": "choice",
        "prompt": "El gráfico comunica categorías solo por color. ¿Qué mejora conserva su propósito para distintos accesos?",
        "options": [
          "Una paleta con tonos más diferenciados, sin otra representación de categorías.",
          "Etiquetas y alternativa equivalente que transmitan significado y relaciones.",
          "Una descripción de colores que omita lo que significan las categorías."
        ],
        "correct": 1,
        "explanation": "La información debe ser perceptible por distintos medios; la alternativa conserva propósito y significado."
      },
      {
        "type": "matching",
        "prompt": "Relaciona criterio y evidencia.",
        "pairs": [
          {
            "left": "Trazabilidad",
            "right": "Fuente y localizador recuperables"
          },
          {
            "left": "Justificación",
            "right": "Razones de elección y límites"
          },
          {
            "left": "Accesibilidad",
            "right": "Contenido equivalente e interacción posible"
          },
          {
            "left": "Reflexión",
            "right": "Explicación de aprendizaje y mejoras"
          }
        ],
        "explanation": "Un portafolio articula producto, razonamiento, acceso y revisión."
      },
      {
        "type": "ordering",
        "prompt": "Sigue la ruta de revisión del comité, que implementa y registra cambios antes de validarlos.",
        "items": [
          "Definir criterios de competencia y acceso",
          "Examinar productos y tareas",
          "Identificar barreras y razones ausentes",
          "Corregir y documentar cambios",
          "Repetir pruebas y reflexionar sobre mejora"
        ],
        "explanation": "La corrección se comprueba y su razonamiento se incorpora como evidencia del aprendizaje."
      },
      {
        "type": "crossword",
        "prompt": "Completa términos de calidad y acceso.",
        "entries": [
          {
            "word": "EVIDENCIA",
            "clue": "Respaldo verificable de una competencia."
          },
          {
            "word": "FOCO",
            "clue": "Indicador visible de dónde actúa el teclado."
          },
          {
            "word": "REFLEXION",
            "clue": "Explicación del aprendizaje y decisiones del autor."
          }
        ],
        "explanation": "La calidad exige evidencia y reflexión, junto a interacción accesible."
      }
    ],
    "references": [
      {
        "name": "Understanding SC 1.1.1: Non-text Content",
        "title": "Understanding SC 1.1.1: Non-text Content",
        "author": "W3C Web Accessibility Initiative",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
        "section": "Intent; Benefits; Examples",
        "purpose": "Preparar alternativas que conservan el propósito del contenido no textual."
      },
      {
        "name": "Understanding SC 2.4.7: Focus Visible",
        "title": "Understanding SC 2.4.7: Focus Visible",
        "author": "W3C Web Accessibility Initiative",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html",
        "section": "Intent; Benefits",
        "purpose": "Examinar interacción por teclado y visibilidad del foco en un portafolio."
      }
    ]
  },
  {
    "week": 16,
    "name": "Desafío integral: una guía de verificación defendible",
    "objective": "Integrar modelos y competencias de las unidades en un producto académico responsable.",
    "label": "Simulación educativa · práctica",
    "context": "Conceptos clave\nUna tarea integral comienza con necesidad informacional y pregunta delimitada. La búsqueda estratégica combina conceptos y registra ajustes; la evaluación examina autoridad contextual, pertinencia y respaldo. El uso ético distingue voces, citas y permisos. La síntesis relaciona perspectivas y límites; comunicación y accesibilidad permiten comprender y revisar el producto. Big6 organiza la resolución, SCONUL orienta capacidades y ACRL/AMI aportan juicio conceptual y mediático.\n\nCaso breve\nUn equipo universitario ficticio debe crear una guía para verificar mensajes que circulan en su comunidad académica. Tiene una captura, documentos originales y un borrador generado con ayuda de IA. Necesita justificar fuentes, corregir atribuciones y ofrecer formatos accesibles. No dispone de evidencia para declarar que cualquier herramienta garantiza verdad.\n\nQué debes hacer\nIntegra las competencias en un procedimiento defendible. Selecciona conceptos y fuentes por propósito, contrasta afirmaciones y conserva incertidumbres. Redacta una explicación propia con atribución, declara apoyo de IA según política y comprueba acceso. La evaluación final revisa si producto y proceso responden a la necesidad y qué debería mejorarse.",
    "questions": [
      {
        "type": "choice",
        "prompt": "La guía utiliza originales y un borrador IA. ¿Qué decisión integra evaluación e integridad?",
        "options": [
          "Contrastar solo el borrador y considerar innecesario recuperar los documentos citados.",
          "Contrastar originales, distinguir voces y documentar uso y revisión de IA.",
          "Atribuir todo al equipo porque sintetizó materiales y revisó el estilo."
        ],
        "correct": 1,
        "explanation": "La tarea integral conecta evidencia, atribución y responsabilidad humana sobre lo entregado."
      },
      {
        "type": "choice",
        "prompt": "Antes de defender la guía, ¿qué revisión muestra la competencia integral?",
        "options": [
          "Confirmar que las etapas aparezcan nombradas, tomando la secuencia como garantía.",
          "Revisar solo presentación final porque el proceso ya terminó al recuperar fuentes.",
          "Comprobar propósito, respaldo, acceso y límites, y revisar aprendizajes del proceso."
        ],
        "correct": 2,
        "explanation": "La evaluación revisa utilidad, acceso y aprendizaje, sin garantizar lo que la evidencia no sostiene."
      },
      {
        "type": "matching",
        "prompt": "Relaciona competencia y aporte al producto final.",
        "pairs": [
          {
            "left": "Necesidad informacional",
            "right": "Orientar la pregunta y el propósito"
          },
          {
            "left": "Evaluación crítica",
            "right": "Justificar evidencia y autoridad contextual"
          },
          {
            "left": "Uso ético",
            "right": "Reconocer ideas y condiciones de uso"
          },
          {
            "left": "Síntesis accesible",
            "right": "Integrar conocimiento comprensible y revisable"
          }
        ],
        "explanation": "Las competencias se relacionan y ninguna etapa aislada completa el trabajo."
      },
      {
        "type": "ordering",
        "prompt": "Ordena el desafío integral.",
        "items": [
          "Delimitar necesidad y pregunta",
          "Diseñar búsqueda y recuperar originales",
          "Evaluar afirmaciones y perspectivas",
          "Sintetizar con atribución y acceso equivalente",
          "Revisar producto, proceso y pendientes"
        ],
        "explanation": "La integración mantiene la secuencia de resolución y el juicio crítico de las unidades."
      },
      {
        "type": "crossword",
        "prompt": "Completa términos del recorrido integral.",
        "entries": [
          {
            "word": "INDAGACION",
            "clue": "Proceso guiado por preguntas y evidencia."
          },
          {
            "word": "INTEGRIDAD",
            "clue": "Responsabilidad sobre autoría, apoyo y uso de información."
          },
          {
            "word": "SINTESIS",
            "clue": "Conexión argumentada de fuentes en conocimiento comunicable."
          }
        ],
        "explanation": "La integración culmina en un producto fundamentado y responsable."
      }
    ],
    "references": [
      {
        "name": "Framework for Information Literacy for Higher Education",
        "title": "Framework for Information Literacy for Higher Education",
        "author": "ACRL",
        "url": "https://www.ala.org/acrl/standards/ilframework",
        "section": "Research as Inquiry; Searching as Strategic Exploration; Information Has Value; Scholarship as Conversation",
        "purpose": "Integrar necesidad, búsqueda, evaluación, uso ético y síntesis en una recomendación académica."
      },
      {
        "name": "Media and information literacy curriculum for teachers",
        "title": "Media and information literacy curriculum for teachers",
        "author": "UNESCO",
        "url": "https://unesdoc.unesco.org/ark:/48223/pf0000192971",
        "section": "Marco curricular de competencias AMI",
        "purpose": "Integrar lectura crítica de medios y comunicación responsable en el producto final."
      }
    ]
  }
];

export const alfinCourse = { id: "gig-502", code: "GIG-502", name: "Alfabetización y Competencias Informacionales", teacher: syllabus.institution.teacher, description: syllabus.courses[0].description, weeks: syllabus.weeks.map(week => ({ ...week })), activities };
