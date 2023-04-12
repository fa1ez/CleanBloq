import { checkboxClasses, Grid } from "@mui/material";
import "../App.css";
import CandidatePost from "./LocationCard";
import { useState, useEffect } from "react";
// import PicLoader from "./PicLoader";
import Web3 from "web3";
import { loadContract } from "../utils/load-contract";
import { resolveBreakpointValues } from "@mui/system/breakpoints";
import MapLocations from "./MapLocations";
import Json_Data from "./locations.json";
export default function LocationList() {
  const [locations, setData] = useState([]);
  const [detected, setdetection] = useState(true);

  // if (Json_Data.length > 0) {
  //   setdetection(true);
  // }

  const [web3Api, setWeb3Api] = useState({
    contract: null,
  });

  const initverify = window.localStorage.getItem("verify_state") || false;
  const [verify, setverify] = useState(initverify);

  useEffect(() => {
    window.localStorage.setItem("verify_state", JSON.stringify(verify));
  }, [verify]);

  useEffect(() => {
    const loadProvider = async () => {
      const contract = await loadContract("Trash", "HTTP://127.0.0.1:7545");
      setWeb3Api({
        contract,
      });
    };
    loadProvider();
  }, []);

  async function show_locations(val) {
    const dict = {
      id: "",
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
  
    setData((locations) => [...locations, dict]);
  }

  const Show_Project = async () => {
    setData([]);
    var id_arr = null;
    const { contract } = web3Api;
    await contract.Get_locations_Unresolved().then(function (resp) {
      id_arr = resp;
    });
    id_arr.map(show_locations);
  };
  useEffect(() => {
    const { contract } = web3Api;
    contract && Show_Project();
  }, [web3Api]);

  const Get_Resolve = async (id, City, Longitude, Latitude, day) => {
    let id_arr = null;
    const { contract } = web3Api;

    await contract.Get_locations_Unresolved().then(function (resp) {
      id_arr = resp;
    });

    const web3 = new Web3("HTTP://127.0.0.1:7545");
    const accounts = await web3.eth.getAccounts();

    const private_key =
      "c4b9c71a156d3dfad333bd70506d16c4730d4420d83124d0cff4a6844d856c0a";
    let abi;

    for (let i = 0; i < id_arr.length; i++) {
      if (
        // id_arr[i].id === id &&
        id_arr[i].longitude === Longitude &&
        id_arr[i].latitude === Latitude &&
        id_arr[i].city === City
        // id_arr[i].day === day
      ) {
        await contract
          .Update_Resolve(id, Longitude, Latitude, City, day, {
            from: accounts[2],
          })
          .then(function (resp) {
            abi = resp;
          });
      }
    }
    const tx = {
      to: contract.address,
      gas: 50000,
      from: accounts[2],
      data: abi.tx,
    };
    await web3.eth.accounts.signTransaction(tx, private_key);
    Show_Project();
  };
  const Verify_Data = async (id, long, lat, city, day, frequency,time) => {
    var id_arr = null;
    const { contract } = web3Api;
    const web3 = new Web3("HTTP://127.0.0.1:7545");
    const accounts = await web3.eth.getAccounts();
    await contract.Get_locations_Unresolved().then(function (resp) {
      id_arr = resp;
    });
    let local = false;
    for (let i = 0; i < id_arr.length; i++) {
      if (
        // Number(id_arr[i].id) === id &&
        id_arr[i].longitude === long &&
        id_arr[i].latitude === lat &&
        id_arr[i].city === city
        // id_arr[i].day === day
      ) {
        await contract
          .update_frequency(long, lat, city, { from: accounts[2] })
          .then(function (resp) {
            console.log("updated ");
          });
        setverify(false);
        local = true;
      }
    }
    if (local == false) {
      setverify(true);
    }
  };

  const send = async (id, long, lat, city, day, frequency,time) => {
    if (verify === true) {
      setdetection(false);
      const { contract } = web3Api;
      const web3 = new Web3("HTTP://127.0.0.1:7545");
      const accounts = await web3.eth.getAccounts();
      const private_key =
        "c4b9c71a156d3dfad333bd70506d16c4730d4420d83124d0cff4a6844d856c0a";
      var abi;

      await contract
        .Location_Add(id, long, lat, city, day, frequency,time, {
          from: accounts[2],
        })
        .then(function (resp) {
          abi = resp;
        });

      const tx = {
        to: contract.address,
        gas: 50000,
        from: accounts[2],
        data: abi.tx,
      };
      await web3.eth.accounts.signTransaction(tx, private_key);
    }
  };
  
  if (detected === true ) {
    console.log("Called.. ");
    let id = "1";
    const { contract } = web3Api;
    Json_Data.map((Loc_Data) => {
      contract &&
        Verify_Data(
          id,
          Loc_Data.longitude,
          Loc_Data.latitude,
          Loc_Data.city,
          Loc_Data.day,
          Loc_Data.frequency,
          Loc_Data.time
        );
      contract &&
        send(
          id,
          Loc_Data.longitude,
          Loc_Data.latitude,
          Loc_Data.city,
          Loc_Data.day,
          Loc_Data.frequency,
          Loc_Data.time
        );
    });
  }

  const [filename, setfilename] = useState("images/0.12775851.507351.jpg");
  const choosefilename = (fil) => {
    setfilename(fil);
  };
  return (
    <>
      <Grid container style={{ paddingTop: "10px" }}>
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
              minWidth: "100%",
            }}
          >
            <Grid container spacing={2} marginTop={1}>
              {locations.map((post) => (
                <Grid item xs={12} md={12} lg={12}>
                  <CandidatePost
                    frequency={post.frequency}
                    City={post.city}
                    Longitude={post.longitude}
                    Latitude={post.latitude}
                    day={post.day}
                    choosefilename={choosefilename}
                    Get_Resolve={Get_Resolve}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </Grid>
        <Grid item xs={9}>
          <div style={{ height: "100%" }}>
            <MapLocations />
            {/* <PicLoader filename={filename} /> */}
          </div>
        </Grid>
      </Grid>
    </>
  );
}