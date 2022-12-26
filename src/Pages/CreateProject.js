import React from "react";
import Navbar from "../components/Navbar";
import ProjectForm from "../components/ProjectForm";

export default function CreateProject() {
  return (
    <div>
      <Navbar showLoginButton={false} />
      <ProjectForm />
    </div>
  );
}
