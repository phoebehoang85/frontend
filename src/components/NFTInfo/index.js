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
import ImageCloudFlare from '../ImageCF/ImageCloudFlare';
import { FaTwitter, FaGlobe } from "react-icons/fa";
import { Icon } from '@chakra-ui/react';
import AzeroIcon from '../../theme/assets/icon/AzeroIcon.js';

export default function NFTInfo({ title, nft_info }) {
  // console.log(title,nft_info)
  return (
    <Card w="full" variant="elevated">
      <CardHeader>
        <Heading size='sm' align="left">{title}</Heading>
      </CardHeader>
      <CardBody paddingTop="5px">
          <Flex flexDirection={['column', 'row']}  >
            <Stat align="left">
              <StatNumber color="#63b3ed">
                <ImageCloudFlare
                  h={'150px'}
                  w={'150px'}
                  src={nft_info.avatarImage}
                  alt={`${nft_info.name}`}
                />
              </StatNumber>
            </Stat>
            <Stat align="left">
              <StatLabel>Collection Name</StatLabel>
              <StatNumber color="#63b3ed">{nft_info.name}</StatNumber>
            </Stat>
          </Flex>
          <Divider  paddingTop="5px" />
          <Flex flexDirection={['column', 'row']} paddingTop="5px" >
            <Stat align="left">
              <StatLabel>NFT Contract Address</StatLabel>
              <StatNumber color="#00E5ED">{<AddressCopier address={nft_info.nftContractAddress} />}</StatNumber>
            </Stat>
            <Stat align="left">
              <StatLabel>ArtZero Collection Link</StatLabel>
              <StatNumber color="#63b3ed"><a href={"https://artzero.io/demotestnet/#/collection/"+nft_info.nftContractAddress} target="_blank">{nft_info.name}</a></StatNumber>
            </Stat>
          </Flex>
          <Divider  paddingTop="5px" />
          <Flex flexDirection={['column', 'row']} paddingTop="5px" >
            <Stat align="left">
              <StatLabel>NFT Supply</StatLabel>
              <StatNumber color="#63b3ed">{nft_info.nft_count}</StatNumber>
            </Stat>
            <Stat align="left">
              <StatLabel>Royalty Fee</StatLabel>
              <StatNumber color="#63b3ed">{nft_info.royalFee / 100}%</StatNumber>
            </Stat>
          </Flex>
          <Divider  paddingTop="5px" />
          <Flex flexDirection={['column', 'row']} paddingTop="5px" >
            <Stat align="left">
              <StatLabel>Social Links</StatLabel>
              <StatNumber color="#63b3ed"><a href={nft_info.website} target="_blank"> <Icon as={FaGlobe} /></a> <a href={nft_info.twitter} target="_blank"><Icon as={FaTwitter} /></a></StatNumber>
            </Stat>
            <Stat align="left">
              <StatLabel>Volume</StatLabel>
              <StatNumber color="#63b3ed">{numberWithCommas(nft_info.volume.toFixed(3))} <AzeroIcon w="12px" h="12px" mb="4px" /></StatNumber>
            </Stat>
          </Flex>
        </CardBody>
    </Card>
  );
}
