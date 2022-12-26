import { useState, useEffect, Component } from "react";
import "./App.css";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";
import Card from "./Card";
import SignUpForm, { Dict } from "./components/SignupForm";
import Navbar from "./components/Navbar";
import ProjectForm from "./components/ProjectForm";

function Project() {
  const [Data, setData] = useState([]);
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
  });
  const [account, setAccount] = useState(null);
  const [reload, shouldReload] = useState(false);
  const reloadEffect = () => shouldReload(!reload);
  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) => setAccount(accounts[0]));
  };
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      const contract = await loadContract("Trash", provider);
      if (provider) {
        setAccountListener(provider);
        provider.request({ method: "eth_requestAccounts" });
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract,
        });
      } else {
        console.log("Please install MetaMask!");
      }
    };

    loadProvider();
  }, []);

  const add_location = async () => {
    const { web3, contract } = web3Api;
    contract.Location_Add("2", "3", "6", { from: account });
    reloadEffect();
  };

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    web3Api.web3 && getAccount();
  }, [web3Api.web3]);

  async function show_locations(val) {
    console.log("VAl is ", val);
    const dict = { long: "", latit: "", time: "" };
    dict["long"] = val.longitude;
    dict["latit"] = val.latitude;
    dict["time"] = val.time;
    console.log("Dict ", dict);
    setData(Data => [...Data, dict]);
  }
  const Show_Project = async () => {
    var id_arr;
    const { contract } = web3Api;
    await contract.Get_locations().then(function (resp) {
      id_arr = resp;
    });
    id_arr.map(show_locations);
  };

  function some(val) {
    if (val.ID != "") {
      return (
        <Card
          name={val.ID}
          Ac={val.add}
          ba={val.bal}
          title={val.title}
          Desc={val.Desc}
        />
      );
    }
  }
  return (
    <>
      <Navbar />
      <button onClick={add_location}>Add Location</button> <br></br>
      <button onClick={Show_Project}>Show Locations</button>
      {/* <ProjectForm getdata={getData} />
      <button
        type="button"
        className="btn btn-primary "
        onClick={Create_Project}
        style={{ marginLeft: "35.5%", marginTop: "10px",width:"395px" }}
        hidden={hide}
      >
        Confirm Submission
      </button>

      <button
        type="button"
        className="btn btn-primary "
        onClick={Show_Project}
        style={{ marginLeft: "45%", marginTop: "20px" }}
      >
        Show Project
      </button> */}
      {/* {Data.map(some)} */}
    </>
  );
}
export default Project;
