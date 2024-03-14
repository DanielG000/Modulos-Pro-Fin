import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import profilePicture from "../../resources/icons/profilePicDefault.svg";

export default function ProfileInDashboard() {
  return (
    <React.Fragment>
      <CssBaseline />
      <br />
      <Container maxWidth="md">
        <Box sx={{ bgcolor: "#e3f2fd", height: "auto" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid container>
              <Grid item xs={1}>
                <Box sx={{ padding: "3px" }}>
                  <img
                    src={profilePicture}
                    alt="Imagen de perfil"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={10}>
                <Box sx={{ padding: "20px" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      <b>Daniel Felipe Cossio Marulanda</b>
                    </div>
                    <div>Ver logros</div>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant="contained"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  Mi perfil
                </Button>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
}
