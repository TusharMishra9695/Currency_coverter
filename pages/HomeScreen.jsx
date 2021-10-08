import { useEffect, useState, useContext } from "react";
import { Container, FormControl, Select, TextField } from "@mui/material";
import { getCachedData, cacheName, url } from "../public/funct";
import ThemeContext from "../public/theme-context";
export default function Home() {
  const theme = useContext(ThemeContext);
  const [country, setCountry] = useState([]);
  const [convertvalue, setConvertValue] = useState({
    value1: "INR",
    value2: "INR",
    text1: 1,
    text2: 1,
    texthandle: false,
  });
  const [time, setTime] = useState([]);
  useEffect(() => {
    getDatas();
  }, []);
  async function getDatas() {
    const cacheStorage = await caches.open(cacheName);
    console.log(cacheStorage);
    const cachedResponses = await cacheStorage.match(url);
    if (cachedResponses === undefined) {
      await cacheStorage.add(url);
      console.log("API Calling.......");
      console.log("API Called");
    } else {
      console.log("API call's only once a day");
    }
    let postData = await getCachedData(cacheName, url);
    setCountry(postData.rates);
    setConvertValue({
      ...convertvalue,
      texthandle: true,
    });
    setTime(postData);
  }
  function convert(e) {
    e.preventDefault();
    console.log("i am called");
    setConvertValue({
      ...convertvalue,
      text2: (
        (country[convertvalue.value2] / country[convertvalue.value1]) *
        convertvalue.text1
      ).toFixed(2),
    });
  }
  function handleSwap(e) {
    e.preventDefault();
    setConvertValue({
      ...convertvalue,
      text2: convertvalue.text1,
      value2: convertvalue.value1,
      text1: (
        (country[convertvalue.value2] / country[convertvalue.value1]) *
        convertvalue.text1
      ).toFixed(2),
      value1: convertvalue.value2,
    });
  }
  function Validate(body) {
    if ( /^-?(\d+\.?\d*)$|(\d*\.?\d+)$/.test(body)) {
      return true;
    }

    return false;
  }
  return (
    <>
      <div style={{ height: "630px" }}>
        <Container style={{ marginTop: "10px", paddingBottom: "40px" }}>
          <div
            style={{
              height: "250px",
              width: "700px",
              boxShadow: "1px 1px 2px 2px #EFEFEF",
              paddingBottom: "40px",
            }}
          >
            <Container>
              <div>
                <h2 style={{ marginBottom: "-25px" }}>
                  {convertvalue.text1} {convertvalue.value1} =
                </h2>
                <h1 style={{ marginBottom: "0px" }}>
                  {convertvalue.text2} {convertvalue.value2}
                </h1>
                <span style={{ fontSize: "14px", color: "grey" }}>
                  Latest update : {time.date}
                </span>
              </div>
              <form>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "nowrap",
                  }}
                >
                  <div>
                    <div>
                      <FormControl
                        style={{
                          width: "290px",
                          border: "1px solid white",
                        }}
                        onChange={(e) => {
                          setConvertValue({
                            ...convertvalue,
                            value1: e.target.value,
                          });
                        }}
                        variant="outlined"
                        onClick={convert}
                      >
                        <Select
                          value={convertvalue.value1}
                          native
                          style={theme}
                        >
                          {Object.keys(country).map((currency2, index) => {
                            return (
                              <option key={index} value={currency2}>
                                {currency2}
                              </option>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                    <div>
                      <TextField
                        style={{
                          background: "#4C4646",
                          border: "1px solid white",
                          color: "white",
                          width: "290px",
                          height: "60px",
                        }}
                        variant="outlined"
                        onChange={(e) => {
                          setConvertValue({
                            ...convertvalue,
                            text1: e.target.value,  
                            text2: (
                              (country[convertvalue.value2] /
                                country[convertvalue.value1]) *
                              e.target.value
                            ).toFixed(2),
                           
                          });
                        }}
                        value={convertvalue.text1}
                        autoComplete="off"
                      ></TextField>
                             {!Validate(convertvalue.text1) && (
                <p style={{ color: "red" ,fontWeight:600,fontSize:"15px"}}>Please Enter Number's Only</p>
              )}
                    </div>
                  </div>
                  <div>
                    <h1 style={{ cursor: "pointer" }} onClick={handleSwap}>
                      &#8595;&#8593;
                    </h1>
                  </div>
                  <div>
                    <div>
                      <FormControl
                        style={{ width: "290px", border: "1px solid white" }}
                        onChange={(e) => {
                          setConvertValue({
                            ...convertvalue,
                            value2: e.target.value,
                          });
                        }}
                        variant="outlined"
                        onClick={convert}
                      >
                        <Select
                          value={convertvalue.value2}
                          native
                          style={theme}
                        >
                          {Object.keys(country).map((currency2, index) => {
                            return (
                              <option key={index} value={currency2}>
                                {currency2}
                              </option>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                    <div>
                      <TextField
                        style={{
                          background: "#4C4646",
                          border: "1px solid white",
                          color: "white",
                          width: "290px",
                          height: "60px",
                        }}
                        onChange={(e) => {
                          setConvertValue({
                            ...convertvalue,
                            text2: e.target.value,
                            text1: (
                              e.target.value /
                              (country[convertvalue.value2] /
                                country[convertvalue.value1])
                            ).toFixed(2),
                          });
                        }}
                        value={convertvalue.text2 || ""}
                        autoComplete="off"
                      />
                                     {!Validate(convertvalue.text2) && (
                <p style={{ color: "red" ,fontWeight:600,fontSize:"15px"}}>Please Enter Number's Only</p>
              )}
                    </div>
                  </div>
                </div>
              </form>
            </Container>
          </div>
        </Container>
      </div>
    </>
  );
}
