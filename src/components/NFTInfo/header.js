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
import ImageCloudFlare from '../ImageCF/ImageCloudFlare';

export default function NFTHeaderInfo({ imageUrl, imageName, nftContractAddress, nftName, rewardName, rewardSymbol, rewardAddress, TVL, rewardPool, multiplier, expiredIn, stakedValue}) {

  return (
    <Card w="full" variant="elevated">
      <CardBody paddingTop="5px">
          <Flex flexDirection={['column', 'row']} wrap >
            <Box w='150px' >
              <Stat align="center" margin="5px">
                <StatNumber fontSize="16px"color="#00E5ED">
                  <ImageCloudFlare
                    h={'70px'}
                    w={'70px'}
                    src={imageUrl}
                    alt={imageName}
                  />
                </StatNumber>
              </Stat>
            </Box>
            <Stat align="left" marginRight="10px">
              <StatLabel>Stake</StatLabel>
              <StatNumber fontSize="16px"color="#00E5ED">{nftName}</StatNumber>
            </Stat>
            <Box w='110px' >
              <Stat align="left">
                <StatLabel>Earn</StatLabel>
                <StatNumber fontSize="16px"color="#00E5ED">{rewardSymbol}</StatNumber>
              </Stat>
            </Box>
            <Stat align="left">
              <StatLabel>{"Total Value Locked" + ' '}
                <Tooltip label={`Total NFT staked into this pool`} fontSize='md'>
                  <QuestionOutlineIcon />
                </Tooltip>
              </StatLabel>
              <StatNumber fontSize="16px"color="#63b3ed">{TVL} NFT{ TVL > 1 ? "s" : "" }</StatNumber>
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
                <Tooltip label={`Multiplier determines how many ${rewardSymbol} tokens will the staker receive per 1 NFT in 24 hours.`} fontSize='md'>
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
              <Box w='50px' >
                 <Stat align="center">
                   <StatNumber fontSize="16px" color="#63b3ed" align="center">{<StarIcon  color='yellow.500' />}</StatNumber>
                 </Stat>
               </Box>
             :
             null
           }
          </Flex>
        </CardBody>
    </Card>
  );
}
