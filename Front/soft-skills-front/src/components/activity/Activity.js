import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "../responsiveappbar/ResponsiveAppBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import DOMPurify from "dompurify";

export default function Activity() {
  const { id } = useParams();
  const activityId = id;
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/activity/${activityId}`)
      .then((response) => {
        setActivity(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los detalles de la actividad:", error);
      });
  }, [activityId]);

  if (!activity) {
    return <div>Cargando...</div>;
  }

  const activityExample = DOMPurify.sanitize(activity.example);

  return (
    <>
      <ResponsiveAppBar />
      <br />
      <Grid
        container
        spacing={2}
        style={{ padding: "10vh", height: "90vh", paddingLeft: "200px" }}
      >
        <Grid xs={12}>
          <Stack spacing={2}>
            <div>
              <Grid container spacing={4} style={{ padding: "5vh" }}>
                <Grid xs={8}>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                      {activity.title}
                    </h1>
                    {activity.objective && (
                      <>
                        <h3>Objetivo</h3>
                        {activity.objective}
                      </>
                    )}
                    {activity.metodology && (
                      <>
                        <h3>Metodología</h3>
                        {activity.metodology}
                      </>
                    )}
                    {activity.resources && (
                      <>
                        <h3>Recursos</h3>
                        {activity.resources}
                      </>
                    )}
                    {activity.introduction && (
                      <>
                        <h3>Introducción</h3>
                        {activity.introduction}
                      </>
                    )}
                    {activity.analisis && (
                      <>
                        <h3>Análisis de la situación</h3>
                        {activity.analisis}
                      </>
                    )}
                    {activity.evaluation && (
                      <>
                        <h3>Evaluación de escenarios</h3>
                        {activity.evaluation}
                      </>
                    )}
                    {activity.question1 && (
                      <>
                        <h3>Preguntas</h3>
                        <ul>
                          {activity.question1 && <li>{activity.question1}</li>}
                          {activity.question2 && <li>{activity.question2}</li>}
                          {activity.question3 && <li>{activity.question3}</li>}
                          {activity.question4 && <li>{activity.question4}</li>}
                          {activity.question5 && <li>{activity.question5}</li>}
                        </ul>
                      </>
                    )}
                  </div>
                </Grid>
                {activityExample && (
                  <div>
                    <h2>Actividad</h2>{" "}
                    <p className="max-w-prose text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                      <div
                        dangerouslySetInnerHTML={{ __html: activityExample }}
                      />
                    </p>
                  </div>
                )}
              </Grid>
            </div>
          </Stack>
        </Grid>
      </Grid>
      <br />
      <br />
    </>
  );
}
