import { useEffect, useState, useContext } from "react";
import NavBar from "../components/NavBar";
import { Button, Container } from "@mui/material";
import { dataHandle } from "../public/data";
import { getCachedData, cacheName, url } from "../public/funct";
import VerticalBars from "../components/Graph";
import ThemeContext from "../public/theme-context";
export default function ExchangeRate() {
  const theme = useContext(ThemeContext);
  const [country2, setCountry2] = useState([]);
  useEffect(() => {
    getDatas();
  }, []);
  async function getDatas() {
    let postData = await getCachedData(cacheName, url);
    setCountry2(postData.rates);
  }
  return (
    <>
      <div style={theme}>
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
                      width: "1150px",
                      paddingTop: "20px",
                      paddingBottom: "20px",
                    }}
                  >
                      <span style={{ fontSize: "25px" }}>
                        Country Start From '{value}' With Rates
                      </span>
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
      </div>
    </>
  );
}
