import React from 'react';
import Header from './components/header/Header';
import TokenCreator from './pages/TokenCreator';
import About from './pages/About/';
import AZT from './pages/AZT';
import Token from './pages/Tool';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Container } from '@chakra-ui/react';
import PoolCreator from './pages/PoolCreator';
import PoolList from './pages/PoolList';
import FarmList from './pages/FarmList';
import NFTPoolCreator from './pages/NFTPoolCreator';
import LPPoolCreator from './pages/LPPoolCreator';
import ViewNFTPool from './pages/ViewNFTPool';
import ViewPool from './pages/ViewPool';
import ViewLPPool from './pages/ViewLPPool';
import Faucet from './pages/Faucet';
import MyAccount from './pages/MyAccount';

import MyNFTPool from './pages/MyNFTPool';
import MyPool from './pages/MyPool';
import MyLPPool from './pages/MyLPPool';

import MyNFTPools from './pages/MyAccount/MyNFTPools';
import MyPools from './pages/MyAccount/MyPools';
import MyLPPools from './pages/MyAccount/MyLPPools';

function App() {
  return (
    <Container id="layout-container" minW="full" minH="100vh" p="0" pb="60px">
      <Toaster
        position="bottom-left"
        reverseOrder={true}
        toastOptions={{
          style: {
            marginRight: '2rem',
            borderRadius: 0,
            padding: '16px',
            color: '#000',
            background: '#7AE7FF',
          },
        }}
      />

      <Header />

      <Routes>
        <Route exact path="/" element={<PoolList />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/wal" element={<AZT />} />
        <Route exact path="/token" element={<Token />} />
        <Route exact path="/pool-creator" element={<PoolCreator />} />
        <Route exact path="/pool-list" element={<PoolList />} />
        <Route exact path="/farm-list" element={<FarmList />} />
        <Route exact path="/token-creator" element={<TokenCreator />} />
        <Route exact path="/nft-pool-creator" element={<NFTPoolCreator />} />
        <Route exact path="/lp-pool-creator" element={<LPPoolCreator />} />
        <Route exact path="/nft-pool/:nftPoolAddress" element={<ViewNFTPool />} />
        <Route exact path="/lp-pool/:lpPoolAddress" element={<ViewLPPool />} />
        <Route exact path="/pool/:PoolAddress" element={<ViewPool />} />
        <Route exact path="/faucet" element={<Faucet />} />
        <Route exact path="/my-pools" element={<MyPools />} />
        <Route exact path="/my-lp-pools" element={<MyLPPools />} />
        <Route exact path="/my-nft-pools" element={<MyNFTPools />} />
        <Route exact path="/my-pool/:PoolAddress" element={<MyPool />} />
        <Route exact path="/my-nft-pool/:nftPoolAddress" element={<MyNFTPool />} />
        <Route exact path="/my-lp-pool/:lpPoolAddress" element={<MyLPPool />} />
      </Routes>
    </Container>
  );
}

export default App;
