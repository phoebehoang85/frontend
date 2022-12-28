import React from 'react';
import toast from 'react-hot-toast';
import { Flex, Heading, HStack, Box, Text } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react';
import { truncateStr, numberWithCommas, convertTimeStamp } from '../../utils';
import AddressCopier from '../AddressCopier/AddressCopier';
import { Divider } from '@chakra-ui/react'
import { QuestionOutlineIcon } from '@chakra-ui/icons'
import { Tooltip } from '@chakra-ui/react'
import AzeroIcon from '../../theme/assets/icon/AzeroIcon.js';
// import { MdOutlineAccountBalanceWallet } from "react-icons/md";
// import { Icon } from '@chakra-ui/react'

export default function AccountInfo({ address, AzeroBalance, token1Balance, token1Symbol, token2Balance, token2Symbol, token3Balance, token3Symbol }) {

  return (
    <Card w="full" variant="elevated">
      <CardHeader>
        <Heading size='sm' align="left">My Account </Heading>
      </CardHeader>
      <CardBody paddingTop="5px">
          <Flex flexDirection={['column', 'row']}  >
            <Stat align="left">
              <StatLabel>Account Address</StatLabel>
              <StatNumber fontSize="19px"color="#00E5ED">{address != "" ? <AddressCopier address={address} /> : "No Account selected"}</StatNumber>
            </Stat>
          </Flex>
          <Divider  paddingTop="5px" />
          <Flex flexDirection={['column', 'row']}  paddingTop="5px" >
            <Stat align="left">
              <StatLabel>Azero Balance</StatLabel>
              <StatNumber fontSize="19px"color="#63b3ed">{numberWithCommas(AzeroBalance.toFixed(3))} <AzeroIcon w="12px" h="12px" mb="4px" /></StatNumber>
            </Stat>
          </Flex>

          {token1Symbol ?
            <>
              <Divider  paddingTop="5px" />
              <Flex flexDirection={['column', 'row']}  paddingTop="5px" >
                <Stat align="left">
                  <StatLabel>{token1Symbol} Balance</StatLabel>
                  <StatNumber fontSize="19px"color="#63b3ed">{token1Balance != null ? numberWithCommas(token1Balance.toFixed(3)) : ""}</StatNumber>
                </Stat>
              </Flex>
            </>
          : null}
          {token2Symbol ?
            <>
              <Divider  paddingTop="5px" />
              <Flex flexDirection={['column', 'row']}  paddingTop="5px" >
                <Stat align="left">
                  <StatLabel>{token2Symbol} Balance</StatLabel>
                  <StatNumber fontSize="19px"color="#63b3ed">{token2Balance != null ? numberWithCommas(token2Balance.toFixed(3)) : ""}</StatNumber>
                </Stat>
              </Flex>
            </>
          : null}
          {token3Symbol ?
            <>
              <Divider  paddingTop="5px" />
              <Flex flexDirection={['column', 'row']}  paddingTop="5px" >
                <Stat align="left">
                  <StatLabel>{token3Symbol} Balance</StatLabel>
                  <StatNumber fontSize="19px"color="#63b3ed">{token3Balance != null ? numberWithCommas(token3Balance.toFixed(3)) : ""}</StatNumber>
                </Stat>
              </Flex>
            </>
          : null}
        </CardBody>
    </Card>
  );
}
