import React, { useEffect, useState, useCallback, Fragment } from 'react';
import images from '../../constants/images';
import { useDispatch, useSelector } from 'react-redux';
import {
  truncateStr,
  numberWithCommas,
  convertTimeStamp,
  secondsToTimeString,
  delay,
  formatNumDynamicDecimal,
  convertTimeStampNoTime
} from '../../utils';
//import '../TokenList/TokenList.css';
import { clientAPI } from '../../api/client';
import { azclientAPI } from '../../api/az_client';
import useInterval from '../../hooks/useInterval';
import toast from 'react-hot-toast';
import pool_generator_contract from '../../contracts/pool_generator_calls';
import nft_pool_generator_contract from '../../contracts/nft_pool_generator_calls';
import psp22_contract from '../../contracts/psp22_calls';
import pool_contract from '../../contracts/pool_calls';
import lp_pool_contract from '../../contracts/lp_pool_calls';
import nft_pool_contract from '../../contracts/nft_pool_calls';
import pool from '../../contracts/pool';
import nft_pool from '../../contracts/nft_pool';
import lp_pool from '../../contracts/lp_pool';
import psp22 from '../../contracts/psp22';
import AzeroIcon from '../../theme/assets/icon/AzeroIcon.js';
import wal from '../../contracts/azt';

import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  ButtonGroup,
  VStack,
  Input
} from '@chakra-ui/react';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import AddressCopier from '../AddressCopier/AddressCopier';
import { Link } from 'react-router-dom';
import TokenInfo from '../TokenInfo';
import PoolInfo from '../PoolInfo';
import AccountInfo from '../AccountInfo';
import LPPoolHeaderInfo from '../PoolInfo/lpheader';
import NFTHeaderInfo from '../NFTInfo/header';
import ImageCloudFlare from '../../components/ImageCF/ImageCloudFlare';
import { Tooltip } from '@chakra-ui/react'
import { QuestionOutlineIcon, ArrowLeftIcon, ArrowRightIcon  } from '@chakra-ui/icons'
import Swal from 'sweetalert2';
import useForceUpdate from 'use-force-update';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'

let currentPage = 1;
let isLoadingData = false;
const FarmTable = () => {
  const forceUpdate = useForceUpdate();
  const selectedAccount = useSelector((s) => s.substrate.selectedAccount);
  const extensionName = useSelector((s) => s.substrate.extensionName);

  const [AZeroBalance, setAZeroBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState('newTokens');
  const [NFTdata, setNFTdata] = useState([]);
  const [LPdata, setLPdata] = useState([]);
  const [showNoRewardPool, setShowNoRewardPool] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(1);

  const api = useSelector((s) => s.substrate.api);
  const [stakeAmount, setStakeAmount] = useState("");

  const getNFTData = async (newPage=1) => {
    if (!api) return;
    setLoading(true);
    isLoadingData = true;
    setNFTdata([]);
    let poollist = await clientAPI('post', '/getNFTPools', { sort: 1, limit:5, offset:5*(newPage-1), showZeroPool:showNoRewardPool });
    if (!poollist || poollist.length == 0){
      setLoading(false);
      isLoadingData = false;
      return;
    }

    setCurrentPage(newPage);

    let poolCount = poollist.length;
    //console.log('poolCount', poolCount);

    if (poolCount <= 0) return;

    for (let index = 0; index < poolCount; index++) {
      const _pool = poollist[index];

      nft_pool_contract.setNFTPoolContract(api, {
        CONTRACT_ADDRESS: _pool.poolContract,
        CONTRACT_ABI: nft_pool.CONTRACT_ABI,
      });
      if (selectedAccount != ''){
        let stakeInfo = await nft_pool_contract.getStakeInfo(
          selectedAccount,
          selectedAccount
        );
        poollist[index].stakeInfo = stakeInfo;
      }

      let nft_info = await azclientAPI('post', '/getCollectionByAddress', { collection_address: _pool.NFTtokenContract });

      poollist[index].nft_info = nft_info;
      console.log(nft_info)
    }
    // poollist = poollist.sort(function(a, b){
    //   if (b.stakeInfo) return 1;
    //   return -1;
    // });
    //Array.isArray(fruits)
    setNFTdata(poollist.filter(nft => Array.isArray(nft.nft_info)));
    setLoading(false);
    //console.log(pools);
  };
  const getLPData = async (newPage=1) => {
    if (!api) return;
    setLoading(true);
    isLoadingData = true;
    setLPdata([]);
    let poollist = await clientAPI('post', '/getLPPools', { sort: 1, limit:5, offset:5*(newPage-1), showZeroPool:showNoRewardPool });
    //console.log(poollist);
    // setdata(poollist);
    if (!poollist || poollist.length == 0){
      setLoading(false);
      isLoadingData = false;
      return;
    }
    setCurrentPage(newPage);
    if (selectedAccount == '') {
      setLPdata(poollist);
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

      lp_pool_contract.setLPPoolContract(api, {
        CONTRACT_ADDRESS: _pool.poolContract,
        CONTRACT_ABI: lp_pool.CONTRACT_ABI,
      });
      if (selectedAccount != ''){
        let stakeInfo = await lp_pool_contract.getStakeInfo(
          selectedAccount,
          selectedAccount
        );
        poollist[index].stakeInfo = stakeInfo;
      }

    }
    // poollist = poollist.sort(function(a, b){
    //   if (b.stakeInfo) return 1;
    //   return -1;
    // });
    setLPdata(poollist);
    //console.log("LP Pools",poollist);
    setLoading(false);
    await delay(2000);
    isLoadingData = false;
  };
  const updateStakingInfo = async () =>{
    if (isLoadingData) return;
    let pools = LPdata;
    setLPdata(pools);

    pools = NFTdata;
    setNFTdata(pools);

    forceUpdate();
  }
  useInterval(() => updateStakingInfo(), 1000);
  // useInterval(() => getLPData(), 1 0000);
  const page = async (newPage) =>{
    if (newPage<1) newPage = 1;
    if (newPage == currentPage) return;
    await getNFTData(newPage);
    await getLPData(newPage);
  }

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
    getNFTData(currentPage);
    getLPData(currentPage);
    getBalance();

  }, [api, selectedAccount, showNoRewardPool, currentPage]);

  return (
    <Box textAlign="center" px={['0px', '8px']}>
      <section className="Update--table-box">
        <Heading py="10px" fontSize="32px" fontWeight="normal" align="left">
          Yield Farms
        </Heading>
        <Text color="white" align="left">
        Stake NFT or Tokens to earn more
        </Text>
        <br />
        <Text color="#ffffff70">
          {loading ? 'Loading...' : ''}
        </Text>
        <Box textAlign="right" px={['0px', '8px']}>
          <Checkbox  colorScheme='green' onChange={(e) => setShowNoRewardPool(e.target.checked)} defaultChecked>
            Show ZERO Reward Pools
          </Checkbox>
        </Box>
        <Box textAlign="right" px={['0px', '8px']}>
          <Button colorScheme='blue' size='sm' marginRight="5px" onClick={() => page(currentPage - 1)}>
           <ArrowLeftIcon />
          </Button>
          <Button>
           {currentPage}
          </Button>
          <Button colorScheme='blue' size='sm' marginLeft="5px" onClick={() => page(currentPage + 1)}>
           <ArrowRightIcon />
          </Button>
        </Box>
        <Tabs>
          <TabList>
            <Tab onClick={()=>setCurrentPage(1)}>NFT Yield Farms</Tab>
            <Tab onClick={()=>setCurrentPage(2)}>Yield Farms</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Accordion allowMultiple>
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
                        <Link to={"/nft-pool/"+ poolContract}>
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
                              stakedValue={stakeInfo ? parseInt(stakeInfo.stakedValue)
                              :
                              0}
                            />
                          </AccordionButton>
                        </Link>
                      </AccordionItem>
                    </Fragment>
                  )
                )}
              </Accordion>
            </TabPanel>
            <TabPanel>
              <Accordion allowMultiple>
                {LPdata.map(
                  (
                    {
                      poolContract,
                      multiplier,
                      lptokenContract,
                      lptokenName,
                      lptokenSymbol,
                      lptokenDecimal,
                      tokenContract,
                      tokenName,
                      tokenSymbol,
                      tokenDecimal,
                      duration,
                      startTime,
                      tokenTotalSupply,
                      lptokenTotalSupply,
                      rewardPool,
                      totalStaked,
                      myTokenBalance,
                      myLPTokenBalance,
                      stakeInfo,
                    },
                    index
                  ) => (
                    <Fragment key={poolContract}>
                      <AccordionItem>
                        <Link to={"/lp-pool/"+ poolContract}>
                          <AccordionButton>
                            <LPPoolHeaderInfo
                              stakeName={lptokenName}
                              stakeSymbol={lptokenSymbol}
                              stakeAddress={lptokenContract}
                              rewardName={tokenName}
                              rewardSymbol={tokenSymbol}
                              rewardAddress={tokenContract}
                              TVL={totalStaked}
                              rewardPool={rewardPool}
                              multiplier={multiplier/1000000}
                              expiredIn={parseInt(
                                parseInt(startTime) / 1000 +
                                  parseInt(duration) -
                                  new Date().getTime() / 1000
                              )}
                              stakedValue={stakeInfo ? stakeInfo.stakedValue.replace(
                                /\,/g,
                                ''
                              ) /
                              10 ** 12
                              :
                              0}
                            />
                            <AccordionIcon ml="4px" color="#fff" />
                          </AccordionButton>
                        </Link>
                      </AccordionItem>
                    </Fragment>
                  )
                )}
              </Accordion>
            </TabPanel>
          </TabPanels>
        </Tabs>

      </section>
    </Box>
  );
};

export default FarmTable;
