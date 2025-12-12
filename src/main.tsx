import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { cyan, indigo } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

const theme = createTheme({
  palette: {
    primary: cyan,
    secondary: indigo,
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
