import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Bar } from "react-chartjs-2";
export default function ExchangeRate() {
  const [dataSet, setDataSet] = useState([
    4.286341, 102.655966, 121.484803, 573.853692, 2.094777, 701.16519,
    115.028791, 1.609748, 2.101044, 1.984047, 1.9538, 2.356272, 99.950738,
    1.954818, 0.439939,
  ]);
  const data = {
    labels: [
      "AED",
      "AFN ",
      "ALL",
      "AMD",
      "ANG",
      "AOA",
      "ARS ",
      "AUD ",
      "AWG",
      "AZN ",
      "BAM",
      "BBD ",
      "BDT ",
      "BGN",
      "BHD",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: dataSet,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  //
  const VerticalBar = () => (
    <>
      <center>
        <div style={{ width: "1200px" }}>
          <Bar data={data} options={options} height={40} width={100} />
        </div>
        <select
          onChange={(e) => {
            if (e.target.value == "A-Z") {
              setDataSet(data.datasets[0].data.sort());
              console.log(e.target.value);
              console.log(data.datasets[0].data.sort());
            } else {
              setDataSet(data.datasets[0].data.reverse());
              console.log(e.target.value);
              console.log(data.datasets[0].data.reverse());
            }
          }}
        >
          <option value="A-Z">A-Z</option>
          <option value="rates">Rates</option>
        </select>
      </center>
    </>
  );

  return (
    <>
      <NavBar />
      <VerticalBar />
    </>
  );
}
