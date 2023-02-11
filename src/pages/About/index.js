import {
  Box,
  Flex,
  Heading,
  ListIcon,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import { IoMdCheckmarkCircle, IoMdSettings } from 'react-icons/io';
import { images } from '../../constants';
import './About.css';
// <p className='top--description'>
//    Join our Telegram Group: <span><a  style={{color: "#00E5ED"}} href="https://t.me/" target="_blank">https://t.me/</a></span>
//    <br/>Follow our Twitter: <span><a style={{color: "#00E5ED"}} href="https://twitter.com/" target="_blank">https://twitter.com/</a></span>
//  </p>
const About = () => {
  return (
    <Box
      minH="100vh"
      mx="auto"
      as="section"
      px={['16px', '24px']}
      maxW="container.xl"
    >
      <Heading
        mt="100px"
        fontSize="32px"
        textAlign="center"
        fontWeight="normal"
      >
        About us
      </Heading>

      <Box
        textAlign="left"
        px="8px"
        className="ROI--wrapper"
        boxShadow="0px 0px 10px 2px rgba(9, 111, 125, 0.3);"
      >
        <Flex w="full">
          <Stack w="full" spacing="20px" px={['15px', '30px']}>
            <Text textAlign="left" color="#fff">
              One of the most powerful feature of ink! Smart Contract in
              Substrate-based blockchains such as Aleph Zero is the ability to
              deploy the contract code once and then unlimited number of smart
              contracts can be initialized with very low cost.
            </Text>

            <Text textAlign="left" color="#fff">
              To demonstrate the idea, we create a set of pre-deployed contract
              code and allow anyone to create smart contracts on Aleph Zero with
              a few clicks.
            </Text>

            <Text textAlign="left" color="#fff">
              We currently have:
            </Text>
            <UnorderedList>
              <ListItem>
                <ListIcon as={IoMdCheckmarkCircle} color="blue.500" />
                PSP22 (ERC20) Token Creator
              </ListItem>
              <ListItem>
                <ListIcon as={IoMdCheckmarkCircle} color="blue.500" />
                Free AZT Token Minting
              </ListItem>
              <ListItem>
                <ListIcon as={IoMdCheckmarkCircle} color="blue.500" />
                Token Tool: allow you to check token information, check balance
                of any account, transfer and burn tokens
              </ListItem>
            </UnorderedList>

            <Text textAlign="left" color="#fff">
              We are working on:{' '}
            </Text>
            <UnorderedList>
              <ListItem>
                <ListIcon as={IoMdSettings} color="blue.500" />
                Farming Pool: allow token owners to stake and earn more tokens{' '}
              </ListItem>
            </UnorderedList>
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
};

export default About;
