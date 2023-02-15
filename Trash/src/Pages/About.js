import React from "react";
import Navbar from "../Components/Navbar";
import { Grid, Typography, Paper } from "@mui/material";
import Img from "../Imgs/aboutus.jpg";

export default function About() {
  return (
    <div>
      <Navbar />      
      <Grid container paddingTop={"120px"}>
        <Grid item xs={4}>
        <Typography
              variant="h4"
              style={{ paddingTop: "20px", padding: "10px" }}
            >
              About us
            </Typography>
          <Typography variant="h6"style={{ padding: "10px" }}>
            This is the Final Year Project developed by Ahmad Ali, Faiez
            Malik and Syed Abubakr. 
          </Typography>
          <Typography variant="h6"style={{paddingTop: "0", padding: "10px" }}>
            The app provides the service of making the process of trash detection automated by using technologies like machine learning, Blockchain etc.
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <center>
            <img
              src={Img}
              style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "fill" }}
            />            
          </center>
        </Grid>
      </Grid>
    </div>
  );
}
