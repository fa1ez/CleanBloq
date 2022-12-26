import React from "react";
import Navbar from "../components/Navbar";
import SignUpForm from "../components/SignupForm";

export default function SignUp() {
  return (
    <div>
      <Navbar showLoginButton={false}/>
      <SignUpForm />
    </div>
  );
}
