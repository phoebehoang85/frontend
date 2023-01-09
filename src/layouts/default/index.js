import { Portal, Box, useDisclosure } from "@chakra-ui/react";
import Footer from "components/footer/FooterLandingPage.js";

import Navbar from "components/navbar/Navbar.js";
import { SidebarContext } from "contexts/SidebarContext";
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import FaucetPage from "pages/faucet";
import PoolsPage from "pages/pools";
import PoolDetailPage from "pages/pools/detail";
import FarmsPage from "pages/farms";
import FarmDetailPage from "pages/farms/detail";
import TokensPage from "pages/tokens";
import CreateTokenPage from "pages/create/token";
import CreateStakePoolPage from "pages/create/stake-pool";
import CreateLPPage from "pages/create/lp-pool";
import MyBalancePage from "pages/account/my-balance";

export default function Default(props) {
  const { ...rest } = props;

  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  document.documentElement.dir = "ltr";

  const { onOpen } = useDisclosure();

  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <div id="hero"></div>
        <Box
          w="100%"
          height="100%"
          minHeight="100vh"
          maxHeight="100%"
          overflow="auto"
          position="relative"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
        >
          <Portal>
            <Box>
              <Navbar
                {...rest}
                fixed={fixed}
                onOpen={onOpen}
                logoText={"Ink Whale"}
              />
            </Box>
          </Portal>

          <Box mx="auto" minH="100vh" pt={["65px", "92px"]}>
            <Switch>
              <Route path={`/faucet`} component={FaucetPage} />

              <Route
                path={`/pools/:contractAddress`}
                component={PoolDetailPage}
              />
              <Route path={`/pools`} component={PoolsPage} />

              <Route
                path={`/farms/:contractAddress`}
                component={FarmDetailPage}
              />
              <Route path={`/farms`} component={FarmsPage} />
              <Route path={`/tokens`} component={TokensPage} />

              <Route path={`/create/token`} component={CreateTokenPage} />
              <Route
                path={`/create/stake-pool`}
                component={CreateStakePoolPage}
              />
              <Route path={`/create/nft-lp`} component={CreateLPPage} />
              <Route path={`/create/token-lp`} component={CreateLPPage} />
              <Redirect from="/create" to="/create/token" />

              <Route path={`/account`} component={MyBalancePage} />
              <Route path={`/account/my-balance`} component={MyBalancePage} />
              <Redirect from="/account" to="/account/my-balance" />

              <Redirect from="/" to="/faucet" />
            </Switch>
          </Box>

          <Box>
            <Footer />
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
