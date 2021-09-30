import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Bar } from "react-chartjs-2";
import { getCachedData } from "../public/funct";
export default function ExchangeRate() {
  const [handleValue, setHandleValue] = useState([]);
  const [handleValue2, setHandleValue2] = useState([]);
  const [data, setData] = useState({
    labels: handleValue2,
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

    let postData = await getCachedData(cacheName, url);
    setHandleValue(Object.values(postData.rates));
    setHandleValue2(Object.keys(postData.rates));
    // console.log(handleValue);
    // console.log(handleValue2);
  }
  function handleChart(e) {
    if (e.target.value == "A-Z") {
      console.log(handleValue.sort());
      setData({
        ...data,
        labels: handleValue2.slice(0, 16),
      });
      setData({
        ...data,
        datasets: [
          {
            ...data.datasets[0],
            data: handleValue.slice(0, 16),
          },
        ],
      });
      console.log(data.labels);
      console.log(data.datasets[0].data);
      console.log(e.target.value);
    }
    if (e.target.value == "Z-A") {
      console.log(handleValue.reverse());
      setData({
        ...data,
        labels: handleValue2.slice(0, 16),
      });
      setData({
        ...data,
        datasets: [
          {
            ...data.datasets[0],
            data: handleValue.slice(0, 16),
          },
        ],
      });
      console.log(data.labels);
      console.log(data.datasets[0].data);
      console.log(e.target.value);
    }

    if (e.target.value == "low") {
      console.log(handleValue.sort());
      setData({
        ...data,
        labels: handleValue2.slice(0, 16),
      });
      setData({
        ...data,
        datasets: [
          {
            ...data.datasets[0],
            data: handleValue.slice(0, 16),
          },
        ],
      });
      console.log(data.labels);
      console.log(data.datasets[0]);
      console.log(e.target.value);
    }
    if (e.target.value == "high") {
      console.log(handleValue.reverse());
      setData({
        ...data,
        labels: handleValue2.slice(0, 16),
      });
      setData({
        ...data,
        datasets: [
          {
            ...data.datasets[0],
            data: handleValue.slice(0, 16),
          },
        ],
      });
      console.log(data.labels);
      console.log(data.datasets[0].data);
      console.log(e.target.value);
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
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="low">Rates(low to high)</option>
          <option value="high">Rates(high to low)</option>
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
