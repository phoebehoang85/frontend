import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import DefaultLayout from "layouts/default";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { Toaster } from "react-hot-toast";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <Toaster
        position="bottom-right"
        reverseOrder={true}
        toastOptions={{
          style: {
            padding: "8px",
            fontSize: "16px",
            color: "#57527E",
            borderRadius: "5px",
            background: "#E8FDFF",
          },
        }}
      />
      <HashRouter>
        <Switch>
          <Route path={`/`} component={DefaultLayout} />
        </Switch>
      </HashRouter>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
