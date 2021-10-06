import { useEffect, useState } from "react";
import { Container, FormControl, Select, TextField } from "@mui/material";
import { getCachedData } from "../public/funct";
export default function Home() {
  const [get, setget] = useState(false);
  const [country, setCountry] = useState([]);
  const [value, setValue] = useState({
    value1: "AED",
    value2: "AED",
    text1: 1,
    text2: 1,
    texthandle: false,
  });
  const [time, setTime] = useState([]);
  useEffect(() => {
    getDatas();
  }, []);
  async function getDatas() {
    const cacheVersion = 1;
    const cacheName = `myapp-${cacheVersion}`;
    const url =
      "http://data.fixer.io/api/latest?access_key=0ae329c5f31ee61cff8dda76ab72f43c";

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
    setValue({
      ...value,
      texthandle: true,
    });
    setTime(postData);
  }

  function convert(e) {
    e.preventDefault();
    console.log("i am called");
    setValue({
      ...value,
      text2: (
        (country[value.value2] / country[value.value1]) *
        value.text1
      ).toFixed(2),
    });
  }
  function handleSwap(e) {
    e.preventDefault();
    setValue({
      ...value,
      text2: value.text1,
      value2: value.value1,
      text1: (
        (country[value.value2] / country[value.value1]) *
        value.text1
      ).toFixed(2),
      value1: value.value2,
    });
  }
  function converts(e) {
    e.preventDefault();
    setValue({
      ...value,
      text1: (
        value.text2 /
        (country[value.value2] / country[value.value1])
      ).toFixed(2),
    });
  }

  return (
    <>
      <Container style={{ marginTop: "10px" }}>
        <div
          style={{
            width: "700px",
            boxShadow: "1px 1px 2px 2px #EFEFEF",
            paddingBottom: "40px",
          }}
        >
          <Container>
            <div>
              <h2 style={{ marginBottom: "-25px" }}>
                {value.text1} {value.value1} =
              </h2>
              <h1 style={{ marginBottom: "0px" }}>
                {value.text2} {value.value2}
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
                      style={{ backgroundColor: "#EFEFEF", width: "290px" }}
                      onChange={(e) => {
                        setValue({
                          ...value,
                          value1: e.target.value,
                        });
                      }}
                      variant="outlined"
                    >
                      <Select onClick={converts} native>
                        {Object.keys(country).map((currency2, index) => {
                          return (
                            <option key={index} value={currency2}>
                              {currency2} &#8596; ({value.value1})
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <TextField
                      style={{
                        backgroundColor: "white",
                        width: "290px",
                        height: "60px",
                      }}
                      variant="outlined"
                      onChange={(e) => {
                        setValue({
                          ...value,
                          text1: e.target.value,
                        });
                      }}
                      value={value.text1 || ""}
                      autoComplete="off"
                      onClick={converts}
                    ></TextField>
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
                      style={{ backgroundColor: "#EFEFEF", width: "290px" }}
                      onChange={(e) => {
                        setValue({ ...value, value2: e.target.value });
                      }}
                      variant="outlined"
                    >
                      <Select onClick={convert} native>
                        {Object.keys(country).map((currency2, index) => {
                          return (
                            <option key={index} value={currency2}>
                              {currency2} &#8596; ({value.value2})
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <TextField
                      style={{
                        backgroundColor: "white",
                        width: "290px",
                        height: "60px",
                      }}
                      onChange={(e) => {
                        setValue({
                          ...value,
                          text2: e.target.value,
                        });
                      }}
                      onClick={convert}
                      value={value.text2 || ""}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
            </form>
          </Container>
        </div>
      </Container>
    </>
  );
}
