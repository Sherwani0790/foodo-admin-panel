import React, { useState } from "react";
//styles
import "./charts.scss";
//PrimeCharts
import { Chart } from "primereact/chart";

const SingleLineChart = () => {
    // const LineChartDemo = () => {
    const [basicData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: '#42A5F5',
                tension: .4
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: '#FFA726',
                tension: .4
            }
        ]
    });
    const getLightTheme = () => {
        let basicOptions = {
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
            legend: {
              // display: false,
            },
          },
          scales: {
            x: {
              ticks: {
                color: "#495057",
              },
              grid: {
                color: "#ebedef",
              },
            },
            y: {
              ticks: {
                color: "#495057",
              },
              grid: {
                color: "#ebedef",
              },
            },
          },
        };
        return {
          basicOptions,
        };
      };
      const { basicOptions } = getLightTheme();
  return (
    <div className={"charts_div"}>
    <Chart
      type="line"
      data={basicData}
      options={basicOptions}
      style={{ height: "300px" }}
    />
  </div>
  )
}

export default SingleLineChart