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
import core_contract from '../../contracts/core_calls';
import { truncateStr } from '../../utils';
import token_generator from '../../contracts/core';
import pool_generator from '../../contracts/pool_generator';
import AccountInfo from '../AccountInfo';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import { clientAPI } from '../../api/client';

const TokenFaucet = () => {
  const selectedAccount = useSelector((s) => s.substrate.selectedAccount);
  const extensionName = useSelector((s) => s.substrate.extensionName);
  const api = useSelector((s) => s.substrate.api);

  const [AZeroBalance, setAZeroBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [tokenContract, setTokenContract] = useState('');
  const [walBalance, setWalBalance] = useState(0);

  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDecimal, setTokenDecimal] = useState(0);

  const loadToken = async () => {
    if (!isValidAddressPolkadotAddress(tokenContract)) {
      return;
    }
    await delay(500);
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
    console.log(tokenContract,token_balance);
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
  };
  useEffect(() => {
    getBalance();
    loadToken();
  }, [selectedAccount, api]);

  useEffect(() => {
    loadToken();
    getBalance();
  }, [tokenContract]);
  const faucet = async () =>{
    if (!isValidAddressPolkadotAddress(tokenContract)){
      toast.error("Please select a token");
      return;
    }
    if (!api || selectedAccount==""){
      toast.error("Please connect your wallet");
      return;
    }
    psp22_contract.setPSP22Contract(api, {
      CONTRACT_ADDRESS: tokenContract,
      CONTRACT_ABI: psp22.CONTRACT_ABI,
    });
    let faucet = await psp22_contract.faucet(
      selectedAccount,
      extensionName
    );
    if (!faucet) return;
    await delay(3000);
    getBalance();
    loadToken();
  }

  const [tokenList, setTokenList] = useState(null);
  //console.log('tokenList', tokenList);

  useEffect(() => {
    const getData = async () => {
      let tokens = await clientAPI('post', '/getTokens', {});
      setTokenList(tokens);
    };

    getData();
  }, [api, selectedAccount]);

  return (
    <Box
      px="8px"
      textAlign="center"
      boxShadow="0px 0px 10px 2px rgba(9, 111, 125, 0.3);"
    >
      <Heading py="10px" fontSize="32px" fontWeight="normal" align="left">
        Faucet
      </Heading>
      <Text color="white" align="left">
        Get some test tokens into your account. To get some TZERO, please visit <span style={{ color: '#63b3ed' }}><a href="https://faucet.test.azero.dev" target="_blank">https://faucet.test.azero.dev</a></span>
      </Text>
      <br />

      <Flex flexDirection={['column', 'row']}>
        <VStack
          w="full"
          spacing="20px"
          px={['0px', '30px']}
          pb={['30px', '30px']}
        >
          <AccountInfo
            address={selectedAccount}
            AzeroBalance={AZeroBalance}
            token1Balance={walBalance}
            token1Symbol={"WAL"}
            token2Balance={tokenBalance}
            token2Symbol={tokenSymbol}
          />

        </VStack>
        <VStack
          w="full"
          spacing="20px"
          px={['0px', '30px']}
          pb={['30px', '30px']}
        >
          <Card w="full" variant="elevated">
            <CardHeader>
              <Heading size='sm' align="left">Get Test Tokens</Heading>
            </CardHeader>
              <CardBody paddingTop="5px">
                <Flex flexDirection={['row', 'column']}  >
                  <Box w="full" className="ROI--cont-box">
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
                  <Box w={['full', '50%']} align="left" paddingTop="5px">
                    <Button
                      h="52px"
                      w="full"
                      colorScheme="messenger"
                      onClick={() => faucet()}
                    >
                      Send me {tokenSymbol}
                    </Button>
                  </Box>
                </Flex>

              </CardBody>
          </Card>
        </VStack>
      </Flex>
    </Box>
  );
};

export default TokenFaucet;
