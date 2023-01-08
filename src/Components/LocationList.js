import { Grid } from "@mui/material";
import "../App.css";
import Card from "./LocationCard";
import { useState } from "react";
import MapLocations from "./MapLocations";

const locations = [
  {
    //isl
    city: "Islamabad",
    longitude: 73.047882,
    latitude: 33.684422,
  },
  {
    //london
    city: "London",
    longitude: 0.127758,
    latitude: 51.507351,
  },
  {
    //isl
    city: "Islamabad",
    longitude: 73.047882,
    latitude: 33.684422,
  },
  {
    //london
    city: "London",
    longitude: 0.127758,
    latitude: 51.507351,
  },
  {
    //isl
    city: "Islamabad",
    longitude: 73.047882,
    latitude: 33.684422,
  },
  {
    //london
    city: "London",
    longitude: 0.127758,
    latitude: 51.507351,
  },
];


export default function LocationList() {
  const [filename, setfilename] = useState("images/0.12775851.507351.jpg");
  const choosefilename = (fil) => {
    setfilename(fil);
  };
  return (
    <Grid container style={{paddingTop:"10px", overflow:"hidden"}}>
      <Grid item xs={3}>
        <div
          style={{
            float: "left",
            padding: "10px",
            background: "white",
            height: "600px",
            overflow: "hidden",
            overflowY: "scroll",
            backgroundColor: "rgb(105,105,105)",
          }}
        >
          <Grid container spacing={2} marginTop={1}>
            {locations.map((post) => (
              <Grid item xs={12} md={12} lg={12}>
                <Card
                  City={post.city}
                  Longitude={post.longitude}
                  Latitude={post.latitude}
                  choosefilename = {choosefilename}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Grid>
      <Grid item xs={9}>
        <div style={{height:"100%", overflow:"hidden", borderColor:"white", borderWidth:"10px"}}>
          <MapLocations/>
        </div>
      </Grid>
    </Grid>
  );
}
