import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ResponsiveAppBar from "../responsiveappbar/ResponsiveAppBar";
import Stack from "@mui/material/Stack";
import { MdOutlinePlayArrow } from "react-icons/md";
import Comments from "../comments/Comments";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CardActions from "@mui/material/CardActions";

export default function Jigsaw() {
  const { id } = useParams();
  const courseId = id;
  const [course, setCourse] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/courses/${courseId}`)
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los detalles del curso:", error);
      });

    axios
      .get(`http://127.0.0.1:8000/activity/course/${courseId}`)
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las actividades:", error);
      });
  }, [courseId]);

  if (!course) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <ResponsiveAppBar />
      <br />
      <Grid container spacing={4} style={{ padding: "10vh", height: "90vh" }}>
        <Grid xs={8}>
          <Stack spacing={2}>
            <div>
              {" "}
              <Grid container spacing={4} style={{ padding: "5vh" }}>
                <Grid xs={8}>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                      {course.title}
                    </h1>
                  </div>
                </Grid>
                <Grid
                  xs={4}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                ></Grid>
              </Grid>
              <div>
                {" "}
                <p className="max-w-prose text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  {course.description}
                </p>
              </div>
            </div>
            {/* Display fetched activities */}
            <div className="grid gap-4 border-t border-b border-gray-200 py-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <h3 className="font-bold">
                    <CardActions>
                      <Link to={`/activity/${activity.id}`}>
                        <MdOutlinePlayArrow className="w-4 h-4 text-gray-500" />{" "}
                        {activity.title}
                      </Link>
                    </CardActions>
                  </h3>
                </div>
              ))}
            </div>
          </Stack>
        </Grid>

        <Grid xs={4} style={{ padding: "10px" }}>
          <br />
          <div className="flex flex-col gap-4 min-[300px]:sticky top-16 lg:items-start lg:justify-start">
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                  overflow: "hidden",
                  maxWidth: "100%",
                  borderRadius: "10px",
                }}
              >
                <iframe
                  title="Course Video"
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/cJUXxjOeoCk"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>

            <br></br>
            <Comments />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
