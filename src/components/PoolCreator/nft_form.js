import React from 'react';
import '../CreateToken/CreateToken.css';
import { useSelector } from 'react-redux';
import { useEffect, useCallback, useState } from 'react';
import pool_generator_contract from '../../contracts/pool_generator_calls';
import psp22_contract from '../../contracts/psp22_calls';
import psp22 from '../../contracts/psp22';
import wal from '../../contracts/azt';
import toast from 'react-hot-toast';
import { delay, isValidAddressPolkadotAddress, numberWithCommas } from '../../utils';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Select,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import AzeroIcon from '../../theme/assets/icon/AzeroIcon.js';
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import './datetime.css';
import './calendar.css';
import core_contract from '../../contracts/core_calls';
import { truncateStr } from '../../utils';
import token_generator from '../../contracts/core';
import pool_generator from '../../contracts/pool_generator';
import nft_pool_generator from '../../contracts/nft_pool_generator';
import nft_pool_generator_calls from '../../contracts/nft_pool_generator_calls';
import { azclientAPI } from '../../api/az_client';
import { clientAPI } from '../../api/client';
import { useDispatch } from 'react-redux';


const NFTPoolCreatorForm = () => {
  const selectedAccount = useSelector((s) => s.substrate.selectedAccount);
  const extensionName = useSelector((s) => s.substrate.extensionName);
  const api = useSelector((s) => s.substrate.api);
  const dispatch = useDispatch();

  const [AZeroBalance, setAZeroBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [tokenContract, setTokenContract] = useState('');
  const [NFTtokenContract, setNFTTokenContract] = useState('');
  const [multiplier, setMultiplier] = useState(0);
  const [duration, setDuration] = useState(0);
  const [startTime, onChangeStartTime] = useState(new Date());
  const [walBalance, setWalBalance] = useState(0);
  const [creationFee, setCreationFee] = useState(0);

  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDecimal, setTokenDecimal] = useState(0);

  const loadToken = async () => {
    if (!isValidAddressPolkadotAddress(tokenContract)) {
      return;
    }
    psp22_contract.setPSP22Contract(api, {
      CONTRACT_ADDRESS: tokenContract,
      CONTRACT_ABI: psp22.CONTRACT_ABI,
    });
    let tokenName = await psp22_contract.tokenName(selectedAccount);
    let tokenSymbol = await psp22_contract.tokenSymbol(selectedAccount);
    let tokenDecimal = await psp22_contract.tokenDecimals(selectedAccount);
    setTokenName(tokenName);
    setTokenSymbol(tokenSymbol);
    setTokenDecimal(tokenDecimal);

    let token_balance = await psp22_contract.balanceOf(
      selectedAccount,
      selectedAccount
    );
    setTokenBalance(token_balance);


  };

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
    let creationFee = await nft_pool_generator_calls.getCreationFee(selectedAccount);
    setCreationFee(creationFee);
  };
  useEffect(() => {
    getBalance();
    loadToken();
  }, [selectedAccount, api]);

  useEffect(() => {
    loadToken();
  }, [tokenContract]);

  const createPool = async () => {
    console.log(startTime.getTime());
    if (!api || selectedAccount==""){
      toast.error("Please connect your wallet");
      return;
    }
    console.log('tokenContract', tokenContract);
    if (!isValidAddressPolkadotAddress(NFTtokenContract)) {
      toast.error('Invalid NFT Contract Address');
      return;
    }
    if (!isValidAddressPolkadotAddress(tokenContract)) {
      toast.error('Invalid Token Contract Address');
      return;
    }
    if (multiplier <= 0) {
      toast.error('Invalid Multiplier');
      return;
    }
    if (duration <= 0) {
      toast.error('Invalid Duration');
      return;
    }
    if (AZeroBalance === 0) {
      toast.error('You need Azero to perform this action');
      return;
    }
    if (creationFee >= walBalance) {
      toast.error(`You need ${creationFee} WAL to perform this action. Please acquire WAL tokens in 'WAL Tokens' Menu`);
      return;
    }
    if (!psp22_contract || tokenName === '') {
      toast.error('Invalid Token Contract');
      return;
    }
    //Approve WAL token
    toast('Step 1');
    psp22_contract.setPSP22Contract(api, {
      CONTRACT_ADDRESS: wal.CONTRACT_ADDRESS,
      CONTRACT_ABI: psp22.CONTRACT_ABI,
    });
    let approve = await psp22_contract.approve(
      selectedAccount,
      extensionName,
      nft_pool_generator.CONTRACT_ADDRESS,
      creationFee
    );
    if (!approve) return;
    await delay(3000);
    toast('Step 2');

    let newPool = await nft_pool_generator_calls.newPool(
      selectedAccount,
      extensionName,
      selectedAccount,
      NFTtokenContract,
      tokenContract,
      multiplier,
      parseInt(tokenDecimal),
      duration * 24 * 60 * 60 * 1000,
      startTime.getTime()
    );
    await clientAPI('post', '/update', { type: "nft",poolContract:"new" });
    await delay(3000);
    getBalance();
    loadToken();
    dispatch({ type: 'newPool', payload: "newNFTPool" });
    // if (newPool) {
    //   toast(
    //     `Pool created. It takes up to 10s for the token to show in the list`
    //   );
    // }
  };

  const [tokenList, setTokenList] = useState(null);
  const [NFTtokenList, setNFTTokenList] = useState(null);
  //console.log('tokenList', tokenList);

  useEffect(() => {
    const getData = async () => {
      let tokens = await clientAPI('post', '/getTokens', {});
      setTokenList(tokens);
    };
    getData();
    const getNFTData = async () => {
      if (!api) return;
      let poollist = await azclientAPI('post', '/getCollections', { isActive: true, ignoreNoNFT: false });
      //console.log(poollist);
      setNFTTokenList(poollist);
    };
    getNFTData();
  }, [api, selectedAccount]);

  return (
    <Box
      px="8px"
      textAlign="center"
      className="ROI--wrapper"
      boxShadow="0px 0px 10px 2px rgba(9, 111, 125, 0.3);"
    >
      <Heading fontSize="32px" fontWeight="normal">
        Create ArtZero's NFT Yield Farms
      </Heading>

      <Text
        py={['15px', '30px']}
        maxW={['330px', '640px']}
        mx="auto"
        color="white"
      >
        NFT Stakers get rewards in selected token. The creation costs {creationFee} WAL
      </Text>

      <Flex flexDirection={['column', 'row']}>
        <VStack
          w="full"
          spacing="20px"
          px={['0px', '30px']}
          pb={['30px', '30px']}
        >
          <Box w="full" className="ROI--cont-box">
            <Text className="title">Select NFT Collection</Text>

            <Select
              onChange={({ target }) => setNFTTokenContract(target.value)}
              fontSize="18px"
              color="#fff9"
              bg="#232829"
              border="none "
              h="52px"
              value={NFTtokenContract}
              placeholder='Select NFT Collection'
            >
              {NFTtokenList?.map(({ name, nftContractAddress }) => (
                <option
                  style={{
                    color: '#fff9',
                    width: '100%',
                    display: 'flex',
                    background: '#232829',
                    justifyContent: 'space-between',
                  }}
                  value={nftContractAddress}
                >
                  <Box bg="yellow" w="30%">
                    <Text color="gray">{name}{' '}</Text>
                  </Box>
                  <Box>- {truncateStr(nftContractAddress, 5)}</Box>
                </option>
              ))}
            </Select>
          </Box>
          <Box w="full" className="ROI--cont-box">
            <input
              type="text"
              value={NFTtokenContract}
              defaultValue="0.1"
              placeholder="or enter token contract address here"
              onChange={(e) => setNFTTokenContract(e.target.value)}
              className="ROI--input-updateBox"
            />
          </Box>
          <Box w="full" className="ROI--cont-box">
            <Text className="title">Start Date & Time</Text>
            <span className="ROI--input-updateBox">
              <DateTimePicker
                disableClock
                onChange={onChangeStartTime}
                value={startTime}
                locale="en-EN"
              />
            </span>
          </Box>
          <Box w="full" className="ROI--cont-box">
            <Text className="title">Pool Length (days)</Text>
            <span className="ROI--input-updateBox">
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="ROI--input-updateBox"
              />
            </span>
          </Box>

          <Box w="full" className="ROI--cont-box">
            <Text className="title">Multiplier (*)</Text>

            <span className="ROI--input-updateBox">
              <input
                type="number"
                value={multiplier}
                onChange={(e) => setMultiplier(e.target.value)}
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
            <Text className="title">Select Token to reward stakers</Text>

            <Select
              onChange={({ target }) => setTokenContract(target.value)}
              fontSize="18px"
              color="#fff9"
              bg="#232829"
              border="none "
              h="52px"
              value={tokenContract}
              placeholder='Select token'
            >
              {tokenList?.map(({ contractAddress, symbol }) => (
                <option
                  style={{
                    color: '#fff9',
                    width: '100%',
                    display: 'flex',
                    background: '#232829',
                    justifyContent: 'space-between',
                  }}
                  value={contractAddress}
                >
                  <Box bg="yellow" w="30%">
                    <Text color="gray">Symbol:</Text> {symbol}{' '}
                  </Box>
                  <Box>- Address: {truncateStr(contractAddress, 5)}</Box>
                </option>
              ))}
            </Select>
          </Box>
          <Box w="full" className="ROI--cont-box">
            <input
              type="text"
              value={tokenContract}
              defaultValue="0.1"
              placeholder="or enter token contract address here"
              onChange={(e) => setTokenContract(e.target.value)}
              className="ROI--input-updateBox"
            />
          </Box>

          <Box w="full" className="ROI--cont-box">
            <Text className="title">Your AZERO Balance</Text>
            <HStack alignItems="center">
              <Text className="ROI--input-updateBox">
                {AZeroBalance ? numberWithCommas(AZeroBalance.toFixed(3)) : 0}{' '}
                <AzeroIcon w="12px" h="12px" mb="4px" />
              </Text>
            </HStack>
          </Box>
          <Box w="full" className="ROI--cont-box">
            <Text className="title">Your Token Balance</Text>
            <HStack alignItems="center">
              <Text className="ROI--input-updateBox">
                {tokenBalance ? numberWithCommas(tokenBalance.toFixed(3)) : 0}{' '}
                {tokenSymbol}
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
        <Text>
          (*) Multiplier determines how many {tokenSymbol} tokens will the staker receive per NFT per day.
        </Text>
      </Box>
      <br />
      <Box w={['full', '50%']} margin="auto">
        <Button
          h="52px"
          w="full"
          colorScheme="messenger"
          onClick={() => createPool()}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default NFTPoolCreatorForm;
