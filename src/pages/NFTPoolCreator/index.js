import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import NFTPoolCreatorForm from '../../components/PoolCreator/nft_form';
import MyNFTPools from '../../components/PoolCreator/mynftpools';

const NFTPoolCreator = () => {
  return (
    <Box mx="auto" as="section" px={['16px', '24px']} maxW="container.xl">
      <NFTPoolCreatorForm />
      <MyNFTPools />
    </Box>
  );
};

export default NFTPoolCreator;
