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
import AddressCopier from '../AddressCopier/AddressCopier';
import Swal from 'sweetalert2';
import TokenInfo from '../../components/TokenInfo';
import PoolInfo from '../../components/PoolInfo';
import AccountInfo from '../../components/AccountInfo';
import NFTInfo from '../../components/NFTInfo';
import NFTHeaderInfo from '../NFTInfo/header';
import { Link } from 'react-router-dom';

// let currentPage = 1;
const MyNFTPools = () => {
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

    let poollist = await clientAPI('post', '/getNFTPoolByOwner', { owner: selectedAccount });

    let poolCount = poollist.length;

    let pools = [];
    for (let index = 0; index < poolCount; index++) {

      let nft_info = await azclientAPI('post', '/getCollectionByAddress', { collection_address:poollist[index].NFTtokenContract });

      poollist[index].nft_info = nft_info;
    }
    return poollist;
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

  return (
    <Box textAlign="center" px="8px">
      <section className="Update--table-box">

        <Heading py="10px" fontSize="32px" fontWeight="normal" align="left">
          My NFT Yield Farms
        </Heading>

        {loading ? (
          <Text>Loading...</Text>
        ) : !loading && data?.length === 0 ? (
          <Text align="left">"You don't have any NFT farm, please create one"</Text>
        ) : (
          <Accordion allowMultiple>
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
                    <Link to={"/my-nft-pool/"+ poolContract}>
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

export default MyNFTPools;
