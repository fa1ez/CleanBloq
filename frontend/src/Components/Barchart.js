import React from "react";
import { Bar } from "react-chartjs-2";
import { useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";

export default function Barchart({ cities }) {
  console.log("Cities ", cities);
  const getcount = () => {
    const ct = cities
      .map((item) => item.city)
      .filter((ct, index, array) => array.indexOf(ct) === index);
    const counts = ct.map((cit) => ({
      city: cit,
      count: cities.filter((item) => item.city === cit).length,
    }));
    console.log(counts);
    return counts;
  };

  const [bardata, setbardata] = useState({
    labels: getcount().map((c) => c.city),
    datasets: [
      {
        data: getcount().map((c) => c.count),
        backgroundColor: ["lightblue", "turquoise"],
        borderWidth: 2,
        maxBarThickness: 50,
      },
    ],
  });
  return (
    <Bar
      data={bardata}
      options={{
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: { color: "white" },
            grid: { display: false },
          },
          y: {
            ticks: { color: "white" },
            grid: { display: false },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Frequency of Trash detection(cities)",
            color: "white",
            font: {
              size: 18,
            },
          },
          legend: {
            display: false,
          },
        },
      }}
    />
  );
}
