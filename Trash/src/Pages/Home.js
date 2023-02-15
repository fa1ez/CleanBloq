import React from "react";
import Navbar from "../Components/Navbar";
import { Typography, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { loadContract } from "../utils/load-contract";

export default function Home() {
  const [detections, setdetections] = useState();
  const [Unresolved_detections, set_Unresolveddetections] = useState();
  const [Resolved_detections, set_resolveddetections] = useState();

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

  useEffect(() => {
    const { contract } = web3Api;
    const Get_detections = async () => {
      await contract.Get_locations().then(function (resp) {
        setdetections(resp.length);
      });
    };
    contract && Get_detections();
  }, [web3Api]);

  useEffect(() => {
    const { contract } = web3Api;
    const Get_detections = async () => {
      await contract.Get_locations_resolved().then(function (resp) {
        set_resolveddetections(resp.length);
      });
    };
    contract && Get_detections();
  }, [web3Api]);

  useEffect(() => {
    const { contract } = web3Api;
    const Get_detections = async () => {
      await contract.Get_locations_Unresolved().then(function (resp) {
        set_Unresolveddetections(resp.length);
      });
    };
    contract && Get_detections();
  }, [web3Api]);

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
              {detections}
            </div>
            <Typography variant="h5">Detections made</Typography>
          </Grid>
          <Grid item xs={4}>
            <div className="countResolved" style={{ paddingTop: "50px" }}>
              {Resolved_detections}
            </div>
            <Typography variant="h5">Resolved</Typography>
          </Grid>
          <Grid item xs={4}>
            <div className="countUnResolved" style={{ paddingTop: "50px" }}>
              {Unresolved_detections}
            </div>
            <Typography variant="h5">Unresolved</Typography>
          </Grid>
        </Grid>
      </center>
    </div>
  );
}
