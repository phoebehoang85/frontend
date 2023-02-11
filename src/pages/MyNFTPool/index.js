import React, { useEffect, useState, useCallback, Fragment } from 'react';
// import images from '../../constants/images';
import { useDispatch, useSelector } from 'react-redux';
import {
  truncateStr,
  numberWithCommas,
  convertTimeStamp,
  secondsToTimeString,
  delay,
} from '../../utils';
import '../../components/TokenList/TokenList.css';
import { clientAPI } from '../../api/client';
import { azclientAPI } from '../../api/az_client';
import useInterval from '../../hooks/useInterval';
import toast from 'react-hot-toast';
import nft_pool_generator_contract from '../../contracts/nft_pool_generator_calls';
import psp22_contract from '../../contracts/psp22_calls';
import nft_pool_contract from '../../contracts/nft_pool_calls';
import nft_pool from '../../contracts/nft_pool';
import psp22 from '../../contracts/psp22';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
// import AzeroIcon from '../../theme/assets/icon/AzeroIcon.js';
import AddressCopier from '../../components/AddressCopier/AddressCopier';
import Swal from 'sweetalert2';
import TokenInfo from '../../components/TokenInfo';
import PoolInfo from '../../components/PoolInfo';
import AccountInfo from '../../components/AccountInfo';
import NFTInfo from '../../components/NFTInfo';
import NFTHeaderInfo from '../../components/NFTInfo/header';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


// let currentPage = 1;
const MyNFTPool = () => {
  const { nftPoolAddress } = useParams();
  const { api } = useSelector((s) => s.substrate);
  const { extensionName } = useSelector((s) => s.substrate);
  const { selectedAccount } = useSelector((s) => s.substrate);
  const newPool = useSelector((s) => s.pools);
  const [AZeroBalance, setAZeroBalance] = useState(0);

  // const [AZeroBalance, setAZeroBalance] = useState(0);
  const [data, setPoolData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPoolData = async () => {
    if (!api) return;
    if (!selectedAccount) return;

    let poolCount = await nft_pool_generator_contract.getPoolCountByOwner(
      selectedAccount,
      selectedAccount
    );

    console.log('My poolCount', poolCount);

    let pools = [];
    nft_pool_contract.setNFTPoolContract(api, {
      CONTRACT_ADDRESS: nftPoolAddress,
      CONTRACT_ABI: nft_pool.CONTRACT_ABI,
    });

    //console.log(pool_contract);

    let multiplier = await nft_pool_contract.multiplier(selectedAccount);
    let rewardPool = await nft_pool_contract.rewardPool(selectedAccount);
    let totalStaked = await nft_pool_contract.totalStaked(selectedAccount);
    let startTime = await nft_pool_contract.startTime(selectedAccount);
    let duration = await nft_pool_contract.duration(selectedAccount);
    let tokenContract = await nft_pool_contract.psp22ContractAddress(
      selectedAccount
    );
    let NFTtokenContract = await nft_pool_contract.psp34ContractAddress(
      selectedAccount
    );
    let nft_info = await azclientAPI('post', '/getCollectionByAddress', { collection_address: NFTtokenContract });
    console.log(nft_info);

    let myStake = await nft_pool_contract.psp22ContractAddress(selectedAccount);
    let stakeInfo = await nft_pool_contract.getStakeInfo(
      selectedAccount,
      selectedAccount
    );

    psp22_contract.setPSP22Contract(api, {
      CONTRACT_ADDRESS: tokenContract,
      CONTRACT_ABI: psp22.CONTRACT_ABI,
    });
    let tokenName = await psp22_contract.tokenName(selectedAccount);
    let tokenSymbol = await psp22_contract.tokenSymbol(selectedAccount);
    let tokenDecimal = await psp22_contract.tokenDecimals(selectedAccount);
    let tokenTotalSupply = await psp22_contract.totalSupply(selectedAccount);
    let myTokenBalance = await psp22_contract.balanceOf(
      selectedAccount,
      selectedAccount
    );

    pools.push({
      poolContract:nftPoolAddress,
      NFTtokenContract,
      nft_info,
      tokenContract,
      tokenName,
      tokenSymbol,
      tokenDecimal,
      duration,
      startTime,
      tokenTotalSupply,
      rewardPool,
      totalStaked,
      myTokenBalance,
      multiplier,
      stakeInfo,
    });
    return pools;
  };

  //useInterval(() => fetchPools(), 10000);

  const fetchPools = async () => {
    console.log(selectedAccount);
      const pools = await getPoolData();
      console.log('fetchPools pools', pools);
      setPoolData(pools);
      setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const getBalance = async () => {
    if (!api) return;
    if (selectedAccount != '') {
      const { _nonce, data: balance } = await api.query.system.account(
        selectedAccount
      );
      setAZeroBalance(balance.free / 10 ** 12 - balance.miscFrozen / 10 ** 12);
    }
  };
  useEffect(() => {
    try {
      setLoading(true);
      fetchPools();
      getBalance();
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  }, [api,selectedAccount,newPool]);

  const removeRewards = async (
    poolContract,
    tokenContract,
    tokenSymbol,
    startTime,
    duration,
    myTokenBalance
  ) => {
    let currentTime = new Date().getTime();
    console.log(currentTime, startTime, duration);
    if (AZeroBalance === 0) {
      toast.error('You need Azero to perform this action');
      return;
    }
    if (currentTime < parseInt(startTime) + duration * 1000) {
      Swal.fire('', 'You have to wait until pool ends to withdraw', 'error');
      return;
    }
    Swal.fire({
      text: `How many ${tokenSymbol} tokens do you want to remove from reward pool?`,
      input: 'number',
      showCancelButton: true,
      confirmButtonText: 'Remove',
    }).then(async function (result) {
      if (result.isConfirmed) {
        console.log(result.value);
        if (result.value <= 0) {
          Swal.fire('Error!', 'Invalid Token Number', 'error');
        } else {
          if (myTokenBalance < result.value) {
            toast.error('Not enough tokens');
            return;
          }
          nft_pool_contract.setNFTPoolContract(api, {
            CONTRACT_ADDRESS: poolContract,
            CONTRACT_ABI: nft_pool.CONTRACT_ABI,
          });
          let topup = await nft_pool_contract.withdrawRewardPool(
            selectedAccount,
            extensionName,
            result.value
          );
          await clientAPI('post', '/update', { type: "nft",poolContract });
          await delay(2000);
          toast("Updating balance");
          await delay(3000);
          const pools = await getPoolData();
          setPoolData(pools);
          getBalance();
        }
      }
    });
  };
  const addRewards = async (
    poolContract,
    tokenContract,
    tokenSymbol,
    myTokenBalance
  ) => {
    if (!api || selectedAccount==""){
      toast.error("Please connect your wallet");
      return;
    }
    console.log(poolContract);
    if (AZeroBalance === 0) {
      toast.error('You need Azero to perform this action');
      return;
    }
    Swal.fire({
      text: `How many ${tokenSymbol} tokens do you want to add to reward pool (pay for interest)?`,
      input: 'number',
      showCancelButton: true,
      confirmButtonText: 'Add',
    }).then(async function (result) {
      if (result.isConfirmed) {
        console.log(result.value);
        if (result.value <= 0) {
          Swal.fire('Error!', 'Invalid Token Number', 'error');
        } else {
          if (myTokenBalance < result.value) {
            toast.error('Not enough tokens');
            return;
          }
          //approve
          toast('Step 1');
          psp22_contract.setPSP22Contract(api, {
            CONTRACT_ADDRESS: tokenContract,
            CONTRACT_ABI: psp22.CONTRACT_ABI,
          });
          let approve = await psp22_contract.approve(
            selectedAccount,
            extensionName,
            poolContract,
            result.value
          );
          if (!approve) return;
          await delay(3000);
          toast('Step 2');
          nft_pool_contract.setNFTPoolContract(api, {
            CONTRACT_ADDRESS: poolContract,
            CONTRACT_ABI: nft_pool.CONTRACT_ABI,
          });
          let topup = await nft_pool_contract.topupRewardPool(
            selectedAccount,
            extensionName,
            result.value
          );
          await clientAPI('post', '/update', { type: "nft",poolContract });
          await delay(2000);
          toast("Updating balance");
          await delay(3000);
          const pools = await getPoolData();
          setPoolData(pools);
          getBalance();
        }
      }
    });
  };

  return (
    <Box mx="auto" as="section" px={['16px', '24px']} maxW="container.xl" margin="10px">
      <section className="Update--table-box">

        <Heading py="10px" fontSize="32px" fontWeight="normal" align="left">
          My NFT Yield Farm
        </Heading>

        {loading ? (
          <Text>Loading...</Text>
        ) : !loading && data?.length === 0 ? (
          <Text align="left">"No information found"</Text>
        ) : (
          <Accordion allowMultiple defaultIndex={[0]}>
            {data?.map(
              (
                {
                  nft_info,
                  poolContract,
                  multiplier,
                  tokenContract,
                  tokenName,
                  tokenSymbol,
                  tokenDecimal,
                  duration,
                  startTime,
                  tokenTotalSupply,
                  rewardPool,
                  totalStaked,
                  myTokenBalance,
                  stakeInfo,
                },
                index
              ) => (
                <Fragment key={poolContract}>
                  <AccordionItem>
                      <AccordionButton>
                        <NFTHeaderInfo
                          imageUrl={nft_info ? nft_info[0].avatarImage : ""}
                          imageName={nft_info ? nft_info[0].name : ""}
                          nftContractAddress={nft_info[0].nftContractAddress}
                          nftName={nft_info[0].name}
                          rewardName={tokenName}
                          rewardSymbol={tokenSymbol}
                          rewardAddress={tokenContract}
                          TVL={totalStaked}
                          rewardPool={rewardPool}
                          multiplier={multiplier / 10 ** tokenDecimal}
                          expiredIn={parseInt(
                            parseInt(startTime) / 1000 +
                              parseInt(duration) -
                              new Date().getTime() / 1000
                          )}
                        />
                        <AccordionIcon ml="4px" color="#fff" />
                      </AccordionButton>
                    <AccordionPanel>
                      <Tabs>
                        <TabList>
                          <Tab color="gray" _selected={{ color: 'white' }}>
                            Pool Information
                          </Tab>
                        </TabList>

                        <TabPanels>
                          <TabPanel>
                            <Flex flexDirection={['column', 'row']}>
                              <VStack
                                w="full"
                                spacing="5px"
                                px={['0px', '30px']}
                                pb={['10px', '30px']}
                              >
                                <PoolInfo
                                  title="General Information"
                                  multiplier={multiplier/1000000}
                                  poolLength={duration / (24 * 60 * 60)}
                                  rewardPool={rewardPool}
                                  TVL={totalStaked}
                                  rewardSymbol={tokenSymbol}
                                  stakeSymbol={"NFTs"}
                                  address={poolContract}
                                  startDate={parseInt(startTime)}
                                />
                                <NFTInfo title="NFT Information" nft_info={nft_info[0]}/>

                              </VStack>
                              <VStack
                                w="full"
                                spacing="5px"
                                px={['0px', '30px']}
                                pb={['10px', '30px']}
                              >
                                <TokenInfo
                                  title="Reward Token Information"
                                  name={tokenName}
                                  symbol={tokenSymbol}
                                  decimal={tokenDecimal}
                                  totalSupply={tokenTotalSupply}
                                  address={tokenContract}
                                />

                                <AccountInfo
                                  address={selectedAccount}
                                  AzeroBalance={AZeroBalance}
                                  token1Balance={myTokenBalance}
                                  token1Symbol={tokenSymbol}
                                />


                                <Flex w="full" paddingTop="10px">
                                  <Button
                                    mx="4px"
                                    textAlign="left"
                                    w={['full', '50%']}
                                    colorScheme="messenger"
                                    onClick={() =>
                                      addRewards(
                                        poolContract,
                                        tokenContract,
                                        tokenSymbol,
                                        myTokenBalance
                                      )
                                    }
                                  >
                                    Add Rewards
                                  </Button>

                                  <Button
                                    mx="4px"
                                    textAlign="left"
                                    w={['full', '50%']}
                                    colorScheme="messenger"
                                    onClick={() =>
                                      removeRewards(
                                        poolContract,
                                        tokenContract,
                                        tokenSymbol,
                                        startTime,
                                        duration,
                                        myTokenBalance
                                      )
                                    }
                                  >
                                    Remove Rewards
                                  </Button>
                                </Flex>
                                <Box w="full" textAlign="left">
                                  <Text py={['10px', '10px']}>
                                    Note: You will be able to withdraw
                                    undistributed Rewards after Pool is expired
                                    on{' '}
                                    <span style={{ color: '#63b3ed' }}>
                                      <strong>
                                        {convertTimeStamp(
                                          parseInt(startTime) + duration * 1000
                                        )}
                                      </strong>
                                    </span>
                                  </Text>
                                </Box>
                              </VStack>
                            </Flex>
                          </TabPanel>
                        </TabPanels>
                      </Tabs>
                    </AccordionPanel>
                  </AccordionItem>
                </Fragment>
              )
            )}
          </Accordion>
        )}
      </section>
    </Box>
  );
};

export default MyNFTPool;
