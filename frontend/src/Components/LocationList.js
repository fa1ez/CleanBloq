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

  // if (Loc_Data.length > 0) {
  //   setdetection(true);
  // }

  const [web3Api, setWeb3Api] = useState({
    contract: null,
  });

  const initverify = window.localStorage.getItem("verify_state") || true;
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
    console.log("Val is ", val);
    const dict = {
      id: "",
      longitude: "",
      latitude: "",
      city: "",
      day: "",
    };
    dict["id"] = val[0];
    dict["frequency"] = val[1];
    dict["longitude"] = val[2];
    dict["latitude"] = val[3];
    dict["city"] = val[4];
    dict["day"] = val[5];

    setData((locations) => [...locations, dict]);
    console.log("LOCATIONS ARE " , locations);
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
      "0x360c0bb1739d75c052271b680b1902490c50f6b3b34de7431792f1bf8ed3862f";
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
  const Verify_Data = async (id, long, lat, city, day,frequency) => {
    var id_arr = null;
    const { contract } = web3Api;
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
        setverify(false);
        local = true;
      }
    }
    console.log("verify " , verify);
    if (local == false) {
      setverify(true);
    }
  };

  const send = async (id, long, lat, city, day,frequency) => {
    if (verify === true) {
      setdetection(false);
      const { contract } = web3Api;
      const web3 = new Web3("HTTP://127.0.0.1:7545");
      const accounts = await web3.eth.getAccounts();

      const private_key =
        "0x360c0bb1739d75c052271b680b1902490c50f6b3b34de7431792f1bf8ed3862f";
      var abi;

      await contract
        .Location_Add(id, long, lat, city, day, frequency,{ from: accounts[2] })
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

  if (detected === true) {
    let id ="1";
    let day = "edih";
    const { contract } = web3Api;
    Json_Data.map((Loc_Data) => {
      contract &&
        Verify_Data(
          id,
          Loc_Data.longitude,
          Loc_Data.latitude,
          Loc_Data.city,
          day,
          Loc_Data.frequency
        );

      contract &&
        send(
          id,
          Loc_Data.longitude,
          Loc_Data.latitude,
          Loc_Data.city,
          day,
          Loc_Data.frequency
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
                    id={post.id}
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
