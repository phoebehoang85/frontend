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
import { truncateStr, numberWithCommas, convertTimeStamp } from '../../utils';
import AddressCopier from '../AddressCopier/AddressCopier';
import { Divider } from '@chakra-ui/react'
import { QuestionOutlineIcon } from '@chakra-ui/icons'
import { Tooltip } from '@chakra-ui/react'

export default function PoolInfo({ title, APR, multiplier, startDate, poolLength, address, TVL, rewardPool, rewardSymbol, stakeSymbol }) {

  return (
    <Card w="full" variant="elevated">
      <CardHeader>
        <Heading size='sm' align="left">{title}</Heading>
      </CardHeader>
      <CardBody paddingTop="5px">
          <Flex flexDirection={['column', 'row']}  >
            <Stat align="left">
              <StatLabel>Pool Contract Address</StatLabel>
              <StatNumber fontSize="19px"color="#00E5ED">{<AddressCopier address={address} />}</StatNumber>
            </Stat>
            {multiplier ?
               <Stat align="left">
                 <StatLabel>{"Reward Multiplier" + " "}
                   <Tooltip label={`Multiplier determines how many ${rewardSymbol} tokens will the staker receive per 1 staked ${stakeSymbol == "NFTs" ? "NFT" : "token"} in 24 hours.`} fontSize='md'>
                     <QuestionOutlineIcon />
                   </Tooltip>
                 </StatLabel>
                 <StatNumber fontSize="19px"color="#63b3ed">{stakeSymbol == "NFTs" ? multiplier/1000000 : multiplier}</StatNumber>
               </Stat>
               :
               <Stat align="left">
                 <StatLabel>APR</StatLabel>
                 <StatNumber fontSize="19px"color="#63b3ed">{APR}%</StatNumber>
               </Stat>
            }

          </Flex>
          <Divider  paddingTop="5px" />
          <Flex flexDirection={['column', 'row']} paddingTop="5px" >
            <Stat align="left">
              <StatLabel>Start Date</StatLabel>
              <StatNumber fontSize="19px"color="#63b3ed">{convertTimeStamp(startDate)}</StatNumber>
            </Stat>
            <Stat align="left">
              <StatLabel>Pool Length
              </StatLabel>
              <StatNumber fontSize="19px"color="#63b3ed">{poolLength} days</StatNumber>
            </Stat>
          </Flex>
          <Divider  paddingTop="5px" />
          <Flex flexDirection={['column', 'row']} paddingTop="5px" >
            <Stat align="left">
              <StatLabel>{"Reward Pool" + ' '}
                <Tooltip label={`Available ${rewardSymbol} ${rewardSymbol == "NFTs" ? "" : "tokens"} to pay for stakers`} fontSize='md'>
                  <QuestionOutlineIcon />
                </Tooltip>
              </StatLabel>
              <StatNumber fontSize="19px"color="#63b3ed">{numberWithCommas(rewardPool.toFixed(3))} {rewardSymbol}</StatNumber>
            </Stat>
            <Stat align="left">
              <StatLabel>{"Total Value Locked" + ' '}
                <Tooltip label={`Total ${stakeSymbol} ${stakeSymbol == "NFTs" ? "" : "tokens"} staked into this pool`} fontSize='md'>
                  <QuestionOutlineIcon />
                </Tooltip>
              </StatLabel>
              <StatNumber fontSize="19px"color="#63b3ed">{stakeSymbol == "NFTs" ? parseInt(TVL) : numberWithCommas(TVL? TVL.toFixed(3) : 0)} {stakeSymbol}</StatNumber>
            </Stat>
          </Flex>

        </CardBody>
    </Card>
  );
}
