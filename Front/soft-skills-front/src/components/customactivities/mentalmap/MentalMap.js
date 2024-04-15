import React from "react";
import Grid from "@mui/material/Grid";
import ResponsiveAppBar from "../../responsiveappbar/ResponsiveAppBar";
import Stack from "@mui/material/Stack";

export default function MentalMap() {
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
                      Titulo
                    </h1>
                    <h3>Objetivo</h3>
                    obvjetivo..as.dasdikhna
                    <h3>Metodología</h3>
                    metodologíajasoldubas
                    <h3>Recursos</h3>recursosdsadljoksbn
                    <h3>Introducción</h3>
                    introskdjbasi
                    <h3>Análisis de la situación</h3>
                    analisiadosihdn
                    <h3>Evaluación de escenarios</h3>
                    asdasda
                    <h3>Preguntas</h3>
                    <ul>
                      <li>preguntasoujdbhaioud</li>
                      <li>preguntasoujdbhaioud</li>
                    </ul>
                    <div></div>
                    <div>
                      <iframe
                        style={{ width: "100%", height: "234px" }}
                        src="https://www.willyoupressthebutton.com/"
                        title="Mental Map Diagram"
                      ></iframe>
                    </div>
                  </div>
                </Grid>
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
