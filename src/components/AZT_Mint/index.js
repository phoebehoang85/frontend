import React from 'react';
import './index.css';
import { featureCard } from '../../constants/data';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback, useState } from 'react';
import core_contract from '../../contracts/core_calls';
import core from '../../contracts/core';
import psp22_contract from '../../contracts/psp22_calls';
import azt_contract from '../../contracts/azt_calls';
import azt from '../../contracts/azt';
import toast from 'react-hot-toast';
import useInterval from '../../hooks/useInterval';
import { randomString, delay, numberWithCommas } from '../../utils';
import { clientAPI } from '../../api/client';
import { isValidAddressPolkadotAddress } from '../../utils';
import BN from 'bn.js';
import { PieChart } from 'react-minimal-pie-chart';
import {
  Box,
  Button,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import AzeroIcon from '../../theme/assets/icon/AzeroIcon';
import AddressCopier from '../AddressCopier/AddressCopier';
import TokenInfo from '../TokenInfo';
import AccountInfo from '../AccountInfo';

const AZT_Mint = () => {
  const selectedAccount = useSelector((s) => s.substrate.selectedAccount);
  const extensionName = useSelector((s) => s.substrate.extensionName);
  const api = useSelector((s) => s.substrate.api);

  const [AZeroBalance, setAZeroBalance] = useState(0);
  const [AZTBalance, setAZTBalance] = useState(0);

  const [totalSupply, setTotalSupply] = useState(0);
  const [cap, setCap] = useState(0);
  // const [freeCap, setFreeCap] = useState(0);
  const [mintingCap, setMintingCap] = useState(0);
  const [totalMinted, setTotalMinted] = useState(0);

  const [toBuy, setToBuy] = useState("");
  const [mintingFee, setMintingFee] = useState(0);

  const getBalance = async () => {
    if (!api) return;
    setCap(await azt_contract.cap(selectedAccount));
    let mintingCap = await azt_contract.mintingCap(selectedAccount);
    let totalMinted = await azt_contract.totalMinted(selectedAccount);
    //console.log(totalFree, totalFreeMinted);
    setMintingCap(mintingCap);
    setTotalMinted(totalMinted);

    setTotalSupply(await azt_contract.totalSupply(selectedAccount));

    if (selectedAccount != '') {
      const { _nonce, data: balance } = await api.query.system.account(
        selectedAccount
      );
      //console.log(balance.free / 10 ** 12, balance.reserved / 10 ** 12);
      setAZeroBalance(balance.free / 10 ** 12 - balance.miscFrozen / 10 ** 12);

      let AZT_balance = await azt_contract.balanceOf(
        selectedAccount,
        selectedAccount
      );
      setAZTBalance(AZT_balance);
    }
    let mintingFee = await azt_contract.mintingFee(selectedAccount);
    setMintingFee(mintingFee);
  };
  // const freeMint = async () => {
  //   if (!selectedAccount) {
  //     toast.error('Please select an account from your wallet');
  //     return;
  //   }
  //   if (AZeroBalance == 0) {
  //     toast.error('You need Azero to perform this transfer');
  //     return;
  //   }
  //   let isMinted = await azt_contract.isMinted(
  //     selectedAccount,
  //     selectedAccount
  //   );
  //   if (isMinted) {
  //     toast.error('This account alreayd minted 100 Free WAL Tokens');
  //     return;
  //   }
  //   let newToken = await azt_contract.freeMint(selectedAccount, extensionName);
  //   if (newToken) {
  //     await delay(3000);
  //     await getBalance();
  //   }
  // };
  const publicMint = async () => {
    if (!api || selectedAccount==""){
      toast.error("Please connect your wallet");
      return;
    }
    if (AZeroBalance == 0) {
      toast.error('You need Azero to perform this transfer');
      return;
    }
    let value = new BN(toBuy * mintingFee * 10 ** 6)
      .mul(new BN(10 ** 6))
      .toString();
    if (AZeroBalance <= toBuy * mintingFee) {
      toast.error(
        `You need at least ${toBuy * mintingFee} Azero to perform this transfer`
      );
      return;
    }
    let newToken = await azt_contract.publicMint(
      selectedAccount,
      extensionName,
      toBuy,
      value
    );
    if (newToken) {
      await delay(3000);
      await getBalance();
    }
  };

  useEffect(() => {
    getBalance();
  }, [selectedAccount, api]);

  return (
    <Box
      mx="auto"
    >
      <Heading py="10px" fontSize="32px" fontWeight="normal" align="left">
        WAL Tokens
      </Heading>
      <Text color="white" align="left">
        WAL tokens are used as transaction fee. 100M WAL tokens are available at {mintingFee}{' '}
        <AzeroIcon w="12px" h="12px" mb="4px" /> per WAL. You can trade WAL on PanoramaSwap in due time.
      </Text>
      <br />
      <Box
        textAlign="center"
        px="8px"
        boxShadow="0px 0px 10px 2px rgba(9, 111, 125, 0.3);"
      >
        <Flex flexDirection={['column', 'row']}>
          <VStack
            w="full"
            spacing="20px"
            px={['0px', '30px']}
            pb={['30px', '30px']}
          >
            <TokenInfo
              title="Ink Whale Token Information"
              name={"Ink Whal Token"}
              symbol={"WAL"}
              decimal={"12"}
              totalSupply={totalSupply}
              address={azt.CONTRACT_ADDRESS}
            />
            <AccountInfo
              address={selectedAccount}
              AzeroBalance={AZeroBalance}
              token1Balance={AZTBalance}
              token1Symbol={"WAL"}
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
                <Heading size='sm' align="left">Acquire WAL Tokens</Heading>
              </CardHeader>
              <CardBody paddingTop="5px">
                <Box w="full" className="ROI--cont-box">
                  <span className="ROI--input-updateBox">
                    <input
                      type="number"
                      value={toBuy}
                      placeholder="Enter WAL Amount to acquire"
                      onChange={(e) => setToBuy(e.target.value)}
                      className="ROI--input-updateBox"
                    />
                  </span>
                </Box>
                <Box w="full" className="ROI--cont-box">
                  <p className="ROI--input-updateBox">
                    <span style={{color:"#63b3ed"}}><strong>{(toBuy * mintingFee).toFixed(9)}{' '}</strong></span>
                    <AzeroIcon w="12px" h="12px" mb="4px" />
                  </p>
                </Box>
                <Box flex='1' textAlign='center'>
                  <Text>(There are {numberWithCommas((mintingCap - totalSupply).toFixed(3))} WAL tokens available to mint)</Text>
                </Box>
              </CardBody>
              <CardFooter>

                <Button
                  h="52px"
                  w="full"
                  colorScheme="messenger"
                  onClick={() => publicMint()}
                >
                  Get WAL
                </Button>
              </CardFooter>
            </Card>


            <br/>

          </VStack>
        </Flex>
      </Box>

    </Box>
  );
};

export default AZT_Mint;
