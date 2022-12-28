import React from 'react';
import NFTPoolCreatorForm from '../../components/PoolCreator/nft_form';
import MyNFTPools from '../../components/PoolCreator/mynftpools';
import { useParams } from 'react-router-dom';
import { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';

import {
  truncateStr,
  numberWithCommas,
  convertTimeStamp,
  secondsToTimeString,
  delay,
  formatNumDynamicDecimal,
  getCloudFlareImage,
  isValidAddressPolkadotAddress,
  convertTimeStampNoTime
} from '../../utils';
import toast from 'react-hot-toast';
import { clientAPI } from '../../api/client';
import { azclientAPI } from '../../api/az_client';
import nft_pool from '../../contracts/nft_pool';
import nft_pool_contract from '../../contracts/nft_pool_calls';
import psp22_contract from '../../contracts/psp22_calls';
import psp22 from '../../contracts/psp22';
import psp34_contract from '../../contracts/psp34_standard_calls';
import psp34 from '../../contracts/psp34_standard';
import wal from '../../contracts/azt';
import AddressCopier from '../../components/AddressCopier/AddressCopier';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import AzeroIcon from '../../theme/assets/icon/AzeroIcon.js';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
  Input,
  ButtonGroup
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Wrap, WrapItem } from '@chakra-ui/react';
import ImageCloudFlare from '../../components/ImageCF/ImageCloudFlare';
import useInterval from '../../hooks/useInterval';
import TokenInfo from '../../components/TokenInfo';
import PoolInfo from '../../components/PoolInfo';
import AccountInfo from '../../components/AccountInfo';
import PoolHeaderInfo from '../../components/PoolInfo/header';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react';
import useForceUpdate from 'use-force-update';
import Swal from 'sweetalert2';
import pool_contract from '../../contracts/pool_calls';
import pool from '../../contracts/pool';

let isLoadingData = false;
const ViewPool = () => {
  const forceUpdate = useForceUpdate();
  const { PoolAddress } = useParams();
  const selectedAccount = useSelector((s) => s.substrate.selectedAccount);
  const extensionName = useSelector((s) => s.substrate.extensionName);
  const api = useSelector((s) => s.substrate.api);

  const [AZeroBalance, setAZeroBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState([]);
  const [userNFTs, setUserNFTs] = useState([]);
  const [staked_nfts, setStakedNFTs] = useState([]);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [unstakeAmount, setUnstakeAmount] = useState(0);

  const updateStakingInfo = async () =>{
    if (isLoadingData) return;
    let pools = data;
    setdata(pools);

    forceUpdate();
  }
  useInterval(() => updateStakingInfo(), 1000);

  const getData = async () => {
    isLoadingData = true;
    if (!isValidAddressPolkadotAddress(PoolAddress)){
      toast.error("Invalid Pool Address");
      isLoadingData = false;
      return;
    }
    if (!api) {
      isLoadingData = false;
      return;
    }
    // setLoading(true);
    let poollist = await clientAPI('post', '/getPoolByAddress', { poolContract: PoolAddress });
    //console.log(poollist);
    if (poollist.length == 0){
      toast.error("Pool data does not exist");
      isLoadingData = false;
      return;
    }

    let poolCount = poollist.length;
    //console.log('poolCount', poolCount);

    if (poolCount <= 0) {
      isLoadingData = false;
      return;
    }

    for (let index = 0; index < poolCount; index++) {
      const _pool = poollist[index];

      pool_contract.setPoolContract(api, {
        CONTRACT_ADDRESS: _pool.poolContract,
        CONTRACT_ABI: pool.CONTRACT_ABI,
      });

      let stakeInfo = await pool_contract.getStakeInfo(
        selectedAccount,
        selectedAccount
      );
      //console.log('stakeInfo', stakeInfo);
      //console.log(poolContract,apy,rewardPool,totalStaked,tokenContract);
      psp22_contract.setPSP22Contract(api, {
        CONTRACT_ADDRESS: _pool.tokenContract,
        CONTRACT_ABI: psp22.CONTRACT_ABI,
      });

      let myTokenBalance = await psp22_contract.balanceOf(
        selectedAccount,
        selectedAccount
      );
      poollist[index].stakeInfo = stakeInfo;
      poollist[index].myTokenBalance = myTokenBalance;
    }
    setdata(poollist);
    setLoading(false);
    await delay(2000);
    isLoadingData = false;
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
  const stake = async (tokenContract, poolContract, myTokenBalance, rewardPool) => {
    console.log('stake');
    if (!api || selectedAccount==""){
      toast.error("Please connect your wallet");
      return;
    }
    if (!stakeAmount){
      toast.error('Invalid Stake Amount');
      return;
    }
    if (parseInt(rewardPool) == 0){
      toast.error('There is no reward balance in this pool');
      return;
    }
    if (myTokenBalance < stakeAmount) {
      toast.error('Not enough tokens');
      return;
    }
    //Approve
    toast('Step 1');
    psp22_contract.setPSP22Contract(api, {
      CONTRACT_ADDRESS: tokenContract,
      CONTRACT_ABI: psp22.CONTRACT_ABI,
    });
    let approve = await psp22_contract.approve(
      selectedAccount,
      extensionName,
      poolContract,
      stakeAmount
    );
    if (!approve) return;
    await delay(3000);

    toast('Step 2');
    pool_contract.setPoolContract(api, {
      CONTRACT_ADDRESS: poolContract,
      CONTRACT_ABI: pool.CONTRACT_ABI,
    });
    let stake = await pool_contract.stake(
      selectedAccount,
      extensionName,
      stakeAmount
    );
    await clientAPI('post', '/update', { type: "pool",poolContract });
    await delay(3000);
    getData();
  };

  const unstake = async (poolContract, stakedValue) => {
    console.log('unstake');
    if (!api || selectedAccount==""){
      toast.error("Please connect your wallet");
      return;
    }
    if (stakedValue < stakeAmount){
      toast.error('Not enough Token to unstake');
      return;
    }
    if (!stakeAmount){
      toast.error('Invalid Unstake Amount');
      return;
    }
    pool_contract.setPoolContract(api, {
      CONTRACT_ADDRESS: poolContract,
      CONTRACT_ABI: pool.CONTRACT_ABI,
    });
    psp22_contract.setPSP22Contract(api, {
      CONTRACT_ADDRESS: wal.CONTRACT_ADDRESS,
      CONTRACT_ABI: psp22.CONTRACT_ABI,
    });
    let unstakeFee = await pool_contract.unstakeFee(selectedAccount);
    let wal_balance = await psp22_contract.balanceOf(
      selectedAccount,
      selectedAccount
    );
    //console.log(unstakeFee,wal_balance,stakeAmount,poolContract,stakeAmount);
    if (unstakeFee>wal_balance){
      toast.error(`You dont have enough WAL. Unstake costs ${unstakeFee} WAL`);
      return;
    }
    Swal.fire({
      text: `Unstake costs ${unstakeFee} WAL. Continue?`,
      showCancelButton: true,
      confirmButtonText: 'Unstake',
    }).then(async function (result) {
      if (result.isConfirmed) {
        //Approve
        toast('Step 1');
        let approve = await psp22_contract.approve(
          selectedAccount,
          extensionName,
          poolContract,
          unstakeFee
        );
        if (!approve) return;
        await delay(3000);

        toast('Step 2');

        let unstake = await pool_contract.unstake(
          selectedAccount,
          extensionName,
          stakeAmount
        );
        await clientAPI('post', '/update', { type: "pool",poolContract });
        await delay(3000);
        getData();
      }
    });

  };

  const claim_rewards = async (poolContract) => {
    console.log('claim_rewards');
    if (!api || selectedAccount==""){
      toast.error("Please connect your wallet");
      return;
    }
    pool_contract.setPoolContract(api, {
      CONTRACT_ADDRESS: poolContract,
      CONTRACT_ABI: pool.CONTRACT_ABI,
    });
    let claim_rewards = await pool_contract.claimReward(
      selectedAccount,
      extensionName
    );
    await clientAPI('post', '/update', { type: "pool",poolContract });
    await delay(3000);
    getData();
  };

  useEffect(() => {
    getBalance();
    getData();
  },[selectedAccount]);
  return (
    <Box mx="auto" as="section" px={['16px', '24px']} maxW="container.xl">
      <Box textAlign="center" px={['0px', '8px']}>
        <section className="Update--table-box">
          <Heading py="10px" fontSize="32px" fontWeight="normal" align="left">
            Staking Pool
          </Heading>
          <Accordion allowMultiple defaultIndex={[0]}>
            {data.map(
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
                        <PoolHeaderInfo
                          tokenName={tokenName}
                          tokenSymbol={tokenSymbol}
                          tokenAddress={tokenContract}
                          TVL={totalStaked}
                          rewardPool={rewardPool}
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
                            My Stakes & Rewards
                          </Tab>
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
                                <AccountInfo
                                  address={selectedAccount}
                                  AzeroBalance={AZeroBalance}
                                  token1Balance={myTokenBalance}
                                  token1Symbol={tokenSymbol}
                                />


                              </VStack>
                              <VStack
                                w="full"
                                spacing="5px"
                                px={['0px', '30px']}
                                pb={['10px', '30px']}
                              >
                                <Card w="full" variant="elevated">
                                  <CardHeader>
                                    <Heading size='sm' align="left">Staking Information</Heading>
                                  </CardHeader>
                                  <CardBody paddingTop="5px">

                                      <Flex flexDirection={['column', 'row']}  >
                                        <Stat align="left">
                                          <StatLabel>My Stakes ({tokenSymbol})</StatLabel>
                                          <StatNumber fontSize="19px"color="#63b3ed">
                                            {stakeInfo
                                              ? numberWithCommas(
                                                  (
                                                    stakeInfo.stakedValue.replace(
                                                      /\,/g,
                                                      ''
                                                    ) /
                                                    10 ** 12
                                                  ).toFixed(3)
                                                )
                                              : 0}{' '}

                                          </StatNumber>
                                        </Stat>
                                        <Stat align="left">
                                          <StatLabel>Last Claim</StatLabel>
                                          <StatNumber fontSize="19px"color="#63b3ed">
                                            {stakeInfo
                                              ?
                                                (
                                                  convertTimeStampNoTime(stakeInfo.lastRewardUpdate.replace(
                                                    /\,/g,
                                                    ''
                                                  )/1)
                                                )
                                              : 0}{' '}

                                          </StatNumber>
                                        </Stat>

                                      </Flex>
                                      <Divider  paddingTop="5px" />
                                      <Flex flexDirection={['column', 'row']}  paddingTop="5px" >
                                        <Stat align="left">
                                          <StatLabel>My Unclaimed Rewards ({tokenSymbol})</StatLabel>
                                          <StatNumber fontSize="19px"color="#63b3ed">
                                            {stakeInfo
                                              ? (
                                                  stakeInfo.unclaimedReward.replace(
                                                    /\,/g,
                                                    ''
                                                  ) /
                                                    10 ** 12 +
                                                  (((new Date().getTime() / 1000 -
                                                    stakeInfo.lastRewardUpdate.replace(
                                                      /\,/g,
                                                      ''
                                                    ) /
                                                      1000) /
                                                    (365 * 24 * 60 * 60)) *
                                                    (apy / 10000) *
                                                    stakeInfo.stakedValue.replace(
                                                      /\,/g,
                                                      ''
                                                    )) /
                                                    10 ** 12
                                                ).toFixed(12)
                                              : 0}{' '}

                                          </StatNumber>
                                        </Stat>
                                      </Flex>
                                      <Flex flexDirection={['column', 'row']}  paddingTop="10px" >
                                        <Button
                                          variant='solid' colorScheme='blue'
                                          onClick={() => claim_rewards(poolContract)}
                                        >
                                          Claim Rewards
                                        </Button>
                                      </Flex>
                                      <Divider  paddingTop="15px" />
                                      <Flex flexDirection={['column', 'row']}  paddingTop="5px" >
                                        <Stat align="left">

                                          <StatNumber fontSize="19px"color="#63b3ed">
                                            <Input
                                              marginTop="7px"
                                              type="number"
                                              value={stakeAmount}
                                              placeholder="Enter amount to stake or unstake"
                                              onChange={(e) =>
                                                setStakeAmount(e.target.value)
                                              }
                                            />
                                          </StatNumber>
                                        </Stat>


                                      </Flex>
                                      <Flex flexDirection={['column', 'row']}  paddingTop="15px" >
                                        <ButtonGroup spacing='2'>
                                          <Button
                                            variant='solid' colorScheme='blue'
                                            onClick={() =>
                                              stake(
                                                tokenContract,
                                                poolContract,
                                                myTokenBalance,
                                                rewardPool
                                              )
                                            }
                                          >
                                            Stake
                                          </Button>
                                          <Button
                                            variant='solid' colorScheme='blue'
                                            onClick={() => unstake(poolContract,stakeInfo.stakedValue.replace(
                                              /\,/g,
                                              ''
                                            ) /
                                            10 ** 12)}
                                          >
                                            Unstake
                                          </Button>
                                        </ButtonGroup>
                                      </Flex>
                                  </CardBody>
                                </Card>
                              </VStack>

                            </Flex>

                          </TabPanel>
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
                                  rewardPool={rewardPool}
                                  TVL={totalStaked}
                                  rewardSymbol={tokenSymbol}
                                  stakeSymbol={tokenSymbol}
                                  address={poolContract}
                                  startDate={parseInt(startTime)}
                                />

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

        </section>
      </Box>
    </Box>
  );
};

export default ViewPool;
