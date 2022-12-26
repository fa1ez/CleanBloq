import { fontSize } from "@mui/system";
import React from "react";
import Navbar from "../components/Navbar";
import Img from "../Imgs/img2.jpeg"

export default function Home({ login }) {
  return (
    <div>
      <Navbar showLoginButton={!login} />
      <img src={Img} width="100%" />
      <h1 style={{ position: "absolute", top: "80px", right: "0", color:"white", fontSize:"220px"}}>
        Welcome!
      </h1>
      <p style={{ position: "absolute", top: "450px", right: "0", color:"white", fontSize:"30px", textAlign:"right"}}>Bring a Creative Project to life by enabling the connection between the provider and organizations. Transfer funds to your favourite projects which are supported by cryptocurrencies</p>
    </div>
  );
}