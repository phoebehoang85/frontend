import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import LPPoolCreatorForm from '../../components/PoolCreator/lp_form';
import MyLPPools from '../../components/PoolCreator/my_lp_pools';

const LPPoolCreator = () => {
  return (
    <Box mx="auto" as="section" px={['16px', '24px']} maxW="container.xl">
        <LPPoolCreatorForm />
        <MyLPPools />
    </Box>
  );
};

export default LPPoolCreator;
