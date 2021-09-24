import { useEffect, useState } from "react";
import { Container, FormControl, Select, TextField } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
export default function Home() {
  const [country, setCountry] = useState([]);
  const [value, setValue] = useState({
    value1: 1,
    value2: 1,
    text1: 1,
    text2: 1,
    texthandle: false,
  });
  const [time, setTime] = useState([]);
  const [select, setSelect] = useState({
    select1: "AED",
    select2: "AED",
  });

  const [select2, setSelect2] = useState("AED");

  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    if (value.texthandle === false) {
      const res = await fetch(
        "http://data.fixer.io/api/latest?access_key=0ae329c5f31ee61cff8dda76ab72f43c"
      );
      const postData = await res.json();
      console.log(postData.rates);
      // console.log(country);

      setCountry(postData.rates);
      setValue({
        ...value,
        texthandle: true,
      });
      setTime(postData);

      // console.log("I am " + country);
    } else {
      alert("api already called");
    }
  }
  function convert(e) {
    e.preventDefault();
    {
      Object.keys(country).map((currency) => {
        // console.log(value.value1);
        if (value.value1 != 1) {
          if (country[currency] == value.value1) {
            // console.log(currency);
            setSelect({
              ...select,
              select1: currency,
            });
          }
        }
        if (value.value2 != 1) {
          if (country[currency] == value.value2) {
            setSelect2(currency);
          }
        }
      });
    }

    setValue({
      ...value,
      text2: (value.value2 / value.value1) * value.text1,
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
                {value.text1} {select.select1} =
              </h2>
              <h1 style={{ marginBottom: "0px" }}>
                {value.text2} {select2}
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
                      onClick={convert}
                      variant="outlined"
                    >
                      <Select native>
                        {Object.keys(country).map((currency2, index) => {
                          return (
                            <option key={index} value={country[currency2]}>
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
                    />
                  </div>
                </div>
                <div>
                  <CompareArrowsIcon style={{ marginTop: "25px" }} />
                </div>
                <div>
                  <div>
                    <FormControl
                      style={{ backgroundColor: "#EFEFEF", width: "290px" }}
                      onChange={(e) => {
                        setValue({ ...value, value2: e.target.value });
                      }}
                      onClick={convert}
                      variant="outlined"
                    >
                      <Select native>
                        {Object.keys(country).map((currency2, index) => {
                          return (
                            <option key={index} value={country[currency2]}>
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
