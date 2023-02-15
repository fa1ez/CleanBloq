import React from "react";
import Aos from "aos";
import { useEffect } from "react";
import { Grid } from "@mui/material";

export default function ResolvedCards({ chartData, unresolvedData }) {
  function countResolved() {
    let count = [0, 0];
    count[0]=chartData.length
    count[1]=unresolvedData.length
    return count;
  }
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <Grid container>
      <Grid item xs={4}>
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          style={{
            background: "linear-gradient(to right,#152238,#233959)",
            borderRadius: "30px",
            margin: "15px",
            padding: "15px",
            overflow: "hidden",
            boxShadow: "1px 2px 15px",
          }}
        >
          <center>
            <div className="count">{(chartData.length+unresolvedData.length)}</div>
            <h2 style={{ color: "white", padding: "0px" }}>Total Detections</h2>
          </center>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div
          data-aos="fade-right"
          data-aos-duration="2000"
          style={{
            background: "linear-gradient(to right,#152238,#233959)",
            borderRadius: "30px",
            margin: "15px",
            padding: "15px",
            overflow: "hidden",
            boxShadow: "1px 2px 15px",
          }}
        >
          <center>
            <div className="count">
              {((countResolved()[0] / (chartData.length+unresolvedData.length)) * 100).toFixed(1)}%
            </div>
            <h2 style={{ color: "white", padding: "0px" }}>Resolved</h2>
          </center>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div
          data-aos="fade-right"
          data-aos-duration="3000"
          style={{
            background: "linear-gradient(to right,#152238,#233959)",
            borderRadius: "30px",
            margin: "15px",
            padding: "15px",
            overflow: "hidden",
            boxShadow: "1px 2px 15px",
          }}
        >
          <center>
            <div className="count">
              {((countResolved()[1] / (chartData.length+unresolvedData.length)) * 100).toFixed(1)}%
            </div>
            <h2 style={{ color: "white", padding: "0px" }}>Unresolved</h2>
          </center>
        </div>
      </Grid>
    </Grid>
  );
}
