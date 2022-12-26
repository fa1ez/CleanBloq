import React, { useState } from "react";
import { Link } from "react-router-dom";
import background from "./Imgs/Back.webp";
const Header = (props) => {
  const [text, settext] = useState(null);
  const [place_holder, setPlaceholder] = useState("Search");

  const getText = (val) => {
    settext(val.target.value);
  };
  return (
    <>
      <div
        style={{
          margin: "Auto",
          textAlign: "center",
          backgroundColor: "#b3f0ff",
          fontStyle: "oblique",
          color: "red",
          padding: "5px",
          textDecorationStyle: "solid",
          fontSize: "50px",
        }}
      >
        PayAt
      </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div>
              <h6 style={{ margin: "20px" }}>
                <Link to="/">Home</Link>
              </h6>
            </div>

            <h6 style={{ margin: "20px" }} >
              <Link to="/Organization">Projects</Link>
            </h6>
            <form className="d-flex ml-auto">
              <input
                type="text"
                placeholder={place_holder}
                onChange={getText}
              />
              <button
                className="btn btn-outline-success"
                style={{ marginLeft: "10px" }}
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div
        className="card text-center"
        style={{
          color: "white",
          margin: "20px",
          backgroundImage: `url(${background})`,
        }}
      ></div>
    </>
  );
};

export default Header;
