import React from "react";
import Navbar from "../Components/Navbar";
import { Typography, Grid } from "@mui/material";

export default function Home() {

  return (
    <div>
      <Navbar />
      <center>
        <Typography
          variant="h1"
          style={{ paddingTop: "100px", padding: "10px" }}
        >
          CleanBloq
        </Typography>
        <Grid container>
          <Grid item xs={4}>
            <div className="count" style={{ paddingTop: "50px" }}>
              69
            </div>
            <Typography variant="h5">Detections made</Typography>
          </Grid>
          <Grid item xs={4}>
            <div className="countResolved" style={{ paddingTop: "50px" }}>
              60
            </div>
            <Typography variant="h5">Resolved</Typography>
          </Grid>
          <Grid item xs={4}>
            <div className="countUnResolved" style={{ paddingTop: "50px" }}>
              9
            </div>
            <Typography variant="h5">Unresolved</Typography>
          </Grid>
        </Grid>
      </center>
    </div>
  );
}
