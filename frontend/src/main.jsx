import "@fontsource/inter";
import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";
import store from "./redux/store";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  shape: {
    borderRadius: 12,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
);