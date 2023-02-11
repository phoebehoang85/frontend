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
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'

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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import AddressCopier from '../AddressCopier/AddressCopier';
import TokenInfo from '../TokenInfo';
import PoolInfo from '../PoolInfo';
import AccountInfo from '../AccountInfo';
import PoolHeaderInfo from '../PoolInfo/header';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/react'
import { QuestionOutlineIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import Swal from 'sweetalert2';
import useForceUpdate from 'use-force-update';

let currentPage = 1;
let isLoadingData = false;
const PoolTable = () => {
  const forceUpdate = useForceUpdate();
  const selectedAccount = useSelector((s) => s.substrate.selectedAccount);
  const extensionName = useSelector((s) => s.substrate.extensionName);

  const [AZeroBalance, setAZeroBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState('newTokens');
  const [data, setdata] = useState([]);
  const [showNoRewardPool, setShowNoRewardPool] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const api = useSelector((s) => s.substrate.api);
  const [stakeAmount, setStakeAmount] = useState(null);

  const getData = async (newPage=1) => {
    if (!api) return;
    setLoading(true);
    setdata([]);
    isLoadingData = true;
    let poollist = await clientAPI('post', '/getPools', { sort: 1, limit:5, offset:5*(newPage-1), showZeroPool:showNoRewardPool });
    console.log(poollist);
    // setdata(poollist);
    if (!poollist || poollist.length == 0){
      setLoading(false);
      isLoadingData = false;
      return;
    }
    setCurrentPage(newPage);
    if (selectedAccount == '') {
      setdata(poollist);
      setLoading(false);
      isLoadingData = false;
      return;
    }


    let poolCount = poollist.length;
    //console.log('poolCount', poolCount);

    if (poolCount <= 0) return;

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

      poollist[index].stakeInfo = stakeInfo;
    }
    // poollist = poollist.sort(function(a, b){
    //   if (b.stakeInfo) return 1;
    //   return -1;
    // });

    setdata(poollist);
    setLoading(false);
    await delay(2000);
    isLoadingData = false;
    //console.log(pools);
  };

  const page = async (newPage) =>{
    if (newPage<1) newPage = 1;
    if (newPage == currentPage) return;
    await getData(newPage);
  }

  const updateStakingInfo = async () =>{
    if (isLoadingData) return;
    let pools = data;
    setdata(pools);

    forceUpdate();
  }
  useInterval(() => updateStakingInfo(), 1000);
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
    getData(currentPage);
    getBalance();

  }, [api, selectedAccount, showNoRewardPool]);

  return (
    <Box textAlign="center" px={['0px', '8px']}>
      <section className="Update--table-box">
        <Heading py="10px" fontSize="32px" fontWeight="normal" align="left">
          Staking Pools
        </Heading>
        <Text color="white" align="left">
        Stake some tokens to earn more.
        High APR, low risk.
        </Text>
        <Text color="white">
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
            <Tab>Active Pools</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Accordion allowMultiple>
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
                        <Link to={"/pool/"+ poolContract}>
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
                              stakedValue={stakeInfo ? stakeInfo.stakedValue.replace(
                                /\,/g,
                                ''
                              ) /
                              10 ** 12
                              :
                              0
                            }
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

export default PoolTable;
