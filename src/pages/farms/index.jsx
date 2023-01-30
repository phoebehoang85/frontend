import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Select,
  Stack,
  Switch,
} from "@chakra-ui/react";
import SectionContainer from "components/container/SectionContainer";
import IWInput from "components/input/Input";

import { IWTable } from "components/table/IWTable";
import IWTabs from "components/tabs/IWTabs";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { APICall } from "api/client";
import nft_pool_contract from "utils/contracts/nft_pool_contract";
import { execContractQuery } from "utils/contracts";
import { formatChainStringToNumber } from "utils";
import lp_pool_contract from "utils/contracts/lp_pool_contract";
import { useMemo } from "react";

export default function FarmsPage() {
  const { currentAccount } = useSelector((s) => s.wallet);
  const [nftLPList, setNftLPList] = useState([]);
  const [tokenLPList, setTokenLPList] = useState([]);

  const [showMyStakedPools, setShowMyStakedPools] = useState(false);
  const [hideZeroRewardPools, setHideZeroRewardPools] = useState(false);

  useEffect(() => {
    let isUnmounted = false;

    const fetchNftLPList = async () => {
      try {
        const { status, ret } = await APICall.getNftLPList();

        if (status === "OK") {
          const nftLPListAddNftInfo = await Promise.all(
            ret?.map(async (nftLP) => {
              // get collection info
              const { status, ret } =
                await APICall.getCollectionByAddressFromArtZero({
                  collection_address: nftLP?.NFTtokenContract,
                });

              if (status === "OK") {
                nftLP = { ...nftLP, nftInfo: ret[0] };
              }

              // get stake info NFT LP Pool
              let queryResult = await execContractQuery(
                currentAccount?.address,
                "api",
                nft_pool_contract.CONTRACT_ABI,
                nftLP?.poolContract,
                0,
                "genericPoolContractTrait::getStakeInfo",
                currentAccount?.address
              );

              let stakeInfo = queryResult?.toHuman();

              if (stakeInfo) {
                stakeInfo = {
                  ...stakeInfo,
                  lastRewardUpdate: formatChainStringToNumber(
                    stakeInfo.lastRewardUpdate
                  ),
                  stakedValue: formatChainStringToNumber(stakeInfo.stakedValue),
                  unclaimedReward: formatChainStringToNumber(
                    stakeInfo.unclaimedReward
                  ),
                };
              }

              return { ...nftLP, stakeInfo };
            })
          );

          if (isUnmounted) return;
          setNftLPList(nftLPListAddNftInfo);
        }
      } catch (error) {
        console.log("error", error.message);
      }
    };
    fetchNftLPList();

    return () => (isUnmounted = true);
  }, [currentAccount?.address]);

  useEffect(() => {
    let isUnmounted = false;

    const fetchTokenLPList = async () => {
      try {
        const { status, ret } = await APICall.getTokenLPList();

        if (status === "OK") {
          const tokenLPListAddNftInfo = await Promise.all(
            ret?.map(async (tokenLP) => {
              // get stake info
              let queryResult = await execContractQuery(
                currentAccount?.address,
                "api",
                lp_pool_contract.CONTRACT_ABI,
                tokenLP?.poolContract,
                0,
                "genericPoolContractTrait::getStakeInfo",
                currentAccount?.address
              );

              let stakeInfo = queryResult?.toHuman();

              if (stakeInfo) {
                stakeInfo = {
                  ...stakeInfo,
                  lastRewardUpdate: formatChainStringToNumber(
                    stakeInfo.lastRewardUpdate
                  ),
                  stakedValue: formatChainStringToNumber(stakeInfo.stakedValue),
                  unclaimedReward: formatChainStringToNumber(
                    stakeInfo.unclaimedReward
                  ),
                };
              }

              return { ...tokenLP, stakeInfo };
            })
          );

          if (isUnmounted) return;
          setTokenLPList(tokenLPListAddNftInfo);
          // setTokenLPList(ret);
        }
      } catch (error) {
        console.log("error", error.message);
      }
    };
    fetchTokenLPList();

    return () => (isUnmounted = true);
  }, [currentAccount?.address]);

  const nftLPListFiltered = useMemo(() => {
    //TODO; add filter OR ? AND?

    let ret = nftLPList;

    if (showMyStakedPools) {
      ret = nftLPList.filter((p) => p.stakeInfo);
    }

    if (hideZeroRewardPools) {
      ret = nftLPList.filter((p) => p.rewardPool > 0);
    }
    return ret;
  }, [hideZeroRewardPools, nftLPList, showMyStakedPools]);

  const tokenLPListFiltered = useMemo(() => {
    //TODO; add filter OR ? AND?

    let ret = tokenLPList;

    if (showMyStakedPools) {
      ret = tokenLPList.filter((p) => p.stakeInfo);
    }

    if (hideZeroRewardPools) {
      ret = tokenLPList.filter((p) => p.rewardPool > 0);
    }
    return ret;
  }, [hideZeroRewardPools, tokenLPList, showMyStakedPools]);

  const tableDataNFT = {
    tableHeader: [
      {
        name: "nftInfo",
        hasTooltip: false,
        tooltipContent: "",
        label: "Stake",
      },
      {
        name: "tokenSymbol",
        hasTooltip: false,
        tooltipContent: "",
        label: "Earn",
      },
      {
        name: "totalStaked",
        hasTooltip: true,
        tooltipContent: `Total Value Locked: Total tokens staked into this pool`,
        label: "TVL",
      },
      {
        name: "rewardPool",
        hasTooltip: true,
        tooltipContent: `Available tokens to pay for stakers`,
        label: "Reward Pool",
      },
      {
        name: "multiplier",
        hasTooltip: true,
        tooltipContent: `Multiplier determines how many reward tokens will the staker receive per 1 NFTs in 24 hours.`,
        label: "Multiplier",
      },
      {
        name: "startTime",
        hasTooltip: false,
        tooltipContent: "",
        label: "Expired In",
      },
      {
        name: "stakeInfo",
        hasTooltip: false,
        tooltipContent: "",
        label: "My Stake",
      },
    ],

    tableBody: nftLPListFiltered,
  };

  const tableDataToken = {
    tableHeader: [
      {
        name: "tokenName",
        hasTooltip: false,
        tooltipContent: "",
        label: "Stake",
      },
      {
        name: "lptokenSymbol",
        hasTooltip: false,
        tooltipContent: "",
        label: "Earn",
      },
      {
        name: "totalStaked",
        hasTooltip: true,
        tooltipContent: `Total Value Locked: Total tokens staked into this pool`,
        label: "TVL",
      },
      {
        name: "rewardPool",
        hasTooltip: true,
        tooltipContent: `Available tokens to pay for stakers`,
        label: "Reward Pool",
      },
      {
        name: "multiplier",
        hasTooltip: true,
        tooltipContent: `Multiplier determines how many reward tokens will the staker receive per 1 token in 24 hours.`,
        label: "Multiplier",
      },

      {
        name: "startTime",
        hasTooltip: false,
        tooltipContent: "",
        label: "Expired In",
      },
      {
        name: "stakeInfo",
        hasTooltip: false,
        tooltipContent: "",
        label: "My Stake",
      },
    ],

    tableBody: tokenLPListFiltered,
  };

  const tabsData = [
    {
      label: <>NFT Yield Farms</>,
      component: <IWTable {...tableDataNFT} mode="NFT_FARM" />,
      isDisabled: false,
    },
    {
      label: <>Token Yield Farms</>,
      component: <IWTable {...tableDataToken} mode="TOKEN_FARM" />,
      isDisabled: false,
    },
  ];

  return (
    <SectionContainer
      mt={{ base: "0px", xl: "20px" }}
      title="Yield Farms"
      description={<span>Stake NFT or Tokens to earn more</span>}
    >
      <Stack
        w="full"
        spacing="30px"
        alignItems="start"
        direction={{ base: "column" }}
      >
        <Stack
          w="100%"
          spacing="20px"
          direction={{ base: "column" }}
          align={{ base: "column", xl: "center" }}
        >
          <IWInput
            type="number"
            placeholder="Search"
            inputRightElementIcon={<SearchIcon color="text.1" />}
          />
        </Stack>

        <HStack
          color="text.1"
          fontSize="md"
          w="full"
          spacing={{ base: "0px", lg: "20px" }}
          justifyContent={{ base: "end" }}
          flexDirection={{ base: "column", lg: "row" }}
          align={{ base: "column", xl: "center" }}
          pt={{ base: "0px", lg: "10px" }}
        >
          <Flex
            w="full"
            mb={{ base: "10px", lg: "0px" }}
            align={{ base: "center" }}
            justifyContent={{ base: "end" }}
            spacing={{ base: "0px", lg: "20px" }}
          >
            <FormControl maxW="135px" display="flex" alignItems="center">
              <Switch
                id="my-stake"
                isDisabled={!currentAccount?.address}
                isChecked={showMyStakedPools}
                onChange={() => setShowMyStakedPools(!showMyStakedPools)}
              />{" "}
              <FormLabel htmlFor="my-stake" mb="0" ml="10px" fontWeight="400">
                My Stake
              </FormLabel>
            </FormControl>

            <FormControl maxW="200px" display="flex" alignItems="center">
              <Switch
                id="zero-reward-pools"
                isDisabled={!currentAccount?.address}
                isChecked={hideZeroRewardPools}
                onChange={() => setHideZeroRewardPools(!hideZeroRewardPools)}
              />{" "}
              <FormLabel
                mb="0"
                ml="10px"
                fontWeight="400"
                htmlFor="zero-reward-pools"
              >
                Zero Reward Pools
              </FormLabel>
            </FormControl>
          </Flex>

          <Box minW="155px" maxW="160px">
            <Select
              cursor="pointer"
              border="0px red dotted"
              id="token"
              fontSize="md"
              fontWeight="400"
              variant="unstyled"
              placeholder="Sort by selection"
            >
              {["Low to hight", "Low to hight", "Newest"].map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Box>
        </HStack>

        <IWTabs tabsData={tabsData} />
      </Stack>
    </SectionContainer>
  );
}
