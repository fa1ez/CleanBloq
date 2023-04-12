import React from "react";
import Aos from "aos";
import { useEffect } from "react";
import { Grid } from "@mui/material";

export default function ResolvedCards({ chartData, unresolvedData }) {
  function countResolved() {
    let count = [0, 0];
    count[0]=chartData.length
    count[1]=unresolvedData.length
    return count;
  }
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <Grid container >
      <Grid item xs={4} style={{paddingRight:"50px"}}>
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          style={{
            width:"100%",
            height:"120px",
            background: "linear-gradient(to right,#152238,#233959)",
            borderRadius: "10px",
            margin: "15px",
            // padding: "15px",
            overflow: "hidden",
            boxShadow: "1px 2px 15px",
            display:"flex",
          }}
        >
          
            <div className="count" style={{paddingLeft:"30px"}}>{(chartData.length+unresolvedData.length)}</div>
            <h2 style={{ color: "white", padding: "12px", marginTop:"50px",fontSize:"20px" }}>Total Detections</h2>
          
        </div>
      </Grid>
      <Grid item xs={4} style={{paddingRight:"50px"}}>
        <div
          data-aos="fade-right"
          data-aos-duration="2000"
          style={{
            width:"100%",
            height:"120px",
            background: "linear-gradient(to right,#152238,#233959)",
            borderRadius: "10px",
            margin: "15px",
            //padding: "15px",
            overflow: "hidden",
            boxShadow: "1px 2px 15px",
            display:"flex",
          }}
        >
            <div className="count" style={{paddingLeft:"30px"}}>
              {((countResolved()[0] / (chartData.length+unresolvedData.length)) * 100).toFixed(1)}%
            </div>
            <h2 style={{ color: "white", padding: "12px" ,marginTop:"50px",fontSize:"20px" }}>Resolved</h2>
        </div>
      </Grid>
      <Grid item xs={4} style={{paddingRight:"50px"}}>
        <div
          data-aos="fade-right"
          data-aos-duration="3000"
          style={{
            width:"100%",
            height:"120px",
            background: "linear-gradient(to right,#152238,#233959)",
            borderRadius: "10px",
            margin: "15px",
            //padding: "15px",
            overflow: "hidden",
            boxShadow: "1px 2px 15px",
            display:"flex",
          }}
        >
            <div className="count" style={{paddingLeft:"30px"}}>
              {((countResolved()[1] / (chartData.length+unresolvedData.length)) * 100).toFixed(1)}%
            </div>
            <h2 style={{ color: "white", padding: "12px",marginTop:"50px",fontSize:"20px" }}>Unresolved</h2>
        </div>
      </Grid>
    </Grid>
  );
}

// import React from "react";
// import { Bar } from "react-chartjs-2";
// import { useState } from "react";
// import Aos from "aos";
// import { Chart as ChartJS } from "chart.js/auto";

// export default function ResolvedCards({ chartData, unresolvedData }) {
  
//   const [bardata, setbardata] = useState({
//     labels: ["Total Detections", "Resolved", "Unresolved"],
//     datasets: [
//       {
//         data: [chartData.length+unresolvedData.length ,chartData.length, unresolvedData.length ],
//         backgroundColor: ["red", "green"],
//         borderWidth: 2,
//         maxBarThickness: 50,
//       },
//     ],
//   });
//   return (
//     <Bar
//       data={bardata}
//       options={{
//         indexAxis: 'y',
//         maintainAspectRatio: false,
//         scales: {
//           x: {
//             ticks: { color: "white" },
//             grid: { display: false },
//           },
//           y: {
//             ticks: { color: "white", axis:'auto' },
//             grid: { display: false },
//           },
//         },
//         plugins: {
//           title: {
//             display: true,
//             color: "white",
//             font: {
//               size: 18,
//             },
//           },
//           legend: {
//             display: false,
//           },
//         },
//       }}
//     />
//   );
// }
