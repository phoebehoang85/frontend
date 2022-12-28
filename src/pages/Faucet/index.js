import React from 'react';
import { Box } from '@chakra-ui/react';

import TokenFaucet from '../../components/Faucet/tokenfaucet';
import WAL_Mint from '../../components/AZT_Mint';

const Faucet = () => {
  return (
    <Box mx="auto" as="section" px={['16px', '24px']} maxW="container.xl">
      <TokenFaucet />
      <WAL_Mint/>
    </Box>
  );
};

export default Faucet;
