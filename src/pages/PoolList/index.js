import React from 'react';
import { Box } from '@chakra-ui/react';

import PoolTable from '../../components/PoolCreator/pooltable';

const PoolList = () => {
  return (
    <Box mx="auto" as="section" px={['16px', '24px']} maxW="container.xl">
      <PoolTable />
    </Box>
  );
};

export default PoolList;
