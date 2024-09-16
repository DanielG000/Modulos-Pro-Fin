INSERT INTO course (
  "content_id",
  "title",
  "category_id",
  "description",
  "id" 
) VALUES (
'1', 
'Trabajo en equipo', 
'1', 
'En este curso aprenderás a comunicarte con tus compañeros, establecer roles, delegar tareas, tomar decisiones, manejar conflictos, motivar e inspirar al equipo, celebrar los éxitos y aprender de los errores. Dirigido a personas que buscan mejorar sus habilidades de trabajo en equipo, profesionales que quieren ascender en su carrera, emprendedores que quieren hacer crecer su negocio y estudiantes que quieren tener éxito en sus estudios.', 
'1'
);


INSERT INTO activity (
    "activity_id",
    "course_id",
    "content_type",
    "title",
    "objective",
    "metodology",
    "resources",
    "introduction",
    "analisis",
    "evaluation",
    "example",
    "question1",
    "question2",
    "question3",
    "question4",
    "question5",
    "path",
    "id"
  )
VALUES (
    '1',
    '1',
    'text',
    'Sinergia en el equipo',
    'Desarrollar las habilidades de análisis, toma de decisiones, comunicación y trabajo en equipo para lograr la sinergia y el éxito del equipo.',
    'Estudio de casos y elección estratégica',
    'Descripción de la situación conflictiva del equipo hipotético, presentación de diferentes escenarios con sus posibles consecuencias, y plantilla para evaluar las opciones y tomar una decisión estratégica.',
    'Se presenta al participante o equipo la situación conflictiva del equipo hipotético, describiendo los personajes, sus roles, el problema central y las tensiones existentes.
Se explica el objetivo de la actividad: analizar las opciones disponibles, evaluar sus consecuencias y elegir la estrategia más adecuada para lograr la sinergia y el éxito del equipo.',
    'El participante o equipo debe analizar en detalle la situación conflictiva, identificando las causas del problema, las necesidades y motivaciones de los personajes, y los posibles obstáculos para la colaboración.
Se alienta al participante o equipo a reflexionar sobre las razones de su elección estratégica, las habilidades y valores que se requieren para el éxito del equipo, y las lecciones aprendidas de la actividad.
Si la actividad se realiza en grupo, se fomenta el debate y la argumentación para defender las diferentes perspectivas y llegar a un consenso sobre la mejor estrategia',
    'Se presentan al participante o equipo diferentes escenarios que representan posibles soluciones al problema, cada escenario describe las acciones que se deben tomar, las reacciones probables de los personajes y las consecuencias a corto y largo plazo. 
El participante o equipo debe evaluar cuidadosamente cada escenario, considerando las ventajas y desventajas de cada opción, las posibles consecuencias y su impacto en la sinergia del equipo.
Se debe utilizar la plantilla proporcionada para analizar las opciones de forma sistemática, ponderando los diferentes factores y seleccionando la estrategia más adecuada.',
    '<div>
                    <h3>Equipo de desarrollo de software</h3>
                    Personajes
                    <ul>
                      <li>
                        <strong>Ana:</strong> Programadora experimentada, muy
                        técnica y orientada a los resultados.
                      </li>
                      <li>
                        <strong>Bruno:</strong> Diseñador gráfico creativo, con
                        poca experiencia en desarrollo de software.
                      </li>
                      <li>
                        <strong>Camila:</strong> Ingeniera de software junior,
                        entusiasta y dispuesta a aprender.
                      </li>
                      <li>
                        <strong>Daniel:</strong> Tester meticuloso, muy crítico
                        con el trabajo de los demás.
                      </li>
                    </ul>
                    Situación conflictiva
                    <p>
                      El equipo se encuentra trabajando en un proyecto
                      importante, pero hay mucha tensión entre sus miembros:
                    </p>
                    <ul>
                      <li>
                        Ana y Bruno no se ponen de acuerdo sobre el diseño de la
                        interfaz del usuario.
                      </li>
                      <li>
                        Camila se siente excluida por Ana y Bruno, quienes no
                        valoran sus ideas.
                      </li>
                      <li>
                        Daniel critica constantemente el trabajo de Ana, lo que
                        genera un ambiente hostil.
                      </li>
                    </ul>
                    <div
                      style={{
                        height: "auto",
                        width: "auto",
                        textAlign: "left",
                        border: "1px solid black",
                        borderRadius: "5px",
                      }}
                    >
                      <table>
                        <tr>
                          <th>Factor</th>
                          <td>Escenario 1</td>
                          <td>Escenario 2</td>
                          <td>Escenario 3</td>
                          <td>Escenario 4</td>
                        </tr>
                        <tr>
                          <th>Eficiencia</th>
                          <td>Alta</td>
                          <td>Media</td>
                          <td>Alta</td>
                          <td>Media</td>
                        </tr>
                        <tr>
                          <th>Calidad del producto</th>
                          <td>Media</td>
                          <td>Alta</td>
                          <td>Alta</td>
                          <td>Alta</td>
                        </tr>
                        <tr>
                          <th>Satisfacción del equipo</th>
                          <td>Baja</td>
                          <td>Alta</td>
                          <td>Media</td>
                          <td>Alta</td>
                        </tr>
                        <tr>
                          <th>Costo</th>
                          <td>Bajo</td>
                          <td>Bajo</td>
                          <td>Medio</td>
                          <td>Alto</td>
                        </tr>
                        <tr>
                          <th>Tiempo</th>
                          <td>Rápido</td>
                          <td>Medio</td>
                          <td>Medio</td>
                          <td>Medio</td>
                        </tr>
                      </table>
                    </div>
                  </div>',
    '¿Qué factores fueron los más importantes para tomar la decisión?',
    '¿Qué habilidades y valores son esenciales para la sinergia del equipo?',
    '¿Qué lecciones aprendieron de la actividad?',
    '',
    '',
    '',
    '1'
  );


INSERT INTO activity (
    "activity_id",
    "course_id",
    "content_type",
    "title",
    "objective",
    "metodology",
    "resources",
    "introduction",
    "analisis",
    "evaluation",
    "example",
    "question1",
    "question2",
    "question3",
    "question4",
    "question5",
    "path",
    "id"
  )
VALUES (
    '2',
    '1',
    'text',
    'Análisis de un escenario de trabajo en equipo en el mundo real',
    'Desarrollar las habilidades de análisis, pensamiento crítico, comunicación y trabajo en equipo para identificar problemas y soluciones potenciales en un escenario real.',
    'Estudio de caso y análisis grupal',
    'Descripción detallada del escenario de trabajo en equipo en el mundo real, guía de preguntas para el análisis del caso y pizarra o rotafolio para tomar notas y marcadores o bolígrafos.
',
    'Se presenta al equipo el escenario de trabajo en equipo en el mundo real, describiendo el contexto, los personajes, sus roles, el problema central y las tensiones existentes.
Se explica el objetivo de la actividad: analizar el caso en profundidad, identificar los problemas y las posibles soluciones, y desarrollar un plan de acción para mejorar la situación.
',
    'El equipo lee y analiza cuidadosamente la descripción del escenario, respondiendo las preguntas de la guía y tomando notas relevantes.
El equipo identifica los problemas principales que afectan al trabajo en equipo en el escenario, utilizando la información recopilada.
Se pueden clasificar los problemas por categorías, como comunicación, liderazgo, motivación, organización o toma de decisiones.',
    'Para cada problema identificado, el equipo propone soluciones potenciales, considerando las necesidades y recursos disponibles.
Se pueden utilizar técnicas de creatividad para generar ideas innovadoras y soluciones prácticas.
El equipo evalúa las soluciones propuestas, considerando su viabilidad, impacto potencial y posibles riesgos.
Se seleccionan las soluciones más adecuadas para el contexto del escenario y se define un plan de acción para implementarlas.
',
    '<div>
        <h3>Un equipo de marketing:</h3>
        <p>El equipo está compuesto por 5 personas con diferentes habilidades y personalidades:</p>
        <ul>
            <li>Mariana: Gerente de marketing, con experiencia en liderazgo y estrategia.</li>
            <li>Juan: Diseñador gráfico creativo, con poca experiencia en marketing digital.</li>
            <li>Camila: Redactora de contenido, entusiasta y dispuesta a aprender.</li>
            <li>Daniel: Analista de datos, meticuloso y orientado a los resultados.</li>
            <li>Sofía: Community manager, extrovertida y con gran capacidad de interacción.</li>
        </ul>
        <p>El equipo tiene como objetivo lanzar una nueva campaña de marketing para un producto innovador.</p>
        <p>Sin embargo, hay algunos problemas que afectan al trabajo en equipo:</p>
        <ol>
            <li>Falta de comunicación clara: Los miembros del equipo no comparten información de manera efectiva, lo que genera confusiones y retrasos.</li>
            <li>Diferencias de opinión: Hay desacuerdos sobre la estrategia de marketing y el diseño de la campaña.</li>
            <li>Falta de liderazgo: Mariana no está delegando tareas de manera efectiva, lo que genera desmotivación en el equipo.</li>
        </ol>
    </div>',
    '¿Cuáles son los objetivos del equipo de marketing?',
    '¿Cuáles son los roles y responsabilidades de cada miembro del equipo?',
    '¿Qué problemas están afectando al trabajo en equipo y cuales son sus causas?',
    '¿Qué soluciones se pueden proponer para mejorar la situación?',
    '¿Qué recursos se necesitan para implementar las soluciones y cómo se puede evaluar el éxito de las soluciones?',
    '',
    '2'
  );

INSERT INTO activity (
    "activity_id",
    "course_id",
    "content_type",
    "title",
    "objective",
    "metodology",
    "resources",
    "introduction",
    "analisis",
    "evaluation",
    "example",
    "question1",
    "question2",
    "question3",
    "question4",
    "question5",
    "path",
    "id"
  )
VALUES (
    '6',
    '1',
    'comp',
    'Mapa mental colaborativo',
    'Colaborar en un mapa mental público sobre un tema a elección relacionado al curso, utilizando una herramienta online como draw.io ',
    'Los estudiantes deben ingeniearselas para desarrollar su tema, añadiendo subtemas, ideas y ejemplos al diagrama público, respetando y colaborando con los demás compañeros que ya han aportado al mapa.

Al final, las pequeñas partes del diagrama se combinan entre sus categorías para crear un mapa mental completo.
',
    'Se proporciona acceso al diagrama público del curso para que el estudiante pueda añadir sus ideas y tomar evidencias de sus modificaciones para así incluirlas en el entregable de la actividad.',
    'A continuación se presenta el diagrama público en el cual podrás incluir los aportes que tengas del tema o subtema elegido. 

Para poder acceder al menú de edición debes autenticarte con tu cuenta de Google.',
    '',
    'El estudiante debe colaborar en el diagrama público proporcionado, añadiendo un subtema o ayudando a desarrollar otros. Se evalua la calidad de los aportes, desde lo argumentativo e investigativo, hasta el estilo y distribución.',
    '',
    '',
    '',
    '',
    '',
    '',
    '/activity/mentalmap',
    '6'
  );

INSERT INTO activity (
    "activity_id",
    "course_id",
    "content_type",
    "title",
    "objective",
    "metodology",
    "resources",
    "introduction",
    "analisis",
    "evaluation",
    "example",
    "question1",
    "question2",
    "question3",
    "question4",
    "question5",
    "path",
    "id"
  )
VALUES (
    '7',
    '1',
    'comp',
    'Debate virtual: Defiende tu postura',
    'A partir de un tema controversial a elección el estudiante deberá defender una postura que tome respecto a diferentes perspectivas que pueda tener, no importa si es bueno o malo a interpretación, lo importante es generar los argumentos sólidos para poder debatir del tema con un compañero.',
    'Estudio de casos, análisis general, elección de postura.',
    'Se proporcionarán temas y posturas de ejemplo para que el estudiante tenga una referencia de como elegir su tema, argumentar y debatir.',
    '',
    '',
    ' <div>
 <span>A continuación se presenta la estructura esperada de la información usada para debatir:</span>
    <h5>Introducción:</h5>
    <ul>
        <li>Comienza presentando tu postura de manera clara y concisa.</li>
        <li>Indica brevemente cuáles serán tus principales argumentos en apoyo a esa postura.</li>
    </ul>

    <h5>Desarrollo:</h5>
    <ul>
        <li>Presenta cada argumento individualmente, enfocándote en un aspecto específico del tema en discusión.</li>
        <li>Proporciona evidencia, datos o ejemplos concretos para respaldar cada argumento.</li>
        <li>Utiliza un lenguaje persuasivo y convincente para hacer que tus puntos de vista sean claros y comprensibles.</li>
        <li>Si es necesario, refuta posibles argumentos en contra de tu postura.</li>
    </ul>

    <h5>Conclusión:</h5>
    <ul>
        <li>Recapitula brevemente tus argumentos principales.</li>
        <li>Reafirma tu postura y por qué crees que es la más sólida o válida.</li>
        <li>Termina con una declaración contundente que refuerce tu posición en el debate.</li>
    </ul>

</div>',
    '<div>
    <h4>Tema: El impacto de las redes sociales en la salud mental</h4>

    <h5>Postura 1: Las redes sociales tienen un impacto negativo en la salud mental.</h5>

    <ul>
    <li>Las redes sociales pueden provocar un aumento de la ansiedad, la depresión y la soledad debido a la comparación social y los estándares de belleza irreales.</li>
    <li>La exposición constante a noticias y eventos negativos puede contribuir al estrés y la ansiedad.</li>
    <li>El ciberacoso y el hostigamiento en línea pueden tener un impacto devastador en el bienestar mental.</li>
    </ul>

    <h5>Postura 2: Las redes sociales pueden tener un impacto positivo en la salud mental.</h5>

    <ul>
    <li>Las redes sociales pueden proporcionar un sentido de conexión y pertenencia, especialmente para aquellos que pueden sentirse aislados o solos.</li>
    <li>Pueden ser una plataforma para la autoexpresión, la creatividad y la búsqueda de grupos de apoyo para diversos problemas.</li>
    <li>Las redes sociales se pueden utilizar para promover la conciencia y los recursos de salud mental.</li>
    </ul>
</div>',
    '',
    '',
    '',
    '',
    '',
    '/activity/debate',
    '7'
  );

INSERT INTO activity (
    "activity_id",
    "course_id",
    "content_type",
    "title",
    "objective",
    "metodology",
    "resources",
    "introduction",
    "analisis",
    "evaluation",
    "example",
    "question1",
    "question2",
    "question3",
    "question4",
    "question5",
    "path",
    "id"
  )
VALUES (
    '8',
    '1',
    'comp',
    'Sinergia Climática: Fortaleciendo Equipos a través del Aprendizaje Jigsaw',
    'Fomentar el trabajo en equipo y la colaboración interdisciplinaria para una comprensión integral del cambio climático, utilizando la técnica de aprendizaje Jigsaw.',
    'Distribución de contenidos, investigación, análisis, contexto global, metodología JigSaw',
    'Descripción detallada del escenario enfocada en el cambio climático, herramientas de investigación, comunicación y colaboración en línea.',
    'El cambio climático es un desafío global que requiere una respuesta colectiva. 
Esta actividad busca no solo educar sobre el tema, sino también mejorar las habilidades de trabajo en equipo de los participantes.',
    'Se examinará cómo el cambio climático afecta diversos aspectos de nuestro mundo y la importancia de la colaboración para abordar estos retos desde multiples perspectivas.',
    'Los equipos evaluarán diferentes escenarios de cambio climático y discutirán cómo la cooperación puede mejorar los resultados.',
    'Un equipo multidisciplinario colabora en una propuesta para una campaña de concienciación sobre el reciclaje y la reducción de residuos.',
    '',
    '',
    '',
    '',
    '',
    '/activity/jigsaw',
    '8'
  );