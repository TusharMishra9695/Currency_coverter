import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { getCachedData, option } from "../public/funct";
export default function VerticalBars() {
  const [handleValue, setHandleValue] = useState([
    {
      handle1: null,
    },
  ]);
  const [data, setData] = useState({
    labels: handleValue,
    datasets: [
      {
        label: "# of Votes",
        data: handleValue,
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
    const cacheVersion = 1;
    const cacheName = `myapp-${cacheVersion}`;
    const url =
      "http://data.fixer.io/api/latest?access_key=0ae329c5f31ee61cff8dda76ab72f43c";

    // here url and cacheName is declared due to get data from cache storage and also for recognize parameter
    //
    let postData = await getCachedData(cacheName, url);
    setHandleValue({ handle1: postData.rates });
  }
  function handleChart(e) {
    if (e.target.value === "A-Z") {
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
    }

    if (e.target.value === "Z-A") {
      const sortable = Object.fromEntries(
        Object.entries(handleValue.handle1).sort(([, a], [, b]) => a - b)
      );
      const sort = Object.fromEntries(
        Object.entries(sortable).reverse(([, a], [, b]) => a - b)
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
    }

    if (e.target.value === "low") {
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
    }
    if (e.target.value === "high") {
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
        <select onChange={handleChart}>
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
