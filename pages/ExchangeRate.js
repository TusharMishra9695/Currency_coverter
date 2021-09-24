import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Button, Container } from "@mui/material";
import { data } from "../public/data";
export default function ExchangeRate() {
  const [country2, setCountry2] = useState([]);
  const [texthandle, setTexthandle] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    if (texthandle === false) {
      const res = await fetch(
        "http://data.fixer.io/api/latest?access_key=0ae329c5f31ee61cff8dda76ab72f43c"
      );
      const postData = await res.json();
      setCountry2(postData.rates);
      setTexthandle(true);
    } else {
      alert("api already called");
    }
  }

  return (
    <>
      <NavBar />
      {data.map((data, index) => {
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
      })}

      {/* <button onClick={getData}></button> */}
    </>
  );
}
