import React from 'react';
import './index.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import psp22_contract from '../../contracts/psp22_calls';
import psp22 from '../../contracts/psp22';
import wal from '../../contracts/azt';
import toast from 'react-hot-toast';
import { delay } from '../../utils';
import { isValidAddressPolkadotAddress, truncateStr } from '../../utils';
import AzeroIcon from '../../theme/assets/icon/AzeroIcon';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
  Select
} from '@chakra-ui/react';
import core_contract from '../../contracts/core_calls';
import TokenInfo from '../../components/TokenInfo';
import AccountInfo from '../../components/AccountInfo';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { clientAPI } from '../../api/client';

const Token = () => {
  const selectedAccount = useSelector((s) => s.substrate.selectedAccount);
  const extensionName = useSelector((s) => s.substrate.extensionName);
  const api = useSelector((s) => s.substrate.api);

  const [AZeroBalance, setAZeroBalance] = useState(0);
  const [WALBalance, setWALBalance] = useState(0);
  const [contractAddress, setContractAddress] = useState(wal.CONTRACT_ADDRESS);

  const [toBuy, setToBuy] = useState(0);
  const [mintingFee, setMintingFee] = useState(0);
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDecimal, setTokenDecimal] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [addressToCheck, setAddressToCheck] = useState('');
  const [addressBalance, setAddressBalance] = useState(0);
  const [addressToTransfer, setAdressToTransfer] = useState('');
  const [amountToTransfer, setAmountToTransfer] = useState(null);
  const [amountToBurn, setAmountToBurn] = useState(null);

  const [tokenList, setTokenList] = useState(null);
  const [tokenContract, setTokenContract] = useState(wal.CONTRACT_ADDRESS);

  const loadToken = async () => {
    if (!isValidAddressPolkadotAddress(tokenContract)) {
      toast.error('invalid address');
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
    getBalance();
  };

  const checkBalance = async (address) => {
    if (!isValidAddressPolkadotAddress(address)) {
      return;
    }
    psp22_contract.setPSP22Contract(api, {
      CONTRACT_ADDRESS: tokenContract,
      CONTRACT_ABI: psp22.CONTRACT_ABI,
    });
    let token_balance = await psp22_contract.balanceOf(
      selectedAccount,
      address
    );
    setAddressBalance(token_balance);
  };

  const getBalance = async () => {
    if (!api) return;
    if (selectedAccount != '') {
      const { _nonce, data: balance } = await api.query.system.account(
        selectedAccount
      );
      //console.log(balance.free / 10 ** 12, balance.reserved / 10 ** 12);
      setAZeroBalance(balance.free / 10 ** 12);

      let token_balance = await psp22_contract.balanceOf(
        selectedAccount,
        selectedAccount
      );
      setTokenBalance(token_balance);

      psp22_contract.setPSP22Contract(api, {
        CONTRACT_ADDRESS: wal.CONTRACT_ADDRESS,
        CONTRACT_ABI: psp22.CONTRACT_ABI,
      });
      let wal_balance = await psp22_contract.balanceOf(
        selectedAccount,
        selectedAccount
      );
      setWALBalance(wal_balance);
    }
  };
  const transferToken = async () => {
    if (!selectedAccount) {
      toast.error('Please select an account from your wallet');
      return;
    }
    if (!isValidAddressPolkadotAddress(addressToTransfer)) {
      toast.error('Invalid Address');
      return;
    }
    if (amountToTransfer == 0 || !amountToTransfer) {
      toast.error('Please enter amount to transfer');
      return;
    }
    if (amountToTransfer>tokenBalance){
      toast.error('You dont have enough tokens to transfer');
      return;
    }
    if (AZeroBalance == 0) {
      toast.error('You need Azero to perform this transfer');
      return;
    }
    let newToken = await psp22_contract.transfer(
      selectedAccount,
      extensionName,
      addressToTransfer,
      amountToTransfer
    );
    if (newToken) {
      await delay(3000);
      await getBalance();
    }
  };

  const burnToken = async () => {
    if (!selectedAccount) {
      toast.error('Please select an account from your wallet');
      return;
    }

    if (amountToBurn == 0 || !amountToBurn) {
      toast.error('Please enter amount to burn');
      return;
    }
    if (amountToBurn>tokenBalance){
      toast.error('You dont have enough tokens to burn');
      return;
    }
    if (AZeroBalance == 0) {
      toast.error('You need Azero to perform this transfer');
      return;
    }
    let burnToken = await psp22_contract.burn(
      selectedAccount,
      extensionName,
      amountToBurn
    );
    if (burnToken) {
      await delay(3000);
      await getBalance();
    }
  };

  useEffect(() => {
    loadToken();
    const getData = async () => {
      let tokens = await clientAPI('post', '/getTokens', {});
      setTokenList(tokens);
    };

    getData();
  }, [selectedAccount, api]);

  return (
    <Box mx="auto" as="section" px={['16px', '24px']} maxW="container.xl">
      <Heading py="10px" fontSize="32px" fontWeight="normal" align="left">
        Token Interaction
      </Heading>
      <Text color="white" align="left">
        Check token information; transfer or burn tokens.
      </Text>
      <Box
        px="8px"
        textAlign="center"
        className="ROI--wrapper"
        boxShadow="0px 0px 10px 2px rgba(9, 111, 125, 0.3);"
      >

        <Flex flexDirection={['column', 'row']}>
          <VStack
            w="full"
            spacing="20px"
            px={['0px', '30px']}
            pb={['30px', '30px']}
          >
            <Box w="full" className="ROI--cont-box">
              <Text className="title">Token Contract Address</Text>
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


          </VStack>
          <VStack
            w="full"
            spacing="20px"
            px={['0px', '30px']}
            pb={['30px', '30px']}
          >
            <Box w="full" className="ROI--cont-box">
              <Text className="title">or enter token contract address here</Text>
              <input
                type="text"
                value={tokenContract}
                onChange={(e) => setContractAddress(e.target.value)}
                className="ROI--input-updateBox"
              />
            </Box>
          </VStack>
        </Flex>
        <Box pl={[0, '30px']} w={['full', '50%']} className="ROI--cont-box" margin="auto">
          <Button
            mb="6px"
            h="52px"
            w="full"
            colorScheme="messenger"
            onClick={() => loadToken()}
          >
            Load
          </Button>
        </Box>
        <Flex my="30px" flexDirection={['column', 'row']}>
          <VStack
            w="full"
            spacing="20px"
            px={['0px', '30px']}
            pb={['30px', '30px']}
          >
            {tokenSymbol == "WAL" ?
              <AccountInfo
                address={selectedAccount}
                AzeroBalance={AZeroBalance}
                token1Balance={WALBalance}
                token1Symbol={"WAL"}
              />
              :
              <AccountInfo
                address={selectedAccount}
                AzeroBalance={AZeroBalance}
                token1Balance={WALBalance}
                token1Symbol={"WAL"}
                token2Balance={tokenBalance}
                token2Symbol={tokenSymbol}
              />
            }


          </VStack>
          <VStack
            w="full"
            spacing="20px"
            px={['0px', '30px']}
            pb={['30px', '30px']}
          >
            <Card w="full" variant="elevated">
              <CardHeader>
                <Heading size='sm' align="left">Enter any address to check {tokenSymbol} balance</Heading>
              </CardHeader>
                <CardBody paddingTop="5px">
                  <Flex flexDirection={['row', 'column']}  >
                    <Box w="full" className="ROI--cont-box">
                      <span className="ROI--input-updateBox">
                        <input
                          type="text"
                          value={addressToCheck}
                          placeholder="Address to check"
                          onChange={(e) => setAddressToCheck(e.target.value)}
                          className="ROI--input-updateBox"
                        />
                      </span>
                    </Box>
                    <Box w="full" className="ROI--cont-box">
                      <p className="ROI--input-updateBox">
                        {addressBalance} {tokenSymbol}
                      </p>
                    </Box>
                    <Box w="full" className="ROI--cont-box">
                      <Button
                        h="52px"
                        w="full"
                        colorScheme="messenger"
                        onClick={() => checkBalance(addressToCheck)}
                      >
                        Check
                      </Button>
                    </Box>

                  </Flex>

                </CardBody>
            </Card>
          </VStack>

        </Flex>

        <Flex my="30px" flexDirection={['column', 'row']}>
          <VStack
            w="full"
            spacing="20px"
            px={['0px', '30px']}
            pb={['30px', '30px']}
          >
            <Card w="full" variant="elevated">
              <CardHeader>
                <Heading size='sm' align="left">Transfer {tokenSymbol} Tokens</Heading>
              </CardHeader>
                <CardBody paddingTop="5px">
                  <Flex flexDirection={['row', 'column']}  >
                    <Box w="full" className="ROI--cont-box">
                      <div className="ROI--cont-box">
                        <span className="ROI--input-updateBox">
                          <input
                            type="text"
                            value={addressToTransfer}
                            placeholder="Address to transfer to"
                            onChange={(e) => setAdressToTransfer(e.target.value)}
                            className="ROI--input-updateBox"
                          />
                        </span>
                      </div>
                    </Box>
                    <Box w="full" className="ROI--cont-box">
                      <span className="ROI--input-updateBox">
                        <input
                          type="number"
                          value={amountToTransfer}
                          placeholder="Amount to Transfer"
                          onChange={(e) => setAmountToTransfer(e.target.value)}
                          className="ROI--input-updateBox"
                        />
                      </span>
                    </Box>
                    <Box w="full" className="ROI--cont-box">
                      <Button
                        mt="23px"
                        h="52px"
                        w="full"
                        colorScheme="messenger"
                        onClick={() => transferToken()}
                      >
                        Transfer
                      </Button>
                    </Box>

                  </Flex>

                </CardBody>
            </Card>
          </VStack>
          <VStack
            w="full"
            spacing="20px"
            px={['0px', '30px']}
            pb={['30px', '30px']}
          >
            <Card w="full" variant="elevated">
              <CardHeader>
                <Heading size='sm' align="left">Burn {tokenSymbol} Tokens</Heading>
              </CardHeader>
                <CardBody paddingTop="5px">
                  <Flex flexDirection={['row', 'column']}  >
                    <Box w="full" className="ROI--cont-box">
                      <div className="ROI--cont-box">
                        <span className="ROI--input-updateBox">
                          <input
                            type="number"
                            value={amountToBurn}
                            placeholder="Amount to burn"
                            onChange={(e) => setAmountToBurn(e.target.value)}
                            className="ROI--input-updateBox"
                          />
                        </span>
                      </div>
                    </Box>
                    <Box w="full" className="ROI--cont-box">
                      <Button
                        mt="20px"
                        h="52px"
                        w="full"
                        colorScheme="messenger"
                        onClick={() => burnToken()}
                      >
                        Burn
                      </Button>
                    </Box>
                  </Flex>
                </CardBody>
            </Card>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Token;
