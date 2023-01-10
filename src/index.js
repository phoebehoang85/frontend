import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import DefaultLayout from "layouts/default";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { toast, Toaster } from "react-hot-toast";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { formatChainStringToNumber } from "utils";
import { toastMessages } from "constants";

const providerUrl = process.env.REACT_APP_PROVIDER_URL;

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [api, setApi] = useState(null);
  const [, setLastChainBlock] = useState(null);
  const [, setLastBlockParent] = useState(null);

  useEffect(() => {
    const setupProvider = async () => {
      const provider = new WsProvider(providerUrl);

      const wsApi = await ApiPromise.create({ provider, throwOnConnect: true });

      if (!wsApi) return;

      console.log(`Successfully connected to: ${providerUrl}`);

      setApi(wsApi);

      await wsApi.rpc.chain.subscribeNewHeads((lastHeader) => {
        const lastBlock = formatChainStringToNumber(
          JSON.stringify(lastHeader.number.toHuman())
        );

        setLastChainBlock(lastBlock);
        setLastBlockParent(lastHeader.parentHash.toRawType);
      });
    };

    setupProvider().catch((error) => {
      toast.error(toastMessages.ERROR_API_CONN);
      console.error("@_@ setupProvider error", error);
    });
  }, []);

  return (
    <HashRouter>
      <Switch>
        <Route path={`/`} component={DefaultLayout} />
      </Switch>
    </HashRouter>
  );
};

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ReduxProvider store={store}>
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

        <App />
      </ReduxProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
