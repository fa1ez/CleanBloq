import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";
import { Box } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DateChart({ chartData }) {
  console.log("Chartjs ", chartData);
  const a = chartData[0].city;
  const [City, setCity] = useState(a);
  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const getcount = () => {
    let count = [0, 0, 0, 0, 0, 0, 0];
    const filtered = chartData.filter((ct) => ct.city === City);
    for (let i = 0; i < filtered.length; i++) {
      if (filtered[i].day === "Monday") {
        count[0] += 1;
      } else if (filtered[i].day === "Tuesday") {
        count[1] += 1;
      } else if (filtered[i].day === "Wednesday") {
        count[2] += 1;
      } else if (filtered[i].day === "Thursday") {
        count[3] += 1;
      } else if (filtered[i].day === "Friday") {
        count[4] += 1;
      } else if (filtered[i].day === "Saturday") {
        count[5] += 1;
      } else if (filtered[i].day === "Sunday") {
        count[6] += 1;
      }
    }
    return count;
  };
  const getmax = () => {
    const ct = chartData
      .map((item) => item.city)
      .filter((ct, index, array) => array.indexOf(ct) === index);
    const counts = ct.map(
      (cit) => chartData.filter((item) => item.city === cit).length
    );
    counts.sort();
    console.log("hi",counts.sort())
    return parseInt(counts.slice(-1));
  };
  const [mmax, setmmax] = useState(getmax);

  const UniqueCity = () => {
    const ct = chartData
      .map((item) => item.city)
      .filter((ct, index, array) => array.indexOf(ct) === index);
    return ct.map((cit) => cit);
  };

  let userData = {
    labels: ["Monday", "Tuesday", "Wednesday",  "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        data: getcount(),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  let options = {
    maintainAspectRatio: true,
    scales: {
      x: {
        ticks: { color: "white" },
        grid: { display: false },
        title: { display: true, text: "Day" },
      },
      y: {
        ticks: { color: "white" },
        grid: { display: false },
        max: mmax,
        title: { display: true, text: "Frequency" },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Frequency of Trash Detection",
        font: { size: 18 },
        color: "white",
      },
      subtitle: {
        display: true,
        text: "Daily",
        font: { size: 12 },
        color: "white",
      },
      legend: {
        display: false,
      },
    },
  };

  useEffect(() => {
    userData = {
      labels: [...Array(24).keys()].map((i) => i),
      datasets: [
        {
          data: getcount(),
        },
      ],
    };
  }, [City]);

  return (
    <div>
      <Line data={userData} options={options} />
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
              <InputLabel id="demo-simple-select-label"></InputLabel>
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
