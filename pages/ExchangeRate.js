import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Bar } from "react-chartjs-2";

const fruits = [2, 1, 1, 4];
console.log(fruits.sort());
export default function ExchangeRate() {
  // const [country2, setCountry2] = useState([]);
  // useEffect(() => {
  //   getDatas();
  // }, []);
  // async function getDatas() {
  //   const cacheVersion = 1;
  //   const cacheName = `myapp-${cacheVersion}`;
  //   const url =
  //     "http://data.fixer.io/api/latest?access_key=0ae329c5f31ee61cff8dda76ab72f43c";

  //   const cacheStorage = await caches.open(cacheName);
  //   console.log(cacheStorage);
  //   const cachedResponses = await cacheStorage.match(url);
  //   if (cachedResponses === undefined) {
  //     await cacheStorage.add(url);
  //     console.log("API Calling.......");
  //     console.log("API Called");
  //   } else {
  //     console.log("API call's only once a day");
  //   }
  //   let postData = await getCachedData(cacheName, url);
  //   setCountry2(postData.rates);
  // }

  // async function getCachedData(cacheName, url) {
  //   const cacheStorage = await caches.open(cacheName);
  //   const cachedResponse = await cacheStorage.match(url);

  //   if (!cachedResponse || !cachedResponse.ok) {
  //     return false;
  //   }

  //   return await cachedResponse.json();
  // }
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
        data: [
          4.286341, 102.655966, 121.484803, 573.853692, 2.094777, 701.16519,
          115.028791, 1.609748, 2.101044, 1.984047, 1.9538, 2.356272, 99.950738,
          1.954818, 0.439939,
        ],
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

  const VerticalBar = () => (
    <>
      <div className="header">
        {/* <h1 className="title">Vertical Bar Chart</h1> */}
        <div className="links">
          {/* <a
            className="btn btn-gh"
            href="https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/VerticalBar.js"
          >
            Github Source
          </a> */}
        </div>
      </div>
      <center>
        <div style={{ width: "1200px" }}>
          <Bar data={data} options={options} height={40} width={100} />
        </div>
      </center>
    </>
  );

  return (
    <>
      <NavBar />
      {/* {data.map((data, index) => {
        const { value, from, to } = data;
        return (
          <Container style={{ marginTop: "15px" }} key={index}>
            <div
              style={{
                width: "950px",
                boxShadow: "1px 1px 2px 2px #EFEFEF",
                paddingBottom: "40px",
              }}
            >
              <Container style={{ paddingTop: "20px" }}>
                <div
                  style={{
                    backgroundColor: "#EFEFEF",
                    width: "900px",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                  }}
                >
                  <center>
                    <span style={{ fontSize: "25px" }}>
                      Country Start From '{value}' With Rates
                    </span>
                  </center>
                  <ul>
                    {Object.keys(country2)
                      .slice(from, to)
                      .map((currency2, index) => {
                        return (
                          <Button key={index} value={country2[currency2]}>
                            {currency2} = {country2[currency2]}
                          </Button>
                        );
                      })}
                  </ul>
                </div>
              </Container>
            </div>
          </Container>
        );
      })} */}
      <VerticalBar />
      {/* <button onClick={getData}></button> */}
    </>
  );
}
