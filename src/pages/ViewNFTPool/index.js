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
import NFTInfo from '../../components/NFTInfo';
import NFTHeaderInfo from '../../components/NFTInfo/header';
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

let isLoadingData = false;
const ViewNFTPool = () => {
  const forceUpdate = useForceUpdate();
  const { nftPoolAddress } = useParams();
  const selectedAccount = useSelector((s) => s.substrate.selectedAccount);
  const extensionName = useSelector((s) => s.substrate.extensionName);
  const api = useSelector((s) => s.substrate.api);

  const [AZeroBalance, setAZeroBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [NFTdata, setNFTdata] = useState([]);
  const [userNFTs, setUserNFTs] = useState([]);
  const [staked_nfts, setStakedNFTs] = useState([]);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [unstakeAmount, setUnstakeAmount] = useState(0);

  const claim_rewards = async (poolContract) => {
    console.log('claim_rewards');
    if (!api || selectedAccount==""){
      toast.error("Please connect your wallet");
      return;
    }
    nft_pool_contract.setNFTPoolContract(api, {
      CONTRACT_ADDRESS: poolContract,
      CONTRACT_ABI: nft_pool.CONTRACT_ABI,
    });
    let claim_rewards = await nft_pool_contract.claimReward(
      selectedAccount,
      extensionName
    );
    await delay(2000);
    getNFTData();
    getBalance();
  };
  const updateStakingInfo = async () =>{
    if (isLoadingData) return;
    let pools = NFTdata;
    setNFTdata(pools);

    forceUpdate();
  }
  useInterval(() => updateStakingInfo(), 1000);

  const getNFTData = async () => {
    isLoadingData = true;
    if (!isValidAddressPolkadotAddress(nftPoolAddress)){
      toast.error("Invalid Pool Address");
      isLoadingData = false;
      return;
    }
    if (!api) {
      isLoadingData = false;
      return;
    }
    // setLoading(true);
    let poollist = await clientAPI('post', '/getNFTPoolByAddress', { poolContract: nftPoolAddress });
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

      nft_pool_contract.setNFTPoolContract(api, {
        CONTRACT_ADDRESS: _pool.poolContract,
        CONTRACT_ABI: nft_pool.CONTRACT_ABI,
      });

      let stakeInfo = await nft_pool_contract.getStakeInfo(
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

      let nft_info = await azclientAPI('post', '/getCollectionByAddress', { collection_address: _pool.NFTtokenContract });
      //console.log("nft_info",nft_info);

      let user_nfts = await azclientAPI('post', '/getNFTsByOwnerAndCollection', { collection_address: _pool.NFTtokenContract, owner: selectedAccount });
      console.log("user_nfts",user_nfts);
      if (Array.isArray(user_nfts)){
        setUserNFTs(user_nfts);
      }

      //get all staked nfts
      let staked_nfts = [];
      if (stakeInfo){
        console.log(stakeInfo,parseInt(stakeInfo.stakedValue));
        for (var staked_index = 0; staked_index< parseInt(stakeInfo.stakedValue) ; staked_index++){
          //console.log(staked_index);
            let stakedID = await nft_pool_contract.getStakedId(selectedAccount,selectedAccount,staked_index);
            // console.log(stakedID,stakedID.U64);
            if (stakedID != null){
              let stakedNFT = await azclientAPI('post', '/getNFTByID', { collection_address: _pool.NFTtokenContract, token_id: parseInt(stakedID.U64) })
              if (stakedNFT.length >0)
                staked_nfts.push(stakedNFT[0]);
              await delay(100);
            }
        }
        // console.log(staked_nfts);
        setStakedNFTs(staked_nfts);
      }

      poollist[index].stakeInfo = stakeInfo;
      poollist[index].myTokenBalance = myTokenBalance;
      poollist[index].nft_info = nft_info;
    }
    setNFTdata(poollist);
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
  const stake = async (poolContract,psp34Contract,tokenID,rewardPool) => {
    if (!api || selectedAccount==""){
      toast.error("Please connect your wallet");
      return;
    }
    if (parseInt(rewardPool) == 0){
      toast.error('There is no reward balance in this pool');
      return;
    }
    await azclientAPI('post', '/updateNFT', { collection_address: psp34Contract, token_id: 177 });
    console.log('stake',tokenID,poolContract,psp34Contract);
    //Approve
    toast('Step 1');
    psp34_contract.setPSP34Contract(api, {
      CONTRACT_ADDRESS: psp34Contract,
      CONTRACT_ABI: psp34.CONTRACT_ABI,
    });
    let approve = await psp34_contract.approve(
      selectedAccount,
      extensionName,
      poolContract,
      { u64: tokenID },
      true
    );
    if (!approve) return;
    await delay(3000);

    toast('Step 2');
    let stake = await nft_pool_contract.stake(
      selectedAccount,
      extensionName,
      { u64: tokenID }
    );
    await clientAPI('post', '/update', { type: "nft",poolContract });
    await delay(2000);
    getBalance();
    await azclientAPI('post', '/updateNFT', { collection_address: psp34Contract, token_id: tokenID });
    toast('Please wait up to 10s for the data to be updated');
    await delay(3000);
    getNFTData();
  };
  const unstake = async (poolContract,psp34Contract,tokenID) => {
    if (!api || selectedAccount==""){
      toast.error("Please connect your wallet");
      return;
    }
    nft_pool_contract.setNFTPoolContract(api, {
      CONTRACT_ADDRESS: poolContract,
      CONTRACT_ABI: nft_pool.CONTRACT_ABI,
    });
    psp22_contract.setPSP22Contract(api, {
      CONTRACT_ADDRESS: wal.CONTRACT_ADDRESS,
      CONTRACT_ABI: psp22.CONTRACT_ABI,
    });
    let unstakeFee = await nft_pool_contract.unstakeFee(selectedAccount);
    let wal_balance = await psp22_contract.balanceOf(
      selectedAccount,
      selectedAccount
    );
    console.log(unstakeFee,wal_balance,stakeAmount,poolContract,stakeAmount);
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

        let unstake = await nft_pool_contract.unstake(
          selectedAccount,
          extensionName,
          { u64: parseInt(tokenID) },
        );
        await clientAPI('post', '/update', { type: "nft",poolContract });
        await delay(2000);
        getBalance();

        await azclientAPI('post', '/updateNFT', { collection_address: psp34Contract, token_id: tokenID });
        toast('Please wait up to 10s for the data to be updated');
        await delay(3000);
        getNFTData();
      }
    })

  };
  useEffect(() => {
    getBalance();
    getNFTData();
  },[selectedAccount]);
  return (
    <Box mx="auto" as="section" px={['16px', '24px']} maxW="container.xl">
      <Box textAlign="center" px={['0px', '8px']}>
        <section className="Update--table-box">
          <Heading py="10px" fontSize="32px" fontWeight="normal"  align="left">
            NFT Yield Farm
          </Heading>
          <Accordion allowMultiple defaultIndex={[0]}>
            {NFTdata.map(
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
                      <Tabs align='center'>
                        <TabList>
                          <Tab color="gray" _selected={{ color: '#63b3ed' }}>
                            My Stakes & Rewards
                          </Tab>
                          <Tab color="gray" _selected={{ color: '#63b3ed' }}>
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
                                          <StatLabel>My Stakes ({nft_info ? nft_info[0].name : ""} NFT)</StatLabel>
                                          <StatNumber color="#63b3ed">
                                            {stakeInfo
                                              ?
                                                  stakeInfo.stakedValue.replace(
                                                    /\,/g,
                                                    ''
                                                  )
                                              : 0}{' '}
                                          </StatNumber>
                                        </Stat>
                                        <Stat align="left">
                                          <StatLabel>Last Claim</StatLabel>
                                          <StatNumber color="#63b3ed">
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
                                          <StatNumber color="#63b3ed">
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
                                                    ( 24 * 60 * 60)) *
                                                    (multiplier) *
                                                    stakeInfo.stakedValue.replace(
                                                      /\,/g,
                                                      ''
                                                    )) /
                                                    10 ** tokenDecimal
                                                ).toFixed(12)
                                              : 0}{' '}
                                          </StatNumber>
                                        </Stat>
                                      </Flex>

                                  </CardBody>
                                  <CardFooter align="center">
                                    <ButtonGroup spacing='2'>

                                      <Button
                                        variant='solid' colorScheme='blue'
                                        onClick={() => claim_rewards(poolContract)}
                                      >
                                        Claim Rewards
                                      </Button>

                                    </ButtonGroup>
                                  </CardFooter>
                                </Card>
                              </VStack>
                            </Flex>
                            <Tabs align='center' >
                              <TabList>
                                <Tab color="gray" _selected={{ color: '#63b3ed' }}>
                                  Available NFTs
                                </Tab>
                                <Tab color="gray" _selected={{ color: '#63b3ed' }}>
                                  Staked NFTs
                                </Tab>
                              </TabList>
                              <TabPanels>
                                <TabPanel>
                                  {userNFTs.length == 0 ? "No NFT available in your account" : ""}
                                  <Wrap spacing='30px' padding='50px'>
                                    {userNFTs.map(
                                      (
                                        {
                                          nftName,
                                          avatar,
                                          is_for_sale,
                                          tokenID
                                        }
                                      ) => (
                                        <WrapItem>
                                          <VStack spacing="5px" alignItems="stretch">
                                            <ImageCloudFlare
                                              h={'230px'}
                                              w={'230px'}
                                              src={avatar}
                                              alt={`${nftName}`}
                                            />
                                            <Text>{nftName}</Text>
                                            <Button colorScheme='blue'
                                              onClick={()=>stake(poolContract,nft_info[0].nftContractAddress,tokenID,rewardPool)}
                                            >Stake</Button>
                                          </VStack>
                                        </WrapItem>
                                      )
                                    )}
                                  </Wrap>
                                </TabPanel>
                                <TabPanel>
                                  {userNFTs.length == 0 ? "No staked NFT in your account" : ""}
                                  <Wrap spacing='30px' padding='50px'>
                                    {staked_nfts.map(
                                      (
                                        {
                                          nftName,
                                          avatar,
                                          is_for_sale,
                                          tokenID
                                        }
                                      ) => (
                                        <WrapItem>
                                          <VStack spacing="5px" alignItems="stretch">
                                            <ImageCloudFlare
                                              h={'230px'}
                                              w={'230px'}
                                              src={avatar}
                                              alt={`${nftName}`}
                                            />
                                            <Text>{nftName}</Text>
                                            <Button colorScheme='blue'
                                              onClick={()=>unstake(poolContract,nft_info[0].nftContractAddress,tokenID)}
                                            >Unstake</Button>
                                          </VStack>
                                        </WrapItem>
                                      )
                                    )}
                                  </Wrap>
                                </TabPanel>
                              </TabPanels>
                            </Tabs>
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
                                  multiplier={multiplier/1000000}
                                  poolLength={duration / (24 * 60 * 60)}
                                  rewardPool={rewardPool}
                                  TVL={totalStaked}
                                  rewardSymbol={tokenSymbol}
                                  stakeSymbol={"NFTs"}
                                  address={poolContract}
                                  startDate={parseInt(startTime)}
                                />
                                <TokenInfo
                                  title="Reward Token Information"
                                  name={tokenName}
                                  symbol={tokenSymbol}
                                  decimal={tokenDecimal}
                                  totalSupply={tokenTotalSupply}
                                  address={tokenContract}
                                />
                              </VStack>
                              <VStack
                                w="full"
                                spacing="5px"
                                px={['0px', '30px']}
                                pb={['10px', '30px']}
                              >
                                <NFTInfo title="NFT Information" nft_info={nft_info[0]}/>
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

export default ViewNFTPool;
