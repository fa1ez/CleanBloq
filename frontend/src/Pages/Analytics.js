import { useEffect, useState } from "react";
import DoughnutChart from "../Components/DoughnutChart";
import Navbar from "../Components/Navbar";
import Barchart from "../Components/Barchart";
import { loadContract } from "../utils/load-contract";
import DateChart from "../Components/DateChart";
import ResolvedCards from "../Components/ResolvedCards";
import LineChart_daily from "../Components/Linechart_daily";
import Drawer from "../Components/drawer";

// import Aos from "aos/dist/aos.css";

import Aos from "aos";
import { Grid } from "@mui/material";
export default function Analytics() {
  const [web3Api, setWeb3Api] = useState({
    contract: null,
  });

  useEffect(() => {
    const loadProvider = async () => {
      const contract = await loadContract("Trash", "HTTP://127.0.0.1:7545");
      setWeb3Api({
        contract,
      });
    };
    loadProvider();
  }, []);

  const [graphs, setgraphs] = useState("home");
  const [locations, setloc] = useState([]);
  const [Ulocations, setUlocations] = useState([]);
  async function show_locations(val) {
    console.log("val is", val);
    const dict = {
      id: "",
      frequency: "",
      longitude: "",
      latitude: "",
      city: "",
      day: "",
      time :""
    };
    dict["id"] = val[0];
    dict["frequency"] = val[1];
    dict["longitude"] = val[2];
    dict["latitude"] = val[3];
    dict["city"] = val[4];
    dict["day"] = val[5];
    dict["time"] = val[6];

    setloc((locations) => [...locations, dict]);
  }

  async function show_ulocations(val) {
    const dict = {
      id: "",
      frequency: "",
      longitude: "",
      latitude: "",
      city: "",
      day: "",
      time: ""
    };
    dict["id"] = val[0];
    dict["frequency"] = val[1];
    dict["longitude"] = val[2];
    dict["latitude"] = val[3];
    dict["city"] = val[4];
    dict["day"] = val[5];
    dict["time"] = val[6];

    setUlocations((Ulocations) => [...Ulocations, dict]);
  }
  const Show_Project = async () => {
    setloc([]);
    let id_arr = null;
    const { contract } = web3Api;
    await contract.Get_locations_resolved().then(function (resp) {
      id_arr = resp;
    });

    id_arr.map(show_locations);
    await contract.Get_locations_Unresolved().then(function (resp) {
      id_arr = resp;
    });
    id_arr.map(show_ulocations);
  };
  useEffect(() => {
    const { contract } = web3Api;
    contract && Show_Project();
  }, [web3Api]);

  useEffect(() => {
    console.log("Locations", locations);
    console.log("ULocations", Ulocations);
  }, [locations && Ulocations]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div style={{ overflow: "hidden" }}>
      <Navbar />
      {/* <div className="PageTitle">
        <center>Statistics</center>
      </div> */}
      <Grid container>
        <Grid item xs={2} style={{ height: "800px" }}>
          <Drawer setGraphs={setgraphs} />
        </Grid>
        {graphs == "home" && (
          <Grid item xs={10} style={{ padding: "10px" }}>
            <Grid item xs={12}>
              <div>
                {locations &&
                  locations.length > 0 &&
                  Ulocations &&
                  Ulocations.length > 0 && (
                    <ResolvedCards
                      chartData={locations}
                      unresolvedData={Ulocations}
                    />
                  )}
              </div>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                {/* <div> */}
                <p
                  style={{
                    fontSize: "35px",
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
                    marginTop: "10%",
                    color: "white",
                    fontSize: "15px",
                    fontFamily: "Times New Roman",
                    padding: "10px",
                    textAlign: "right",
                  }}
                >
                  The ratio of resolved to unresolved detections
                  <br />
                  <br />
                  Resolved are those trash detections which have been collected
                  and cleaned up
                  <br />
                  <br />
                  And unresolved are those detections which still need to be
                  cleaned up
                </div>
              </Grid>
              <Grid item xs={9}>
                <div
                  data-aos="fade-up"
                  style={{
                    //width: "70%",
                    height: "200px",
                    background: "linear-gradient(to right,#152238,#233959)",
                    borderRadius: "10px",
                    margin: "35px",
                    padding: "15px",
                    boxShadow: "1px 2px 15px",
                  }}
                >
                  {locations && locations.length > 0 && (
                    <Barchart cities={locations} />
                  )}
                </div>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                <div
                  data-aos="fade-right"
                  style={{
                    height: "250px",
                    background: "linear-gradient(to right,#152238,#233959)",
                    borderRadius: "10px",
                    margin: "10px",
                    padding: "15px",
                    boxShadow: "1px 2px 15px",
                    marginLeft: "2%",
                    overflow: "hidden",
                  }}
                >
                  {locations && locations.length > 0 && (
                    <DateChart chartData={locations} />
                  )}
                </div>
              </Grid>
              <Grid item xs={4}>
                <div
                  data-aos="fade-right"
                  style={{
                    height: "250px",
                    background: "linear-gradient(to right,#152238,#233959)",
                    borderRadius: "10px",
                    margin: "10px",
                    padding: "15px",
                    boxShadow: "1px 2px 15px",
                    marginLeft: "2%",
                    overflow: "hidden",
                  }}
                >
                  {locations && locations.length > 0 && <LineChart_daily cities={locations} />}
                </div>
              </Grid>
              <Grid item xs={4}>
                <div
                  data-aos="fade-left"
                  style={{
                    // width: "60%",
                    height: "250px",
                    //width:"300px",
                    background: "linear-gradient(to right,#152238,#233959)",
                    borderRadius: "10px",
                    margin: "10px",
                    padding: "15px",
                    boxShadow: "1px 2px 15px",
                    marginRight: "35px",
                    // marginLeft: "auto",
                  }}
                >
                  {locations &&
                    locations.length > 0 &&
                    Ulocations &&
                    Ulocations.length > 0 && (
                      <DoughnutChart
                        chartData={locations}
                        unresolvedData={Ulocations}
                      />
                    )}
                </div>
              </Grid>
            </Grid>
          </Grid>
        )}
        {graphs == "city" && (
          <Grid item xs={10} style={{ padding: "10px" }}>
            <div
              data-aos="fade-up"
              style={{
                //width: "70%",
                height: "400px",
                background: "linear-gradient(to right,#152238,#233959)",
                borderRadius: "10px",
                margin: "35px",
                padding: "15px",
                boxShadow: "1px 2px 15px",
              }}
            >
              {" "}
              {locations && locations.length > 0 && (
                <Barchart cities={locations} />
              )}
            </div>
          </Grid>
        )}
        {graphs == "daily" && (
          <Grid item xs={10} style={{ padding: "10px" }}>
            <div
              data-aos="fade-right"
              style={{
                height: "600px",
                background: "linear-gradient(to right,#152238,#233959)",
                borderRadius: "10px",
                margin: "10px",
                padding: "15px",
                boxShadow: "1px 2px 15px",
                marginLeft: "2%",
                overflow: "hidden",
              }}
            >
              <center>
                {locations && locations.length > 0 && (
                  <DateChart chartData={locations} />
                )}
              </center>
            </div>
          </Grid>
        )}
        {graphs == "hourly" && (
          <Grid item xs={10} style={{ padding: "10px" }}>
            <div
              data-aos="fade-right"
              style={{
                height: "600px",
                background: "linear-gradient(to right,#152238,#233959)",
                borderRadius: "10px",
                margin: "10px",
                padding: "15px",
                boxShadow: "1px 2px 15px",
                marginLeft: "2%",
                overflow: "hidden",
              }}
            >
              <center>
                {locations && locations.length > 0 && 
                <LineChart_daily cities={locations} />
                }
              </center>
            </div>
          </Grid>
        )}
        {graphs == "resolve" && (
          <Grid item xs={10} style={{ padding: "10px" }}>
            <div
              data-aos="fade-left"
              style={{
                // width: "60%",
                height: "600px",
                //width:"300px",
                background: "linear-gradient(to right,#152238,#233959)",
                borderRadius: "10px",
                margin: "10px",
                padding: "15px",
                boxShadow: "1px 2px 15px",
                marginRight: "35px",
                // marginLeft: "auto",
              }}
            >
              {locations &&
                locations.length > 0 &&
                Ulocations &&
                Ulocations.length > 0 && (
                  <DoughnutChart
                    chartData={locations}
                    unresolvedData={Ulocations}
                  />
                )}
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
