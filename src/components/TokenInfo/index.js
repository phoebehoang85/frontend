import React from 'react';
import toast from 'react-hot-toast';
import { Flex, Heading, HStack, Box } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react';
import { truncateStr, numberWithCommas } from '../../utils';
import AddressCopier from '../AddressCopier/AddressCopier';
import { Divider } from '@chakra-ui/react'

export default function TokenInfo({ title, name, symbol, decimal, totalSupply, icon, address }) {

  return (
    <Card w="full" variant="elevated">
      <CardHeader>
        <Heading size='sm' align="left">{title}</Heading>
      </CardHeader>
      <CardBody paddingTop="5px">
          <Flex flexDirection={['column', 'row']}  >
                <Stat align="left">
                  <StatLabel>Token Name</StatLabel>
                  <StatNumber fontSize="19px"color="#63b3ed">{name}</StatNumber>
                </Stat>
                <Stat align="left">
                  <StatLabel>Contract Address</StatLabel>
                  <StatNumber fontSize="19px"color="#00E5ED">{<AddressCopier address={address} />}</StatNumber>
                </Stat>
          </Flex>
          <Divider  paddingTop="5px" />
          <Flex flexDirection={['column', 'row']} paddingTop="5px" >
            <Stat align="left">
              <StatLabel>Total Supply</StatLabel>
              <StatNumber fontSize="19px"color="#63b3ed">{numberWithCommas(totalSupply.toFixed(3))}</StatNumber>
            </Stat>
            <Stat align="left">
              <StatLabel>Token Symbol</StatLabel>
              <StatNumber fontSize="19px"color="#63b3ed">{symbol}</StatNumber>
            </Stat>
          </Flex>
        </CardBody>
    </Card>
  );
}
