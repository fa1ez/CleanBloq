import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";

export default function Login({login,setUsername, setPassword}) {
  // console.log(setusername)

  
  if (!login) {
    return (
      <div>
        <Navbar showLoginButton={false} />
        <LoginForm setUsername={setUsername} setPassword={setPassword}/>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar showLoginButton={false} />
        <Container>
          <center>
          <Typography variant="h3" marginTop={3}>Already Logged in</Typography>
          </center>
        </Container>
        {/* <LoginForm /> */}
      </div>
    );
  }
}
