import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Web3 from "web3";
import { useState, useEffect} from "react";
import { loadContract } from "../utils/load-contract";

function createData(city, longitude, latitude, day) {
  return { city, longitude, latitude, day};
}

export default function BasicTable() {
  const [web3Api, setWeb3Api] = useState({
    contract: null,
  });

  const [locations, setData] = useState([]);

  useEffect(() => {
    const loadProvider = async () => {
      const contract = await loadContract("Trash", "HTTP://127.0.0.1:7545");
      setWeb3Api({
        contract,
      });
    };
    loadProvider();
  }, []);

  async function show_locations(val) {
    const dict = { longitude: "", latitude: "", city: "" ,day:"",time:""};
    console.log("epiahdns", val.longitude);
    dict["longitude"] = val.longitude;
    dict["latitude"] = val.latitude;
    dict["city"] = val.city;
    dict["day"] = val.day;
    setData(locations => [...locations, dict]);
  }

  

  useEffect(() => {
    const { contract } = web3Api;
    const get_solved = async () => {
      let id_var = null;
      await contract.Get_locations_resolved().then(function (resp) {
        id_var = resp;
      });
      id_var.map(show_locations);
    };
    contract && get_solved(contract);
  }, [web3Api]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ bgcolor: "black" }}>
          <TableRow>
            <TableCell align="center" style={{ color: "white" }}>
              City
            </TableCell>
            <TableCell align="center" style={{ color: "white" }}>
              Longitude
            </TableCell>
            <TableCell align="center" style={{ color: "white" }}>
              Latitude
            </TableCell>
            <TableCell align="center" style={{ color: "white" }}>
              Day
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {locations.map((location) => (
            <TableRow
              key={location.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" align="center" scope="row">
                {location.city}
              </TableCell>
              <TableCell align="center">{location.longitude}</TableCell>
              <TableCell align="center">{location.latitude}</TableCell>
              <TableCell align="center">{location.day}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
