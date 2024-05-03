import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "../responsiveappbar/ResponsiveAppBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import DOMPurify from "dompurify";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function Activity() {
  const { id } = useParams();
  const activityId = id;
  const [activity, setActivity] = useState(null);
  const [answers, setAnswers] = useState({
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    answer5: "",
  });

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

  const handleChange = (e, question) => {
    setAnswers({ ...answers, [question]: e.target.value });
  };

  const handleSubmit = () => {
    // Aquí puedes enviar las respuestas a la base de datos
    console.log("Respuestas enviadas:", answers);
  };

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
                  </div>
                </Grid>
                {activityExample && (
                  <div>
                    <h2>Actividad</h2>{" "}
                    <span className="max-w-prose text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                      <div
                        dangerouslySetInnerHTML={{ __html: activityExample }}
                      />
                    </span>
                  </div>
                )}
              </Grid>
              {activity.question1 && (
                <>
                  <h3>Preguntas</h3>
                  <ul>
                    {activity.question1 && (
                      <li>
                        {activity.question1}{" "}
                        <TextField
                          id="answer1"
                          label="Respuesta 1"
                          value={answers.answer1}
                          onChange={(e) => handleChange(e, "answer1")}
                          variant="outlined"
                          fullWidth
                          disabled={answers.answer1 !== ""}
                        />
                      </li>
                    )}
                    {activity.question2 && (
                      <li>
                        {activity.question2}{" "}
                        <TextField
                          id="answer2"
                          label="Respuesta 2"
                          value={answers.answer2}
                          onChange={(e) => handleChange(e, "answer2")}
                          variant="outlined"
                          fullWidth
                          disabled={answers.answer2 !== ""}
                        />{" "}
                      </li>
                    )}
                    {activity.question3 && (
                      <li>
                        {activity.question3}
                        <TextField
                          id="answer3"
                          label="Respuesta 3"
                          value={answers.answer3}
                          onChange={(e) => handleChange(e, "answer3")}
                          variant="outlined"
                          fullWidth
                          disabled={answers.answer3 !== ""}
                        />
                      </li>
                    )}
                    {activity.question4 && (
                      <li>
                        {activity.question4}
                        <TextField
                          id="answer4"
                          label="Respuesta 4"
                          value={answers.answer4}
                          onChange={(e) => handleChange(e, "answer4")}
                          variant="outlined"
                          fullWidth
                          disabled={answers.answer4 !== ""}
                        />
                      </li>
                    )}
                    {activity.question5 && (
                      <li>
                        {activity.question5}
                        <TextField
                          id="answer5"
                          label="Respuesta 5"
                          value={answers.answer5}
                          onChange={(e) => handleChange(e, "answer5")}
                          variant="outlined"
                          fullWidth
                          disabled={answers.answer5 !== ""}
                        />
                      </li>
                    )}
                  </ul>
                </>
              )}
              <br />
              <br />
              {activity.question1 && (
                <>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ width: "100%" }}
                    onClick={handleSubmit}
                  >
                    Finalizar
                  </Button>
                </>
              )}
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </Stack>
        </Grid>
      </Grid>
      <br />
      <br />
    </>
  );
}
