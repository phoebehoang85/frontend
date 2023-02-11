import React from 'react';
import { Box } from '@chakra-ui/react';

import MyPools from '../../components/PoolCreator/mypools';
import MyLPPools from '../../components/PoolCreator/my_lp_pools';
import MyNFTPools from '../../components/PoolCreator/mynftpools';

const Home = () => {
  return (
    <Box mx="auto" as="section" px={['16px', '24px']} maxW="container.xl" margin="10px">
      <MyPools />
    </Box>
  );
};

export default Home;
