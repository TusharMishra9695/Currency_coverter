import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Button, Container } from "@mui/material";
import { dataHandle } from "../public/data";
import { getCachedData, option } from "../public/funct";
import VerticalBars from "../components/Graph";
export default function ExchangeRate() {
  const [country2, setCountry2] = useState([]);
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
    setCountry2(postData.rates);
    // console.log(country2);
  }
  return (
    <>
      <NavBar />
      <VerticalBars />
      {dataHandle.map((data, index) => {
        const { value, from, to } = data;
        return (
          <Container style={{ marginTop: "15px" }} key={index}>
            <div
              style={{
                width: "1180px",
                boxShadow: "1px 1px 2px 2px #EFEFEF",
                paddingBottom: "40px",
              }}
            >
              <Container style={{ paddingTop: "20px" }}>
                <div
                  style={{
                    backgroundColor: "#EFEFEF",
                    width: "1150px",
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
      })}
    </>
  );
}
