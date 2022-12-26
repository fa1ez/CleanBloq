import { useState, useEffect, Component } from "react";
import "./App.css";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";
import Card from "./Card";
var Data = [];
function Project() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
  });
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [reload, shouldReload] = useState(false);

  const reloadEffect = () => shouldReload(!reload);
  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) => setAccount(accounts[0]));
  };
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      const contract = await loadContract("Funder", provider);
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

  useEffect(() => {
    const loadBalance = async () => {
      const { contract, web3 } = web3Api;
      const balance = await web3.eth.getBalance(contract.address);
      setBalance(web3.utils.fromWei(balance, "ether"));
    };
    web3Api.contract && loadBalance();
  }, [web3Api, reload]);

  const transferFund = function (index) {
    return async function () {
      const { web3, contract } = web3Api;
      // await contract.transfer({
      //   from: account,
      //   value: web3.utils.toWei("4", "ether"),
      // });

      // Sending from one account to another
      await contract.Add_Fund(index, {
        from: account,
        value: web3.utils.toWei("4", "ether"),
      });
      reloadEffect();
    };
  };

  const withdrawFund = function (index) {
    return async function () {
      const { contract, web3 } = web3Api;
      const withdrawAmout = web3.utils.toWei("2", "ether");
      await contract.withdraw(withdrawAmout, {
        from: account,
      });
      reloadEffect();
    };
  };

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    web3Api.web3 && getAccount();
  }, [web3Api.web3]);

  async function show_organizations(val) {
    const { web3, contract } = web3Api;
    if (val.words[0] == 1) {
      await contract
        .organizations(val.words[0], { from: account })
        .then(async function (resp) {
          const dict = { ID: "", add: "", bal: "" };
          dict["add"] = resp;
          const b = await web3.eth.getBalance(resp);

          dict["bal"] = web3.utils.fromWei(b, "ether");
          dict["ID"] = val.words[0];
          Data.push(dict);
        });
    }
  }
  const Show_Project = async () => {
    Data = [];
    var id_arr;
    const { contract } = web3Api;
    await contract.get_organ().then(function (resp) {
      id_arr = resp;
    });
    id_arr.map(show_organizations);

    reloadEffect();
  };

  var identity = "";
  //   For Initializing the Project
  const Create_Project = async () => {
    const { contract } = web3Api;

    // Latest Identity
    await contract
      .get_org({
        from: account,
      })
      .then(function (resp) {
        identity = resp.words[0];
      });
    //  identity -> Address
    try {
      console.log("Identity", identity);
      await contract.Add_Project(identity, {
        from: account,
      });
    } catch {
      console.log("Already exists project");
    }

    reloadEffect();
  };

  function some(val) {
    return (
      <Card
        name={val.ID}
        Ac={val.add}
        ba={val.bal}
        tr={transferFund}
        wth={withdrawFund}
      />
    );
  }
  return (
    <>
      <button
        type="button"
        className="btn btn-primary "
        onClick={Create_Project}
        style={{ marginLeft: "45%", marginTop: "20px" }}
      >
        Create Project
      </button>

      <button
        type="button"
        className="btn btn-primary "
        onClick={Show_Project}
        style={{ marginLeft: "45%", marginTop: "20px" }}
      >
        Show Project
      </button>

      {Data.map(some)}
    </>
  );
}

export default Project;
