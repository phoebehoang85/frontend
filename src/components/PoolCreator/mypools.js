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
import '../TokenList/TokenList.css';
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
import AddressCopier from '../AddressCopier/AddressCopier';
import Swal from 'sweetalert2';
import TokenInfo from '../TokenInfo';
import PoolInfo from '../PoolInfo';
import PoolHeaderInfo from '../PoolInfo/header';
import AccountInfo from '../AccountInfo';
import { Link } from 'react-router-dom';

// let currentPage = 1;
const MyPools = () => {
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

    let poollist = await clientAPI('post', '/getPoolByOwner', { owner: selectedAccount });
    //console.log('getPoolByOwner',poollist);

    // // setLoading(true);
    //
    // let poolCount = await pool_generator_contract.getPoolCountByOwner(
    //   selectedAccount,
    //   selectedAccount
    // );
    //
    // console.log('My poolCount', poolCount);
    //
    // let pools = [];
    // for (let index = 0; index < poolCount; index++) {
    //   // console.log(index);
    //   let poolIndex = await pool_generator_contract.getPoolByOwner(
    //     selectedAccount,
    //     selectedAccount,
    //     index
    //   );
    //   // console.log('pool index',poolIndex);
    //   //get pool contract
    //   let poolContract = await pool_generator_contract.getPool(
    //     selectedAccount,
    //     poolIndex
    //   );
    //
    //   pool_contract.setPoolContract(api, {
    //     CONTRACT_ADDRESS: poolContract,
    //     CONTRACT_ABI: pool.CONTRACT_ABI,
    //   });
    //
    //   //console.log(pool_contract);
    //
    //   let apy = await pool_contract.apy(selectedAccount);
    //   let rewardPool = await pool_contract.rewardPool(selectedAccount);
    //   let totalStaked = await pool_contract.totalStaked(selectedAccount);
    //   let startTime = await pool_contract.startTime(selectedAccount);
    //   let duration = await pool_contract.duration(selectedAccount);
    //   let tokenContract = await pool_contract.psp22ContractAddress(
    //     selectedAccount
    //   );
    //   let myStake = await pool_contract.psp22ContractAddress(selectedAccount);
    //   let stakeInfo = await pool_contract.getStakeInfo(
    //     selectedAccount,
    //     selectedAccount
    //   );
    //   //console.log(poolContract,apy,rewardPool,totalStaked,tokenContract);
    //   psp22_contract.setPSP22Contract(api, {
    //     CONTRACT_ADDRESS: tokenContract,
    //     CONTRACT_ABI: psp22.CONTRACT_ABI,
    //   });
    //   let tokenName = await psp22_contract.tokenName(selectedAccount);
    //   let tokenSymbol = await psp22_contract.tokenSymbol(selectedAccount);
    //   let tokenDecimal = await psp22_contract.tokenDecimals(selectedAccount);
    //   let tokenTotalSupply = await psp22_contract.totalSupply(selectedAccount);
    //   let myTokenBalance = await psp22_contract.balanceOf(
    //     selectedAccount,
    //     selectedAccount
    //   );
    //
    //   pools.push({
    //     poolContract,
    //     tokenContract,
    //     tokenName,
    //     tokenSymbol,
    //     tokenDecimal,
    //     duration,
    //     startTime,
    //     tokenTotalSupply,
    //     poolRewardPool: rewardPool,
    //     poolTotalStaked: totalStaked,
    //     myTokenBalance,
    //     apy,
    //     stakeInfo,
    //   });
    // }
    return poollist;
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

  return (
    <Box textAlign="center" px="8px">
        <Heading py="10px" fontSize="32px" fontWeight="normal" align="left">
          My Pools
        </Heading>

        {loading ? (
          <Text>Loading...</Text>
        ) : !loading && data?.length === 0 ? (
          <Text align="left">"You don't have any pool, please create one"</Text>
        ) : (
          <Accordion allowMultiple>
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
                  rewardPool,
                  totalStaked,
                  myTokenBalance,
                  stakeInfo,
                },
                index
              ) => (
                <Fragment key={poolContract}>
                  <AccordionItem>
                    <Link to={"/my-pool/"+ poolContract}>
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
                    </Link>
                  </AccordionItem>
                </Fragment>
              )
            )}
          </Accordion>
        )}
    </Box>
  );
};

export default MyPools;
