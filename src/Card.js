import React from "react";
import background from "./Imgs/Back.webp";
import TextField from '@mui/material/TextField';
const Card = (props) => {
  return (
    <>
      <div
        className="card text-center"
        style={{
          color: "white",
          margin: "20px",
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="card-header">
          <h3>{props.title}</h3>
        </div>
        <div className="card-body">
          <h5 className="card-title">Balance: {props.ba} ETH </h5>
          <p className="card-text">
            Account : {props.Ac ? props.Ac : "not connected"}
          </p>
          <p className="card-text">
            About Project : {props.Desc ? props.Desc : "not connected"}
          </p>
          &nbsp;
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant = "filled"
            style={{color:'white'}}

            onChange={(e)=>{props.bl(e.target.value)}}
          />
          <button
            type="button"
            className="btn btn-success "
            onClick={props.tr(props.Ac)}
            style={{margin:"10p"}}
          >
            Transfer
          </button>
          &nbsp;
          <div />
        </div>
      </div>
    </>
  );
};

export default Card;
