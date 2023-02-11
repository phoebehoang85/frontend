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
import { truncateStr, numberWithCommas, secondsToTimeString } from '../../utils';
import AddressCopier from '../AddressCopier/AddressCopier';
import { Divider } from '@chakra-ui/react'
import { QuestionOutlineIcon, StarIcon } from '@chakra-ui/icons'
import { Tooltip } from '@chakra-ui/react'

export default function LPPoolHeaderInfo({ stakeName, stakeSymbol, stakeAddress, rewardName, rewardSymbol, rewardAddress, TVL, rewardPool, multiplier, expiredIn, stakedValue }) {

  return (
    <Card w="full" variant="elevated">
      <CardBody paddingTop="5px">
          <Flex flexDirection={['column', 'row']}  >
            <Stat align="left">
              <StatLabel>Stake</StatLabel>
              <StatNumber fontSize="16px"color="#00E5ED">{stakeSymbol}</StatNumber>
            </Stat>
            <Stat align="left">
              <StatLabel>Earn</StatLabel>
              <StatNumber fontSize="16px"color="#00E5ED">{rewardSymbol}</StatNumber>
            </Stat>
            <Stat align="left">
              <StatLabel>{"Total Value Locked" + ' '}
                <Tooltip label={`Total ${stakeSymbol} tokens staked into this pool`} fontSize='md'>
                  <QuestionOutlineIcon />
                </Tooltip>
              </StatLabel>
              <StatNumber fontSize="16px"color="#63b3ed">{numberWithCommas(TVL.toFixed(3))}</StatNumber>
            </Stat>
            <Stat align="left">
              <StatLabel>{"Reward Pool" + ' '}
                <Tooltip label={`Available ${rewardSymbol} ${rewardSymbol == "NFTs" ? "" : "tokens"} to pay for stakers`} fontSize='md'>
                  <QuestionOutlineIcon />
                </Tooltip>
               </StatLabel>
              <StatNumber fontSize="16px" color="#63b3ed">{numberWithCommas(rewardPool.toFixed(3))}</StatNumber>
            </Stat>
            <Stat align="left">
              <StatLabel>{"Reward Multiplier" + " "}
                <Tooltip label={`Multiplier determines how many ${rewardSymbol} tokens will the staker receive per 1 staked token in 24 hours.`} fontSize='md'>
                  <QuestionOutlineIcon />
                </Tooltip>
              </StatLabel>
              <StatNumber fontSize="16px"color="#63b3ed">{multiplier.toFixed(3)}</StatNumber>
            </Stat>
           <Stat align="left">
             <StatLabel>Expired In</StatLabel>
             <StatNumber fontSize="16px"color="#63b3ed">{secondsToTimeString(expiredIn)}</StatNumber>
           </Stat>
           {
             stakedValue > 0 ?
               <Stat align="left">
                 <StatLabel>My Stake ({stakeSymbol})</StatLabel>
                 <StatNumber fontSize="16px" color="#63b3ed">{numberWithCommas(stakedValue.toFixed(3))}  {<StarIcon  color='yellow.500' />}</StatNumber>
               </Stat>
             :
             null
           }
          </Flex>
        </CardBody>
    </Card>
  );
}
