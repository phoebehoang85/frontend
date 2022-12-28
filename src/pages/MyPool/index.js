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
import useInterval from '../../hooks/useInterval';
import toast from 'react-hot-toast';
import pool_generator_contract from '../../contracts/pool_generator_calls';
import psp22_contract from '../../contracts/psp22_calls';
import pool_contract from '../../contracts/pool_calls';
import pool from '../../contracts/pool';
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
import PoolHeaderInfo from '../../components/PoolInfo/header';
import AccountInfo from '../../components/AccountInfo';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

// let currentPage = 1;
const MyPool = () => {
  const { PoolAddress } = useParams();
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

    let pools = [];

    pool_contract.setPoolContract(api, {
      CONTRACT_ADDRESS: PoolAddress,
      CONTRACT_ABI: pool.CONTRACT_ABI,
    });

    //console.log(pool_contract);

    let apy = await pool_contract.apy(selectedAccount);
    let rewardPool = await pool_contract.rewardPool(selectedAccount);
    let totalStaked = await pool_contract.totalStaked(selectedAccount);
    let startTime = await pool_contract.startTime(selectedAccount);
    let duration = await pool_contract.duration(selectedAccount);
    let tokenContract = await pool_contract.psp22ContractAddress(
      selectedAccount
    );
    let myStake = await pool_contract.psp22ContractAddress(selectedAccount);
    let stakeInfo = await pool_contract.getStakeInfo(
      selectedAccount,
      selectedAccount
    );
    //console.log(poolContract,apy,rewardPool,totalStaked,tokenContract);
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
      poolContract:PoolAddress,
      tokenContract,
      tokenName,
      tokenSymbol,
      tokenDecimal,
      duration,
      startTime,
      tokenTotalSupply,
      poolRewardPool: rewardPool,
      poolTotalStaked: totalStaked,
      myTokenBalance,
      apy,
      stakeInfo,
    });

    return pools;
    // setPoolData(pools);
    // setLoading(false);
    //console.log(pools);
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
  const fetchPools = async () => {
    const pools = await getPoolData();
    console.log('fetchPools pools', pools);
    setPoolData(pools);
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    console.log('newPool',newPool);
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
          pool_contract.setPoolContract(api, {
            CONTRACT_ADDRESS: poolContract,
            CONTRACT_ABI: pool.CONTRACT_ABI,
          });
          let topup = await pool_contract.withdrawRewardPool(
            selectedAccount,
            extensionName,
            result.value
          );
          await clientAPI('post', '/update', { type: "pool",poolContract });
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
          pool_contract.setPoolContract(api, {
            CONTRACT_ADDRESS: poolContract,
            CONTRACT_ABI: pool.CONTRACT_ABI,
          });
          let topup = await pool_contract.topupRewardPool(
            selectedAccount,
            extensionName,
            result.value
          );
          await clientAPI('post', '/update', { type: "pool",poolContract });
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
          My Pool
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
                  poolContract,
                  apy,
                  tokenContract,
                  tokenName,
                  tokenSymbol,
                  tokenDecimal,
                  duration,
                  startTime,
                  tokenTotalSupply,
                  poolRewardPool,
                  poolTotalStaked,
                  myTokenBalance,
                  stakeInfo,
                },
                index
              ) => (
                <Fragment key={poolContract}>
                  <AccordionItem>
                      <AccordionButton>
                        <PoolHeaderInfo
                          tokenName={tokenName}
                          tokenSymbol={tokenSymbol}
                          tokenAddress={tokenContract}
                          TVL={poolTotalStaked}
                          rewardPool={poolRewardPool}
                          APR={apy / 100}
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
                                  APR={apy / 100}
                                  poolLength={duration / (24 * 60 * 60)}
                                  rewardPool={poolRewardPool}
                                  TVL={poolTotalStaked}
                                  rewardSymbol={tokenSymbol}
                                  stakeSymbol={tokenSymbol}
                                  address={poolContract}
                                  startDate={parseInt(startTime)}
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
                              <VStack
                                w="full"
                                spacing="5px"
                                px={['0px', '30px']}
                                pb={['10px', '30px']}
                              >
                                <TokenInfo
                                  title="Staking Token Information"
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

export default MyPool;
