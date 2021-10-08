import { useEffect, useState, useContext } from "react";
import { Bar } from "react-chartjs-2";
import ThemeContext from "../public/theme-context";
import {
  getCachedData,
  option,
  AllValues,
  cacheName,
  url,
} from "../public/funct";
export default function VerticalBars() {
  const theme = useContext(ThemeContext);
  const [optionValue, setOptionValue] = useState("please select");
  const [handleValue, setHandleValue] = useState({
    handle1: AllValues,
  });
  const [data, setData] = useState({
    labels: Object.keys(handleValue.handle1),
    datasets: [
      {
        label: "# of Votes",
        data: Object.values(handleValue.handle1),
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
  });

  useEffect(() => {
    getDatas();
  }, []);
  async function getDatas() {
    let postData = await getCachedData(cacheName, url);
    setHandleValue({ handle1: postData.rates });
    console.log(handleValue.handle1);
  }
  //
  function handleChart(e) {
    setOptionValue(e.target.value);
    switch (e.target.value) {
      case "A-Z": {
        const sortObject = Object.keys(handleValue.handle1)
          .sort()
          .reduce(
            (res, key) => ((res[key] = handleValue.handle1[key]), res),
            {}
          );
        setData({
          ...data,
          labels: Object.keys(sortObject).slice(0, 15),
          datasets: [
            {
              ...data.datasets[0],
              data: Object.values(sortObject).slice(0, 15),
            },
          ],
        });
        break;
      }
      case "Z-A": {
        const sortObject = Object.keys(handleValue.handle1)
          .sort()
          .reduce(
            (res, key) => ((res[key] = handleValue.handle1[key]), res),
            {}
          );
        const sort = Object.fromEntries(
          Object.entries(sortObject).reverse(([, a], [, b]) => a - b)
        );

        setData({
          ...data,
          labels: Object.keys(sort).slice(0, 15),
          datasets: [
            {
              ...data.datasets[0],
              data: Object.values(sort).slice(0, 15),
            },
          ],
        });
        break;
      }
      case "low to high": {
        const sortable = Object.fromEntries(
          Object.entries(handleValue.handle1).sort(([, a], [, b]) => a - b)
        );
        console.log(sortable);
        setData({
          ...data,
          labels: Object.keys(sortable).slice(0, 15),
          datasets: [
            {
              ...data.datasets[0],
              data: Object.values(sortable).slice(0, 15),
            },
          ],
        });
        break;
      }
      case "high to low": {
        const sortable = Object.fromEntries(
          Object.entries(handleValue.handle1).sort(([, a], [, b]) => a - b)
        );
        // console.log(sortable);
        const sort = Object.fromEntries(
          Object.entries(sortable).reverse(([, a], [, b]) => a - b)
        );
        // console.log(sort);
        setData({
          ...data,

          labels: Object.keys(sort).slice(0, 15),
          datasets: [
            {
              ...data.datasets[0],
              data: Object.values(sort).slice(0, 15),
            },
          ],
        });
        break;
      }
      default: {
        console.log("selected default");
      }
    }
  }

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
        <select value={optionValue} onChange={handleChart} style={theme}>
          {option.map((opt, index) => {
            return (
              <option key={index} value={opt.options}>
                {opt.options}
              </option>
            );
          })}
        </select>
      </center>
    </>
  );
  return (
    <>
      <VerticalBar />
    </>
  );
}
