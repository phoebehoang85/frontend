import React from 'react';
import { Box } from '@chakra-ui/react';

import FarmTable from '../../components/PoolCreator/farmtable';

const FarmList = () => {
  return (
    <Box mx="auto" as="section" px={['16px', '24px']} maxW="container.xl">
      <FarmTable />
    </Box>
  );
};

export default FarmList;
