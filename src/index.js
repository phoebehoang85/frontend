import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import DefaultLayout from "layouts/default";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { toast, Toaster } from "react-hot-toast";
import {
  Provider as ReduxProvider,
  useDispatch,
  useSelector,
} from "react-redux";
import store from "./redux/store";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { formatChainStringToNumber } from "utils";
import { toastMessages } from "constants";

import FaucetPage from "pages/faucet";
import PoolsPage from "pages/pools";
import PoolDetailPage from "pages/pools/detail";
import FarmsPage from "pages/farms";
import FarmDetailPage from "pages/farms/detail";
import TokensPage from "pages/tokens";
import CreateTokenPage from "pages/create/token";
import CreateStakePoolPage from "pages/create/stake-pool";
import MyBalancePage from "pages/account/my-balance";
import jsonrpc from "@polkadot/types/interfaces/jsonrpc";
// import { setCurrentApi } from "redux/slices/walletSlice";
import { fetchUserBalance } from "redux/slices/walletSlice";
import { initialApi } from "utils/contracts";
import CreateNFTLPPage from "pages/create/nft-lp-pool";
import CreateTokenLPPage from "pages/create/token-lp-pool";

const providerUrl = process.env.REACT_APP_PROVIDER_URL;

const App = () => {
  const dispatch = useDispatch();

  const { currentAccount } = useSelector((s) => s.wallet);

  const [api, setApi] = useState(null);
  const [, setLastChainBlock] = useState(null);
  const [, setLastBlockParent] = useState(null);

  useEffect(() => {
    const setupProvider = async () => {
      const provider = new WsProvider(providerUrl);

      const wsApi = await ApiPromise.create({
        provider,
        rpc: jsonrpc,
        throwOnConnect: true,
      });

      if (!wsApi) return;

      console.log(`Successfully connected to: ${providerUrl}`);

      setApi(wsApi);

      initialApi(wsApi);

      await wsApi.rpc.chain.subscribeNewHeads((lastHeader) => {
        const lastBlock = formatChainStringToNumber(
          JSON.stringify(lastHeader.number.toHuman())
        );

        setLastChainBlock(lastBlock);
        setLastBlockParent(lastHeader.parentHash.toRawType);
      });
    };

    setupProvider().catch((error) => {
      toast.error(toastMessages.ERR_API_CONN);
      console.error("@_@ setupProvider error", error);
    });
  }, [dispatch]);

  useEffect(() => {
    if (!currentAccount?.balance) {
      currentAccount && dispatch(fetchUserBalance({ currentAccount, api }));
    }
  }, [api, currentAccount, dispatch]);

  return (
    <HashRouter>
      <Switch>
        <DefaultLayout>
          <Route path={`/faucet`}>
            <FaucetPage api={api} />
          </Route>

          <Route exact path={`/pools/:contractAddress`}>
            <PoolDetailPage api={api} />
          </Route>

          <Route exact path={`/pools`}>
            <PoolsPage api={api} />
          </Route>

          <Route
            exact
            path={`/farms/:contractAddress`}
            component={FarmDetailPage}
          />
          <Route exact path={`/farms`} component={FarmsPage} />
          <Route exact path={`/tokens`} component={TokensPage} />

          <Route exact path={`/create/token`} component={CreateTokenPage} />
          <Route
            exact
            path={`/create/stake-pool`}
            component={CreateStakePoolPage}
          />
          <Route exact path={`/create/nft-lp`} component={CreateNFTLPPage} />
          <Route exact path={`/create/token-lp`} component={CreateTokenLPPage} />
          <Redirect from="/create" to="/create/token" />

          <Route exact path={`/account`} component={MyBalancePage} />
          <Route exact path={`/account/my-balance`} component={MyBalancePage} />
          <Redirect from="/account" to="/account/my-balance" />

          <Redirect from="/" to="/faucet" />
        </DefaultLayout>
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
