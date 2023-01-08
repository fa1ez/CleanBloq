import { useEffect } from "react";
import DoughnutChart from "../Components/DoughnutChart";
import Navbar from "../Components/Navbar";
import Barchart from "../Components/Barchart";
import DateChart from "../Components/DateChart";
import ResolvedCards from "../Components/ResolvedCards";
import LineChart_daily from "../Components/Linechart_daily";
// import Aos from "aos/dist/aos.css";

import Aos from "aos";
import { Grid } from "@mui/material";

export default function Analytics() {
  const locations = [
    {
      //isl
      city: "Islamabad",
      longitude: 73.047882,
      latitude: 33.684422,
      day: "Monday",
      time: "12:35:10",
    },
    {
      //london
      city: "Lahore",
      longitude: 0.127758,
      latitude: 51.507351,
      day: "Tuesday",
      time: "01:35:10",
    },
    {
      //london
      city: "Lahore",
      longitude: 0.127758,
      latitude: 51.507351,
      day: "Monday",
      time: "01:35:10",
    },
    {
      //london
      city: "Lahore",
      longitude: 0.127758,
      latitude: 51.507351,
      day: "Thursday",
      time: "06:35:10",
    },
    {
      //Karachi
      city: "Karachi",
      longitude: 0.127758,
      latitude: 51.507351,
      day: "Friday",
      time: "03:15:40",
    },
    {
      //london
      city: "Karachi",
      longitude: 0.127858,
      latitude: 51.501351,
      day: "Monday",
      time: "02:11:12",
    },
    
    {
      //london
      city: "Multan",
      longitude: 0.127858,
      latitude: 51.501351,
      day: "Monday",
      time: "02:11:12",
    },
  ];

  const Ulocations = [
    {
      //isl
      city: "Islamabad",
      longitude: 73.047882,
      latitude: 33.684422,
      day: "Monday",
      time: "12:35:10",
    },
    {
      //london
      city: "London",
      longitude: 0.127758,
      latitude: 51.507351,
      day: "Tuesday",
      time: "12:35:10",
    },
  ];


  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div style={{ overflow: "hidden" }}>
      <Navbar />
      <div className="PageTitle">
        <center>Statistics</center>
      </div>
      <Grid container>
        <Grid item xs={6}>
          <div
            data-aos="fade-right"
            style={{
              height: "450px",
              background: "linear-gradient(to right,#152238,#233959)",
              borderRadius: "30px",
              margin: "10px",
              padding: "15px",
              boxShadow: "1px 2px 15px",
              marginLeft: "2%",
              overflow: "hidden",
            }}
          >
            <DateChart chartData={locations} />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div
            data-aos="fade-right"
            style={{
              height: "450px",
              background: "linear-gradient(to right,#152238,#233959)",
              borderRadius: "30px",
              margin: "10px",
              padding: "15px",
              boxShadow: "1px 2px 15px",
              marginLeft: "2%",
              overflow: "hidden",
            }}
          >
            <LineChart_daily cities={locations} />
          </div>
        </Grid>
      </Grid>
      <br></br>
      <Grid container>
        <Grid item xs={3}>
          {/* <div> */}
          <p
            style={{
              fontSize: "50px",
              textAlign: "left",
              color: "white",
              marginTop: "10px",
            }}
          >
            Detections
          </p>
          <hr />
          <div
            style={{
              // position: "relative",
              // top: "50%",
              // transform: "translateY(-50%)",
              marginTop:"10%",
              color: "white",
              fontSize: "25px",
              fontFamily: "Times New Roman",
              padding: "10px",
              textAlign: "right",
            }}
          >
            The ratio of resolved to unresolved detections
            <br />
            <br />
            Resolved are those trash detections which have been collected and
            cleaned up
            <br />
            <br />
            And unresolved are those detections which still need to be cleaned
            up
          </div>
          {/* </div> */}
        </Grid>
        <Grid item xs={9}>
          <div
            data-aos="fade-left"
            style={{
              // width: "60%",
              height: "500px",
              background: "linear-gradient(to right,#152238,#233959)",
              borderRadius: "30px",
              margin: "10px",
              padding: "15px",
              boxShadow: "1px 2px 15px",
              // marginRight: "2%",
              // marginLeft: "auto",
            }}
          >
            <DoughnutChart chartData={locations} unresolvedData={Ulocations} />
          </div>
        </Grid>
      </Grid>

      <div>
        <ResolvedCards chartData={locations} unresolvedData={Ulocations}/>
      </div>
      <div
        data-aos="fade-up"
        style={{
          width: "60%",
          height: "500px",
          background: "linear-gradient(to right,#152238,#233959)",
          borderRadius: "30px",
          margin: "15px",
          padding: "15px",
          boxShadow: "1px 2px 15px",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <Barchart cities={locations} />
      </div>
    </div>
  );
}
