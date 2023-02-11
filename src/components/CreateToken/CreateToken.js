import React from 'react';
import './CreateToken.css';
import { useSelector } from 'react-redux';
import { useEffect, useCallback, useState } from 'react';
import core_contract from '../../contracts/core_calls';
import toast from 'react-hot-toast';
import { isValidAddressPolkadotAddress, numberWithCommas, delay } from '../../utils';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import AzeroIcon from '../../theme/assets/icon/AzeroIcon.js';
import psp22_contract from '../../contracts/psp22_calls';
import wal from '../../contracts/azt';
import psp22 from '../../contracts/psp22';
import token_generator from '../../contracts/core';
import TokenInfo from '../TokenInfo';

const CreateToken = () => {
  const selectedAccount = useSelector((s) => s.substrate.selectedAccount);
  const extensionName = useSelector((s) => s.substrate.extensionName);
  const api = useSelector((s) => s.substrate.api);

  const [AZeroBalance, setAZeroBalance] = useState(0);
  const [walBalance, setWalBalance] = useState(0);
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDecimal, setTokenDecimal] = useState(12);
  const [mintAddress, setMintAddress] = useState('');
  const [totalSupply, setTotalSupply] = useState(0);
  const [creationFee, setCreationFee] = useState(0);

  const onChangeBet = useCallback((e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    let betValue = 0;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      betValue = parseFloat(value);
    }
  });
  const getBalance = async () => {
    if (!api) return;
    if (selectedAccount != '') {
      const { _nonce, data: balance } = await api.query.system.account(
        selectedAccount
      );
      setAZeroBalance(balance.free / 10 ** 12 - balance.miscFrozen / 10 ** 12);

      psp22_contract.setPSP22Contract(api, {
        CONTRACT_ADDRESS: wal.CONTRACT_ADDRESS,
        CONTRACT_ABI: psp22.CONTRACT_ABI,
      });
      let wal_balance = await psp22_contract.balanceOf(
        selectedAccount,
        selectedAccount
      );
      setWalBalance(wal_balance);
    }
    let creationFee = await core_contract.getCreationFee(selectedAccount);
    setCreationFee(creationFee);
  };
  useEffect(() => {
    setMintAddress(selectedAccount);
  }, [selectedAccount]);

  useEffect(() => {
    getBalance();
  }, [selectedAccount, api]);

  const createToken = async () => {
    if (!api || selectedAccount==""){
      toast.error("Please connect your wallet");
      return;
    }
    if (!totalSupply) {
      toast.error('Invalid Token Supply');
      return;
    }
    if (!tokenName) {
      toast.error('Invalid Token Name');
      return;
    }
    if (!tokenSymbol) {
      toast.error('Invalid Token Symbol');
      return;
    }
    if (!isValidAddressPolkadotAddress(mintAddress)) {
      toast.error('Invalid Mint Address');
      return;
    }
    if (AZeroBalance == 0) {
      toast.error('You need Azero to perform this action');
      return;
    }
    if (creationFee >= walBalance) {
      toast.error(`You need ${creationFee} WAL to perform this action. Please acquire WAL tokens in 'WAL Tokens' Menu`);
      return;
    }
    //Approve WAL token
    toast('Step 1');
    psp22_contract.setPSP22Contract(api, {
      CONTRACT_ADDRESS: wal.CONTRACT_ADDRESS,
      CONTRACT_ABI: psp22.CONTRACT_ABI,
    });
    console.log('selectedAccount', selectedAccount);
    console.log('extensionName', extensionName);
    console.log('token_generator', token_generator.CONTRACT_ADDRESS);
    console.log('creationFee', creationFee);
    console.log('walBalance', walBalance);
    let approve = await psp22_contract.approve(
      selectedAccount,
      extensionName,
      token_generator.CONTRACT_ADDRESS,
      creationFee
    );
    if (!approve) return;
    await delay(3000);
    toast('Step 2');
    let newToken = await core_contract.newToken(
      selectedAccount,
      extensionName,
      mintAddress,
      totalSupply,
      tokenName,
      tokenSymbol,
      tokenDecimal
    );
    await delay(3000);
    getBalance();
  };

  return (
    <Box
      px="8px"
      textAlign="center"
      className="ROI--wrapper"
      boxShadow="0px 0px 10px 2px rgba(9, 111, 125, 0.3);"
    >
      <Heading fontSize="32px" fontWeight="normal">
        Create Token
      </Heading>

      <Text
        py={['15px', '30px']}
        maxW={['330px', '640px']}
        mx="auto"
        color="white"
      >
        Create standard PSP22 (ERC20) token and mint the total supply to a specific address. The creation
        requires {creationFee} WAL
      </Text>

      <Flex flexDirection={['column', 'row']}>
        <VStack
          w="full"
          spacing="20px"
          px={['0px', '30px']}
          pb={['30px', '30px']}
        >
          <Box w="full" className="ROI--cont-box">
            <Text className="title">Token Name</Text>

            <span className="ROI--input-updateBox">
              <input
                type="text"
                value={tokenName}
                defaultValue="0.1"
                onChange={(e) => setTokenName(e.target.value)}
                className="ROI--input-updateBox"
              />
            </span>
          </Box>
          <Box w="full" className="ROI--cont-box">
            <Text className="title">Token Symbol</Text>

            <span className="ROI--input-updateBox">
              <input
                type="text"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
                className="ROI--input-updateBox"
              />
            </span>
          </Box>
          <Box w="full" className="ROI--cont-box" hidden>
            <Text className="title">Token Decimal</Text>

            <span className="ROI--input-updateBox">
              <input
                type="number"
                value={tokenDecimal}
                onChange={(e) => setTokenDecimal(e.target.value)}
                className="ROI--input-updateBox"
              />
            </span>
          </Box>
          <Box w="full" className="ROI--cont-box">
            <Text className="title">Total Supply</Text>

            <span className="ROI--input-updateBox">
              <input
                type="number"
                value={totalSupply}
                onChange={(e) => setTotalSupply(e.target.value)}
                className="ROI--input-updateBox"
              />
            </span>
          </Box>
        </VStack>
        <VStack
          w="full"
          spacing="20px"
          px={['0px', '30px']}
          pb={['30px', '30px']}
        >

          <Box w="full" className="ROI--cont-box">
            <Text className="title">Mint to</Text>
            <span className="ROI--input-updateBox">
              <input
                type="text"
                value={mintAddress}
                onChange={(e) => setMintAddress(e.target.value)}
                className="ROI--input-updateBox"
              />
            </span>
          </Box>
          <Box w="full" className="ROI--cont-box">
            <Text className="title">Your Balance</Text>
            <HStack alignItems="center">
              <Text className="ROI--input-updateBox">
                {AZeroBalance ? AZeroBalance.toFixed(3) : 0}{' '}
                <AzeroIcon w="12px" h="12px" mb="4px" />
              </Text>
            </HStack>
          </Box>
          <Box w="full" className="ROI--cont-box">
            <Text className="title">Your WAL Balance</Text>
            <HStack alignItems="center">
              <Text className="ROI--input-updateBox">
                {walBalance ? numberWithCommas(walBalance.toFixed(3)) : 0}{' '}
                WAL
              </Text>
            </HStack>
          </Box>
        </VStack>
      </Flex>
      <Box w={['full', '50%']} margin="auto">
        <Button
          h="52px"
          w="full"
          colorScheme="messenger"
          onClick={() => createToken()}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default CreateToken;
