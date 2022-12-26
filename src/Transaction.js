import { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";
import Card from "./Card";

const org_addr= [];
function Transaction(props) {
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
      console.log("Address is", contract.address);
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

  const transferFund = async () => {
    const { web3, contract } = web3Api;
    // await contract.transfer({
    //   from: account,
    //   value: web3.utils.toWei("4", "ether"),
    // });

    // Sending from one account to another
    // await contract.Add_Fund("0xe002cc9EFce35db39958A4dB9BF4D455Ec809280",{
    //   from: account,
    //   value: web3.utils.toWei("4", "ether"),
    // });
    var x = "";
    await contract

      .get_org({
        from: account,
      })
      .then(function (resp) {
        // console.log("resp os", resp.words[0]);
        // set_org(resp.words[0]);
        // console.log("After os ", org_num);
        x = resp.words[0];
      });
    try {
      await contract.Add_Project(x, {
        from: account,
      });
    } catch {
      console.log("Alreadhy exists project");
    }
    await contract
      .get_project(x, {
        from: account,
      })
      .then(function (resp) {
        console.log("Addresss is ", resp);
        console.log("X is", x);
      });

    get();

    reloadEffect();
  };
  var id_arr;
  const get = async () => {
    const { web3, contract } = web3Api;
    await contract.get_organ().then(function (resp) {
      id_arr = resp;
      console.log("total organizations are:: ", id_arr.length);
    });
 

    // Have to iterate over Array
    await contract.organizations(id_arr[2], { from: account }).then(function (resp) {
      console.log("Addrssssss is ", resp);
      org_addr.push(resp);
      console.log(org_addr)
    });

    // await contract.get_fund().then(function (resp) {
    //   console.log("Project Balance:: ", web3.utils.fromWei(resp, "ether"));
    // });
    reloadEffect();
  };

  const withdrawFund = async () => {
    const { contract, web3 } = web3Api;
    const withdrawAmout = web3.utils.toWei("2", "ether");
    await contract.withdraw(withdrawAmout, {
      from: account,
    });
    reloadEffect();
  };

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    web3Api.web3 && getAccount();
  }, [web3Api.web3]);
  return (
     <Card Ac = {account}  ba = {balance} tr = {transferFund} wth = {withdrawFund}/>
  );
}

export default Transaction;
