import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import navbar from "./components/Navbar";
// import Login from "./components/LoginForm";
import Login from "./Pages/Login";
import About from "./Pages/About";
import Signup from "./Pages/Signup";
import CreateProject from "./Pages/CreateProject";
import { useState } from "react";
import Project from "./Project";

const checkLogin = (username, password) => {
  if (username == "" || password == "") return false;
  else return true;
};

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  function setUser(username,password){
    setUsername(username)
    setPassword(password)
  }

  if (checkLogin(username, password)) {
    //logged in
    const login = checkLogin(username, password);
    return (
      // <div>logged in</div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home login={login} />} />
          <Route path="/Home" element={<Home login={login} />} />
          <Route path="/login" element={<Login login={login}  setUsername={setUsername} setPassword={setPassword}/>} />
          <Route path="/about" element={<About login={login} />} />
          <Route path="/Projects" element={<Project />} />
          <Route path="/signup" element={<Signup login={login} />} />
          <Route
            path="/createProject"
            element={<CreateProject login={login} />}
          />
        </Routes>
      </BrowserRouter>
    );
  } else {
    //Not logged in
    const login = checkLogin(username, password);
    return (
      // <div>not logged in</div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home login={login} />} />
          {/* {console.log(checkLogin(username, password))} */}
          <Route path="/Home" element={<Home login={login} />} />
          <Route path="/login" element={<Login login={login} setUsername={setUsername} setPassword={setPassword}/>} />
          <Route path="/about" element={<About login={login} />} />
          <Route path="/Projects" element={<Project />} />
          <Route path="/signup" element={<Signup login={login} />} />
          <Route
            path="/createProject"
            element={<CreateProject login={login} />}
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
