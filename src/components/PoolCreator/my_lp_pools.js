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
import lp_pool_generator_contract from '../../contracts/lp_pool_generator_calls';
import psp22_contract from '../../contracts/psp22_calls';
import lp_pool_contract from '../../contracts/lp_pool_calls';
import lp_pool from '../../contracts/lp_pool';
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
import LPPoolHeaderInfo from '../PoolInfo/lpheader';
import AccountInfo from '../../components/AccountInfo';
import { Link } from 'react-router-dom';

// let currentPage = 1;
const MyLPPools = () => {
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

    // setLoading(true);

    let poollist = await clientAPI('post', '/getLPPoolByOwner', { owner: selectedAccount });

    // let poolCount = poollist.length;
    //console.log('poollist', poollist);
    //
    // for (let index = 0; index < poolCount; index++) {
    //   const _pool = poollist[index];
    //
    //
    //   lp_pool_contract.setLPPoolContract(api, {
    //     CONTRACT_ADDRESS: _pool.poolContract,
    //     CONTRACT_ABI: lp_pool.CONTRACT_ABI,
    //   });
    //
    //   let stakeInfo = await lp_pool_contract.getStakeInfo(
    //     selectedAccount,
    //     selectedAccount
    //   );
    //   //console.log(poolContract,apy,rewardPool,totalStaked,tokenContract);
    //   psp22_contract.setPSP22Contract(api, {
    //     CONTRACT_ADDRESS: _pool.tokenContract,
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
    //   psp22_contract.setPSP22Contract(api, {
    //     CONTRACT_ADDRESS: _pool.lptokenContract,
    //     CONTRACT_ABI: psp22.CONTRACT_ABI,
    //   });
    //
    //   let lptokenName = await psp22_contract.tokenName(selectedAccount);
    //   let lptokenSymbol = await psp22_contract.tokenSymbol(selectedAccount);
    //   let lptokenDecimal = await psp22_contract.tokenDecimals(selectedAccount);
    //   let lptokenTotalSupply = await psp22_contract.totalSupply(selectedAccount);
    //   let myLPTokenBalance = await psp22_contract.balanceOf(
    //     selectedAccount,
    //     selectedAccount
    //   );
    //
    //   poollist[index].stakeInfo = stakeInfo;
    //   poollist[index].myTokenBalance = myTokenBalance;
    //   poollist[index].myLPTokenBalance = myLPTokenBalance;
    //   poollist[index].tokenName = tokenName;
    //   poollist[index].tokenSymbol = tokenSymbol;
    //   poollist[index].tokenDecimal = tokenDecimal;
    //   poollist[index].tokenTotalSupply = tokenTotalSupply;
    //
    //   poollist[index].lptokenName = lptokenName;
    //   poollist[index].lptokenSymbol = lptokenSymbol;
    //   poollist[index].lptokenDecimal = lptokenDecimal;
    //   poollist[index].lptokenTotalSupply = lptokenTotalSupply;
    //
    // }
    return poollist;
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
    setLoading(true);
    const pools = await getPoolData();
    console.log('fetchPools pools', pools);
    setPoolData(pools);
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    try {
      fetchPools();
      getBalance();
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
    console.log('asdasd',loading,data)
  }, [api,selectedAccount,newPool]);

  return (
    <Box textAlign="center" px="8px">
      <section className="Update--table-box">
        <Heading py="10px" fontSize="32px" fontWeight="normal" align="left">
          My Yield Farms
        </Heading>

        {loading ? (
          <Text>Loading...</Text>
        ) : !loading && data?.length === 0 ? (
          <Text align="left">"You don't have any farm, please create one"</Text>
        ) : (
          <Accordion allowMultiple>
            {data?.map(
              (
                {
                  poolContract,
                  multiplier,
                  lptokenName,
                  lptokenSymbol,
                  lptokenContract,
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
                    <Link to={"/my-lp-pool/"+ poolContract}>
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
      </section>
    </Box>
  );
};

export default MyLPPools;
