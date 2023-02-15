import {Doughnut} from "react-chartjs-2"
import { Chart as Chartjs } from 'chart.js/auto'


export default function DoughnutChart({chartData, unresolvedData}) {
    function countResolved(){
        let count=[0,0];
        count [0] = chartData.length
        count [1] = unresolvedData.length
        return count
    }

    let userData={
        labels: ['Resolved', 'Unresolved'],
        datasets : [{
            data: countResolved(),
            backgroundColor: ['turquoise ','#F0E68C'],
            borderWidth: 0,
            cutout: '70%',
            hoverOffset: 20,
        }]
    }

    let options={
        maintainAspectRatio:false,
        plugins:{
            legend:{
                display:true,
                color: "white",
                labels:{color:"white"}
            },
        }
    }
  return (
    <Doughnut data={userData} options={options}/>
  )
}
