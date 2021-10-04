import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Bar } from "react-chartjs-2";
import { getCachedData, option } from "../public/funct";
export default function ExchangeRate() {
  const [handleValue, setHandleValue] = useState([
    {
      handle1: null,
    },
  ]);
  const [handleValue2, setHandleValue2] = useState([]);
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
    setHandleValue2(Object.keys(postData.rates));
    // console.log(handleValue.handle1);
  }
  function handleChart(e) {
    if (e.target.value === "A-Z") {
      let val;
      val = handleValue.handle1;
      val = Object.values(val).sort((a, b) => a - b);
      console.log(val);
      console.log(handleValue.handle1);
      setData({
        ...data,
        labels: Object.values(val).slice(0, 15),
        datasets: [
          {
            ...data.datasets[0],
            data: Object.values(val).slice(0, 15),
          },
        ],
      });
      // console.log(data.labels);
      // console.log(data.datasets[0].data);
      // console.log(e.target.value);
    }

    if (e.target.value === "Z-A") {
      let val;
      val = handleValue.handle1;
      val = Object.values(val).sort((a, b) => a - b);
      console.log(val.reverse());
      console.log(val);
      console.log(handleValue.handle1);
      setData({
        ...data,
        labels: Object.values(val).slice(0, 15),
        datasets: [
          {
            ...data.datasets[0],
            data: val.slice(0, 16),
          },
        ],
      });
    }

    if (e.target.value === "low") {
      let val;
      val = handleValue.handle1;
      val = Object.values(val).sort((a, b) => a - b);
      console.log(val);
      console.log(handleValue.handle1);
      setData({
        ...data,
        labels: Object.values(val).slice(0, 15),
        datasets: [
          {
            ...data.datasets[0],
            data: val.slice(0, 16),
          },
        ],
      });
    }
    if (e.target.value === "high") {
      let val;
      val = handleValue.handle1;
      val = Object.values(val).sort((a, b) => a - b);
      console.log(val.reverse());
      val = Object.values(val).slice(0, 15);
      console.log(val);
      console.log(handleValue.handle1);
      // Object.keys(val).map(() => {
      //   Object.keys(handleValue.handle1).map(() => {
      //     if (Object.values(val) == Object.values(handleValue.handle1)) {
      //       console.log(
      //         Object.values(val) == Object.values(handleValue.handle1)
      //       );
      //     } else {
      //       console.log("not work");
      //     }
      //   });
      // });
      setData({
        ...data,
        labels: Object.values(val).slice(0, 15),
        datasets: [
          {
            ...data.datasets[0],
            data: val.slice(0, 16),
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
      <NavBar />
      <VerticalBar />
    </>
  );
}
