-- Hay que pedirlo a el compañero Daniel Cossio --
INSERT INTO course (
  "content_id", 
  "title", 
  "category_id", 
  "description", 
  "id"
) VALUES (
'2', 
'Liderazgo', 
'2', 
'Desarrolla habilidades efectivas de liderazgo para potenciar tu influencia, motivar equipos y alcanzar el éxito en cualquier entorno. Aprende estrategias prácticas y técnicas probadas para liderar con claridad, inspirar confianza y promover un cambio positivo en tu organización y comunidad.', 
'2'
);

INSERT INTO "public"."activity" (
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
    '3',
    '2',
    'text',
    'Analizando el Liderazgo en Videos Inspiradores',
    'Identificar y reflexionar sobre las cualidades de liderazgo observadas en videos de personas destacadas.',
    'Selección, visualización y estudio de escenarios',
    'Lista de videos',
    '',
    'Los estudiantes deben ver los videos preferiblemente de manera individual, mientras lo hacen, deben prestar atención a las acciones, palabras y comportamientos del líder.',
    'Después de ver cada video, los estudiantes deben anotar las cualidades de liderazgo que observaron.',
    '',
    '¿Cómo se comunica el líder con su equipo o audiencia?',
    '¿Qué valores o principios defiende?',
    '¿Cómo maneja situaciones difíciles o conflictos?',
    '¿Cómo inspira y motiva a los demás?',
    '¿Qué aprendieron de ese líder y qué cualidades les gustaría desarrollar en sí mismos?',
    '',
    '3'
  );
INSERT INTO "public"."activity" (
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
    '4',
    '2',
    'text',
    'Analizando la Falta de Liderazgo',
    'Identificar las cualidades que no hacen a una persona un buen líder, basándose en un video de alguien que no evidencia liderazgo efectivo.',
    'Selección, visualización y estudio de escenarios',
    'Lista de videos',
    '',
    'Busca un video en el que la persona no demuestre habilidades de liderazgo o muestre comportamientos contraproducentes. (Debe dejar los links en las respuestas)
Puede ser una entrevista, una presentación o cualquier otro contexto en el que se pueda evaluar el liderazgo.
',
    'Después de ver el video, los estudiantes deben anotar las cualidades que observaron y que no contribuyen a un buen liderazgo.',
    '',
    '¿Cómo se comunica la persona con su equipo o audiencia?',
    '¿Qué valores o principios parece ignorar?',
    '¿Cómo maneja situaciones difíciles o conflictos de manera ineficiente?',
    '¿Qué lecciones pueden extraer para su propio desarrollo de liderazgo?',
    '',
    '',
    '4'
  );

INSERT INTO "public"."activity" (
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
    '5',
    '2',
    'text',
    'Liderazgo y asignación de responsabilidades',
    'Desarrollar la capacidad de un líder para evaluar las habilidades de su equipo, asignar responsabilidades de forma efectiva y tomar decisiones estratégicas para lograr los objetivos en un tiempo limitado.',
    'Simulación individual y toma de decisiones',
    'Descripción del contexto de la tarea y los objetivos del equipo, perfiles de los integrantes del equipo, incluyendo sus habilidades, experiencia y preferencias, lista de responsabilidades a asignar, plantilla para la evaluación de las opciones.',
    '',
    'Lee cuidadosamente la descripción del contexto de la tarea y los objetivos del equipo.
Analiza los perfiles de los integrantes del equipo, identificando sus habilidades, experiencia y preferencias.
Revisa la lista de responsabilidades a asignar y comprende las características de cada una.
',
    'Asume el rol de líder del equipo, toma decisiones estratégicas sobre la asignación de responsabilidades a cada integrante del equipo, considera las habilidades, experiencia y preferencias de cada miembro al asignar las responsabilidades, utiliza la plantilla para evaluar las opciones y tomar decisiones informadas, y justifica tus decisiones y explica cómo cada asignación contribuye al logro de los objetivos del equipo.
',
    '',
    '¿Qué factores fueron los más importantes para la asignación de responsabilidades?',
    '¿Qué aprendiste sobre tu capacidad de liderazgo y toma de decisiones?',
    '¿Cómo puedes mejorar tu capacidad para delegar y asignar responsabilidades de forma efectiva?',
    '',
    '',
    '',
    '5'
  );