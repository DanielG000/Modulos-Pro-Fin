INSERT INTO course (
    id,
    title,
    category_id,
    content_id,
    description
) VALUES (
    '4',
    'Finanzas Personales',
    '4',
    '4',
    'Aprenderas estrategias y habitos que mejoraran tu estabilidad financiera. Controlando mejor tus compras, gastos, ahorros e ingresos.'
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
    10,
    '10',
    '',
    'Videos Recomendados',
    '',
    '',
    '',
    '',
    '',
    '',
    '<div>
        <h3>El siguiente contenido pertenece a <a src="https://www.youtube.com/@MisPropiasFinanzas">Mis Propias Finanzas<a></h3>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/HTeJUNJtThI?si=Hcvhff-pEVhpkWAL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <h3>El siguiente contenido pertenece a <a src="https://www.youtube.com/@preahorro517">PreAhorro<a></h3>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/NtZI7oSJgZ0?si=2I2KKeuSzYILCJJX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>',
    '',
    '',
    '',
    '',
    '',
    '',
    '4'
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
    11,
    '11',
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
    '4'
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
    12,
    '12',
    'comp',
    'Simulador de Finanzas',
    'Desarrollar planes o estrategias para incrementar tus ahorros o encontrar un balance entre ingresos y egresos.',
    '',
    '',
    'Este simulador te permitira tener un vista diferente sobre tus finanzas. ayudandote a ver la importancia de la toma de decisiones sobre las finanzas personales.',
    '',
    'Basado el las cuentas, inversiones, deuda. Tambien teniendo en cuenta los ahorros o elecciones en compras o suscripciones.',
    '',
    '',
    '',
    '',
    '',
    '',
    '/activity/SimuladorFinanzas',
    '4'
);