import FaucetPage from "pages/faucet";
import PoolsPage from "pages/pools";
import FarmsPage from "pages/farms";
import TokensPage from "pages/tokens";
import CreateTokenPage from "pages/create/token";
import CreateStakePoolPage from "pages/create/stake-pool";
import CreateLPPage from "pages/create/lp-pool";
import MyBalancePage from "pages/account/my-balance";

const routes = [
  {
    layout: "/default",
    path: "/faucet",
    component: FaucetPage,
  },
  {
    layout: "/default",
    path: "/pools",
    component: PoolsPage,
  },
  {
    layout: "/default",
    path: "/farms",
    component: FarmsPage,
  },
  {
    layout: "/default",
    path: "/tokens",
    component: TokensPage,
  },
  {
    layout: "/default",
    path: "/create/token",
    component: CreateTokenPage,
  },
  {
    layout: "/default",
    path: "/create/stake-pool",
    component: CreateStakePoolPage,
  },
  {
    layout: "/default",
    path: "/create/nft-lp",
    component: CreateLPPage,
  },
  {
    layout: "/default",
    path: "/create/tokens-lp",
    component: CreateLPPage,
  },
  {
    layout: "/default",
    path: "/create",
    component: CreateTokenPage,
  },
  {
    layout: "/default",
    path: "/account/my-balance",
    component: MyBalancePage,
  },
  {
    layout: "/default",
    path: "/account/my-pools",
    component: MyBalancePage,
  },
];

export default routes;
