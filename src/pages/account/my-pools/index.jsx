import { Stack } from "@chakra-ui/react";
import SectionContainer from "components/container/SectionContainer";

import { IWTable } from "components/table/IWTable";
import { APICall } from "api/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatChainStringToNumber } from "utils";
import lp_pool_contract from "utils/contracts/lp_pool_contract";
import { execContractQuery } from "utils/contracts";
import nft_pool_contract from "utils/contracts/nft_pool_contract";
import IWTabs from "components/tabs/IWTabs";

export default function MyPoolsPage({ api }) {
  const { currentAccount } = useSelector((s) => s.wallet);

  const [poolsListData, setPoolsListData] = useState([]);

  useEffect(() => {
    let isUnmounted = false;

    const fetchPoolsList = async () => {
      try {
        const { status, ret } = await APICall.getStakingPoolsList();

        if (status === "OK") {
          const poolsListFiltered = ret.filter(
            (item) => item.owner === currentAccount?.address
          );

          if (isUnmounted) return;

          setPoolsListData(poolsListFiltered);
        }
      } catch (error) {
        console.log("error", error.message);
      }
    };
    fetchPoolsList();

    return () => (isUnmounted = true);
  }, [api, currentAccount?.address]);

  const tableData = {
    tableHeader: [
      {
        name: "tokenName",
        hasTooltip: false,
        tooltipContent: "",
        label: "Stake & Earn",
      },
      {
        name: "totalStaked",
        hasTooltip: true,
        tooltipContent: `Total Value Locked: Total tokens staked into this pool`,
        label: "TVL",
      },
      {
        name: "apy",
        hasTooltip: false,
        tooltipContent: "",
        label: "APR",
      },
      {
        name: "rewardPool",
        hasTooltip: true,
        tooltipContent: `Available tokens to pay for stakers`,
        label: "Reward Pool",
      },
      {
        name: "startTime",
        hasTooltip: false,
        tooltipContent: "",
        label: "Expired In",
      },
    ],

    tableBody: poolsListData,
  };

  return (
    <>
      <SectionContainer
        mt={{ base: "0px", xl: "20px" }}
        title="My Staking Pools"
        description={
          <span>Stake some tokens to earn more. High APR, low risk.</span>
        }
      >
        <Stack
          w="full"
          spacing="30px"
          alignItems="start"
          direction={{ base: "column" }}
        >
          <IWTable {...tableData} mode="STAKING_POOL" />
        </Stack>
      </SectionContainer>
      <MyNFTPools />
    </>
  );
}

const MyNFTPools = () => {
  const { currentAccount } = useSelector((s) => s.wallet);
  const [nftLPList, setNftLPList] = useState([]);
  const [tokenLPList, setTokenLPList] = useState([]);

  useEffect(() => {
    let isUnmounted = false;

    const fetchNftLPList = async () => {
      try {
        const { status, ret } = await APICall.getNftLPList();

        if (status === "OK") {
          const nftLPListAddNftInfo = await Promise.all(
            ret
              ?.filter((p) => p.owner === currentAccount?.address)
              .map(async (nftLP) => {
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

                let stakeInfo = queryResult?.toHuman().Ok;

                if (stakeInfo) {
                  stakeInfo = {
                    ...stakeInfo,
                    lastRewardUpdate: formatChainStringToNumber(
                      stakeInfo.lastRewardUpdate
                    ),
                    stakedValue: formatChainStringToNumber(
                      stakeInfo.stakedValue
                    ),
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
            ret
              ?.filter((p) => p.owner === currentAccount?.address)
              .map(async (tokenLP) => {
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

                let stakeInfo = queryResult?.toHuman().Ok;

                if (stakeInfo) {
                  stakeInfo = {
                    ...stakeInfo,
                    lastRewardUpdate: formatChainStringToNumber(
                      stakeInfo.lastRewardUpdate
                    ),
                    stakedValue: formatChainStringToNumber(
                      stakeInfo.stakedValue
                    ),
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
    ],

    tableBody: nftLPList,
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
    ],

    tableBody: tokenLPList,
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
      title="My Yield Farm Pools"
      description={<span>Stake NFT or Tokens to earn more</span>}
    >
      <Stack
        w="full"
        spacing="30px"
        alignItems="start"
        direction={{ base: "column" }}
      >
        <IWTabs tabsData={tabsData} />
      </Stack>
    </SectionContainer>
  );
};
