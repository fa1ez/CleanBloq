import React from "react";
import { Chart, Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

ChartJS.defaults.color = "white";

export default function Linechart_daily({ cities }) {
  //handle multuple city data
  const a = cities[0].city;
  const [City, setCity] = React.useState(a);
  const handleChange = (event) => {
    setCity(event.target.value);
    //ChartJS.update();
  };

  const getcount = () => {
    const array = [...Array(24).keys()].map((i) => 0);
    const filtered = cities.filter((ct) => ct.city === City);
    const str = filtered.map((ct) => {
      return parseInt(ct.time.slice(0, 2));
    });
    str.map((time) => (array[time] = array[time] + 1));
    return array;
  };
  const getmax = () => {
    console.log("hel",cities);
    const ct = cities
      .map((item) => item.city)
      .filter((ct, index, array) => array.indexOf(ct) === index);
    const counts = ct.map(
      (cit) => cities.filter((item) => item.city === cit).length
    );
    console.log("bye",counts);
    counts.sort();
    
    return parseInt(counts.slice(-1));
  };
  const UniqueCity = () => {
    const ct = cities
      .map((item) => item.city)
      .filter((ct, index, array) => array.indexOf(ct) === index);
    return ct.map((cit) => cit);
  };
  const [mmax, setmmax] = useState(getmax);
  const [linedata, setlinedata] = useState({
    labels: [...Array(24).keys()].map((i) => i),
    datasets: [
      {
        data: getcount(),
      },
    ],
  });

  useEffect(() => {
    setlinedata({
      labels: [...Array(24).keys()].map((i) => i),
      datasets: [
        {
          data: getcount(),
        },
      ],
    });
  }, [City]);

  return (
    <div
      style={{
        maxWidth: "800px",
        background: "linear-gradient(to right,#152238, #233959)",
      }}
    >
      <Line
        data={linedata}
        options={{
          scales: {
            x: {
              grid: { display: false },
              title: { display: true, text: "Hours of day" },
            },
            y: {
              grid: { display: false },
              title: { display: true, text: "Frequency of Occurence" },
              max: mmax,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Frequency of Trash Detection",
              font: {
                size: 18,
              },
            },
            legend: {
              display: false,
            },
            subtitle: {
              display: true,
              text: "Hourly",
              font: { size: 12 },
              color: "white",
            },
          },
        }}
      />
      <div
        style={{
          borderRadius: "20px",
          paddingTop: "15px",
          background: "linear-gradient(#4d92e7, #ecf0f1)",
        }}
      >
        <center>
          <Box
            sx={{
              padding: "10px",
              minWidth: "50px",
              maxWidth: "200px",
              maxHeight: "70px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">City</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={City}
                onChange={handleChange}
              >
                {UniqueCity().map((mycity) => {
                  return <MenuItem value={mycity}>{mycity}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>
        </center>
      </div>
    </div>
  );
}
