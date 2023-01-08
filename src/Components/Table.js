import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const locations = [
    {
      //isl
      city: "Islamabad",
      longitude: 73.047882,
      latitude: 33.684422,
      day: "Monday",
      time: "12:35:10",
    },
    {
      //london
      city: "Lahore",
      longitude: 0.127758,
      latitude: 51.507351,
      day: "Tuesday",
      time: "01:35:10",
    },
    {
      //london
      city: "Lahore",
      longitude: 0.127758,
      latitude: 51.507351,
      day: "Monday",
      time: "01:35:10",
    },
    {
      //london
      city: "Lahore",
      longitude: 0.127758,
      latitude: 51.507351,
      day: "Thursday",
      time: "06:35:10",
    },
    {
      //Karachi
      city: "Karachi",
      longitude: 0.127758,
      latitude: 51.507351,
      day: "Friday",
      time: "03:15:40",
    },
    {
      //london
      city: "Karachi",
      longitude: 0.127858,
      latitude: 51.501351,
      day: "Monday",
      time: "02:11:12",
    },
  ];


function createData(city, longitude, latitude, day, time) {
  return { city, longitude, latitude, day, time };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
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
            <TableCell align="center" style={{ color: "white" }}>
              Time
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {locations.map((location) => (
            <TableRow
              key={location.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {location.city}
              </TableCell>
              <TableCell align="center">{location.longitude}</TableCell>
              <TableCell align="center">{location.latitude}</TableCell>
              <TableCell align="center">{location.day}</TableCell>
              <TableCell align="center">{location.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
