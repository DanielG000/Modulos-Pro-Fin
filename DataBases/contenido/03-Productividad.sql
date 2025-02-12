INSERT INTO course (
    id,
    title,
    category_id,
    content_id,
    description
) VALUES (
    '3',
    'Organización y Productividad',
    '3',
    '3',
    'Aprenderas tecnicas y estrategias para mejorar tu organización y concentración. Todo para que lo apliques en tus actividades cotidianas.'
);

INSERT INTO activity (
    id,
    activity_id,
    content_type,
    title,
    objective,
    metodology,
    resources,
    introduction,
    analisis,
    evaluation,
    example,
    question1,
    question2,
    question3,
    question4,
    question5,
    path,
    course_id
) VALUES (
    7,
    '7',
    'text',
    'Videos Recomendados',
    '',
    '',
    '',
    '',
    '',
    '',
    '<div>
        <h3>El siguiente contenido pertenece a <a src="https://www.youtube.com/@carlosreyesf19">Carlos Reyes - Estudio y Productividad<a></h3>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/TpfjkBxAECs?si=bJRIXz6hi6pcOkhj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/8DfYQtZTsnU?si=J5B6ARyxgA0vZB6F" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <h3>El siguiente contenido pertenece a <a src="https://www.youtube.com/@ResumenAnimado">Resumen Animado<a></h3>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/LHtUrHUPs4E?si=ou53ZAxJ67cJZc_5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>',
    '',
    '',
    '',
    '',
    '',
    '',
    '3'
);

INSERT INTO activity (
    id,
    activity_id,
    content_type,
    title,
    objective,
    metodology,
    resources,
    introduction,
    analisis,
    evaluation,
    example,
    question1,
    question2,
    question3,
    question4,
    question5,
    path,
    course_id
) VALUES (
    8,
    '8',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '3'
);

INSERT INTO activity (
    id,
    activity_id,
    content_type,
    title,
    objective,
    metodology,
    resources,
    introduction,
    analisis,
    evaluation,
    example,
    question1,
    question2,
    question3,
    question4,
    question5,
    path,
    course_id
) VALUES (
    9,
    '9',
    'comp',
    'Serpiente Eisenhower',
    'Alcanzar el mayor puntaje posible en cada nivel.',
    'Organizacion y concentración.',
    '',
    'Este juego de la serpiente tienes caracteristicas nuevas, es posible que por su nombre ya tengas una idea de como ganar.',
    '',
    'Segun la cantidad de intentos y tu puntaje, se decidira tu calificación.',
    '',
    '',
    '',
    '',
    '',
    '',
    '/activity/SerpienteEisenhower',
    '3'
);