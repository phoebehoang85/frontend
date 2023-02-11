import React from 'react';
import { Box } from '@chakra-ui/react';

import PoolCreatorForm from '../../components/PoolCreator/form';
import MyPools from '../../components/PoolCreator/mypools';

const Home = () => {
  return (
    <Box mx="auto" as="section" px={['16px', '24px']} maxW="container.xl">
      <PoolCreatorForm />
      <MyPools />
    </Box>
  );
};

export default Home;
