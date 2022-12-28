import React from 'react';
import toast from 'react-hot-toast';
import { useClipboard, Flex } from '@chakra-ui/react';

import { truncateStr } from '../../utils';

export default function AddressCopier({ address, truncated = true }) {
  const { onCopy } = useClipboard(address);

  const handleCopy = () => {
    toast.success('Address copied!');
    onCopy();
  };

  return (
    <Flex
      cursor="pointer"
      _hover={{ color: '#7ae7ff' }}
      onClick={handleCopy}
      alignItems="center"
    >
      {truncated ? truncateStr(address, 5) : address }
    </Flex>
  );
}
