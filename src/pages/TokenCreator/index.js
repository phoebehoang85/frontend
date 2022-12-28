import React from 'react';
import { Box } from '@chakra-ui/react';

import CreateToken from '../../components/CreateToken/CreateToken';
import TokenList from '../../components/TokenList/TokenList';

const Home = () => {
  return (
    <Box mx="auto" as="section" px={['16px', '24px']} maxW="container.xl">
      <CreateToken />
      <TokenList />
    </Box>
  );
};

export default Home;
