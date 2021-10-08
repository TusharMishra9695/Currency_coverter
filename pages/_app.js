import { useState } from "react";
import "../styles/globals.css";
import { ReactDOM } from "react-dom";
import ThemeContext, { themes } from "../public/theme-context";
import Switch from "@mui/material/Switch";
function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(themes.light);
  const toggleSwitch = () => {
    theme == themes.light ? setTheme(themes.dark) : setTheme(themes.light);
  };
  return (
    <div style={theme}>
      <ThemeContext.Provider value={theme}>
        <center>
          <Switch onChange={toggleSwitch} value={theme} />
          <span>
            {theme == themes.light
              ? "Switch to Dark Mode"
              : "Switch to Day Mode"}
          </span>
        </center>
        <Component {...pageProps} />
      </ThemeContext.Provider>
    </div>
  );
}

export default MyApp;
