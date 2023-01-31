import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  HStack,
  Show,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import SectionContainer from "components/container/SectionContainer";
import IWInput from "components/input/Input";

import IWCard from "components/card/Card";
import ConfirmModal from "components/modal/ConfirmModal";
import IWCardOneColumn from "components/card/CardOneColumn";
import CardThreeColumn from "components/card/CardThreeColumn";
import CardTwoColumn from "components/card/CardTwoColumn";
import { Link, useLocation } from "react-router-dom";
import { addressShortener } from "utils";
import { formatNumDynDecimal } from "utils";
import { useSelector } from "react-redux";
import { useState } from "react";
import psp22_contract from "utils/contracts/psp22_contract";
import { formatQueryResultToNumber } from "utils";
import { execContractQuery } from "utils/contracts";
import { useEffect } from "react";
import { execContractTx } from "utils/contracts";
import pool_contract from "utils/contracts/pool_contract";
import { delay } from "utils";
import { formatNumToBN } from "utils";
import { toast } from "react-hot-toast";
import { formatChainStringToNumber } from "utils";
import { useCallback } from "react";
import { toastMessages } from "constants";
import { APICall } from "api/client";
import { BannerCard } from "components/card/Card";
import { NFTBannerCard } from "components/card/Card";
import nft_pool_contract from "utils/contracts/nft_pool_contract";
import { useMemo } from "react";
import lp_pool_contract from "utils/contracts/lp_pool_contract";

export default function MyPoolDetailPage({ api }) {
  const { currentAccount } = useSelector((s) => s.wallet);

  const { state } = useLocation();

  const cardData = {
    cardHeaderList: [
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

    cardValue: {
      ...state,
    },
  };

  const lpPoolCardData = {
    cardHeaderList: [
      {
        name: state?.mode === "NFT_FARM" ? "nftInfo" : "lptokenName",
        hasTooltip: false,
        tooltipContent: "",
        label: "Stake",
      },
      {
        name: "tokenName",
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
        tooltipContent: `Multiplier determines how many reward tokens will the staker receive per 1 NFT in 24 hours.`,
        label: "Multiplier",
      },
      {
        name: "startTime",
        hasTooltip: false,
        tooltipContent: "",
        label: "Expired In",
      },
    ],

    cardValue: {
      ...state,
    },
  };

  const nftCardData = {
    cardHeaderList: [
      {
        name: "collectionLink",
        hasTooltip: false,
        tooltipContent: "",
        label: "ArtZero Collection Link",
      },
      {
        name: "totalSupply",
        hasTooltip: false,
        tooltipContent: "",
        label: "NFT Supply",
      },
      {
        name: "royaltyFee",
        hasTooltip: false,
        tooltipContent: "",
        label: "Royalty Fee",
      },
      {
        name: "volume",
        hasTooltip: false,
        tooltipContent: "",
        label: "Volume",
      },
    ],

    cardValue: {
      collectionLink: (
        <Link
          isExternal
          href={`https://artzero.io/demotestnet/#/collection/${state?.nftInfo?.nftContractAddress}`}
        >
          {state?.nftInfo?.name}
        </Link>
      ),
      volume: `${state?.nftInfo?.volume} AZERO`,
      totalSupply: `${state?.nftInfo?.nft_count} NFT${
        state?.nftInfo?.nft_count > 1 && "s"
      }`,
      royaltyFee: `${(state?.nftInfo?.royaltyFee / 100).toFixed(2)}%`,
    },
  };
  return (
    <>
      <Show above="md">
        <SectionContainer mt={{ xl: "-48px" }} mb={{ xl: "-32px" }}>
          <Breadcrumb
            spacing="4px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            <BreadcrumbItem color="text.1">
              <BreadcrumbLink href="#/my-pools">
                My Staking Pools
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem color="text.2">
              <BreadcrumbLink>Detail</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </SectionContainer>
      </Show>

      <SectionContainer
        mt={{ base: "0px", xl: "20px" }}
        title="Staking Pool Detail"
      >
        {state?.mode === "STAKING_POOL" ? (
          <BannerCard cardData={cardData} mode={state?.mode} />
        ) : (
          <BannerCard cardData={lpPoolCardData} mode={state?.mode} />
        )}
      </SectionContainer>

      <SectionContainer mt={{ base: "-28px", xl: "-48px" }}>
        {state?.mode === "NFT_FARM" ? (
          <NFTBannerCard cardData={nftCardData} nftInfo={state?.nftInfo} />
        ) : null}
      </SectionContainer>

      <SectionContainer mt={{ base: "-28px", xl: "-48px" }}>
        <MyStakeStakingPoolInfo {...state} {...currentAccount} />
      </SectionContainer>
    </>
  );
}

const MyStakeStakingPoolInfo = ({
  tokenSymbol,
  address,
  balance,
  apy,
  poolContract,
  tokenContract,
  startTime,
  duration,
  totalStaked,
  rewardPool,
  tokenName,
  tokenTotalSupply,
  mode,
  multiplier,
  nftInfo,
  lptokenContract,
  lptokenSymbol,
  lptokenName,
  lptokenTotalSupply,
  ...rest
}) => {
  const { currentAccount, api } = useSelector((s) => s.wallet);

  const [tokenBalance, setTokenBalance] = useState();

  const [amount, setAmount] = useState("");

  const fetchTokenBalance = useCallback(async () => {
    if (!currentAccount?.balance) return;

    const result = await execContractQuery(
      currentAccount?.address,
      api,
      psp22_contract.CONTRACT_ABI,
      tokenContract,
      0,
      "psp22::balanceOf",
      currentAccount?.address
    );

    const balance = formatQueryResultToNumber(result);
    setTokenBalance(balance);
  }, [api, currentAccount?.address, currentAccount?.balance, tokenContract]);

  useEffect(() => {
    // fetchUserStakeInfo();
    fetchTokenBalance();
  }, [
    api,
    currentAccount?.address,
    currentAccount?.balance,
    fetchTokenBalance,
    poolContract,
  ]);

  const [LPtokenBalance, setLPTokenBalance] = useState();

  const fetchLPTokenBalance = useCallback(async () => {
    if (!currentAccount?.balance) return;

    const result = await execContractQuery(
      currentAccount?.address,
      "api",
      psp22_contract.CONTRACT_ABI,
      tokenContract,
      0,
      "psp22::balanceOf",
      currentAccount?.address
    );

    const balance = formatQueryResultToNumber(result);
    setTokenBalance(balance);
    const resultLP = await execContractQuery(
      currentAccount?.address,
      "api",
      psp22_contract.CONTRACT_ABI,
      lptokenContract,
      0,
      "psp22::balanceOf",
      currentAccount?.address
    );

    const balanceLP = formatQueryResultToNumber(resultLP);
    setLPTokenBalance(balanceLP);
  }, [
    currentAccount?.address,
    currentAccount?.balance,
    lptokenContract,
    tokenContract,
  ]);

  useEffect(() => {
    fetchLPTokenBalance();
  }, [fetchLPTokenBalance]);

  const cardData = useMemo(() => {
    let ret = [
      {
        title: "Account Address",
        content: address ? addressShortener(address) : "No account selected",
      },
      {
        title: "AZERO Balance",
        content: `${balance?.azero || 0} AZERO`,
      },
      {
        title: "INW Balance",
        content: `${balance?.inw || 0} INW`,
      },
      {
        title: `${tokenSymbol} Balance`,
        content: `${tokenBalance || 0} ${tokenSymbol}`,
      },
    ];

    if (mode === "TOKEN_FARM") {
      ret.push({
        title: `${lptokenSymbol} Balance`,
        content: `${LPtokenBalance || 0} ${lptokenSymbol}`,
      });
    }
    return ret;
  }, [
    LPtokenBalance,
    address,
    balance?.azero,
    balance?.inw,
    lptokenSymbol,
    mode,
    tokenBalance,
    tokenSymbol,
  ]);

  async function handleAddRewards() {
    if (!currentAccount) {
      toast.error(toastMessages.NO_WALLET);
      return;
    }

    if (!amount) {
      toast.error("Invalid Amount!");
      return;
    }

    if (formatChainStringToNumber(tokenBalance) < amount) {
      toast.error("Not enough tokens!");
      return;
    }

    if (mode === "STAKING_POOL") {
      //Approve
      toast.success("Step 1: Approving...");

      let approve = await execContractTx(
        currentAccount,
        api,
        psp22_contract.CONTRACT_ABI,
        tokenContract,
        0, //-> value
        "psp22::approve",
        poolContract,
        formatNumToBN(amount)
      );
      if (!approve) return;

      await delay(3000);

      toast.success("Step 2: Process...");

      await execContractTx(
        currentAccount,
        api,
        pool_contract.CONTRACT_ABI,
        poolContract,
        0, //-> value
        "genericPoolContractTrait::topupRewardPool",
        formatNumToBN(amount)
      );

      // TODO: x2 check ask BE update is needed?
      await APICall.askBEupdate({ type: "pool", poolContract });

      await delay(2000).then(() => {
        // fetchUserStakeInfo();
        fetchTokenBalance();
        setAmount(0);
      });
    }

    if (mode === "NFT_FARM") {
      //Approve
      toast.success("Step 1: Approving...");

      let approve = await execContractTx(
        currentAccount,
        api,
        psp22_contract.CONTRACT_ABI,
        tokenContract,
        0, //-> value
        "psp22::approve",
        poolContract,
        formatNumToBN(amount)
      );
      if (!approve) return;

      await delay(3000);

      toast.success("Step 2: Process...");

      await execContractTx(
        currentAccount,
        api,
        nft_pool_contract.CONTRACT_ABI,
        poolContract,
        0, //-> value
        "genericPoolContractTrait::topupRewardPool",
        formatNumToBN(amount)
      );

      // TODO: x2 check ask BE update is needed?
      await APICall.askBEupdate({ type: "pool", poolContract });

      await delay(2000).then(() => {
        // fetchUserStakeInfo();
        fetchTokenBalance();
        setAmount(0);
      });
    }

    if (mode === "TOKEN_FARM") {
      //Approve
      toast.success("Step 1: Approving...");

      let approve = await execContractTx(
        currentAccount,
        api,
        psp22_contract.CONTRACT_ABI,
        tokenContract,
        0, //-> value
        "psp22::approve",
        poolContract,
        formatNumToBN(amount)
      );
      if (!approve) return;

      await delay(3000);

      toast.success("Step 2: Process...");

      await execContractTx(
        currentAccount,
        api,
        lp_pool_contract.CONTRACT_ABI,
        poolContract,
        0, //-> value
        "genericPoolContractTrait::topupRewardPool",
        formatNumToBN(amount)
      );

      // TODO: x2 check ask BE update is needed?
      await APICall.askBEupdate({ type: "pool", poolContract });

      await delay(2000).then(() => {
        // fetchUserStakeInfo();
        fetchTokenBalance();
        setAmount(0);
      });
    }
  }

  async function handleRemoveRewards() {
    if (!currentAccount) {
      toast.error(toastMessages.NO_WALLET);
      return;
    }

    if (!amount) {
      toast.error("Invalid Amount!");
      return;
    }

    let currentTime = new Date().getTime();

    if (currentTime < parseInt(startTime) + duration * 1000) {
      toast.error("You have to wait until pool ends to withdraw!");
      return;
    }

    if (rewardPool < amount) {
      toast.error("Not enough reward tokens!");
      return;
    }

    if (mode === "STAKING_POOL") {
      toast.success("Process...");

      await execContractTx(
        currentAccount,
        api,
        pool_contract.CONTRACT_ABI,
        poolContract,
        0, //-> value
        "genericPoolContractTrait::withdrawRewardPool",
        formatNumToBN(amount)
      );

      // TODO: x2 check ask BE update is needed?
      await APICall.askBEupdate({ type: "pool", poolContract });

      await delay(2000).then(() => {
        // fetchUserStakeInfo();
        fetchTokenBalance();
        setAmount(0);
      });
    }

    if (mode === "NFT_FARM") {
      toast.success("Process...");

      await execContractTx(
        currentAccount,
        api,
        nft_pool_contract.CONTRACT_ABI,
        poolContract,
        0, //-> value
        "genericPoolContractTrait::withdrawRewardPool",
        formatNumToBN(amount)
      );

      // TODO: x2 check ask BE update is needed?
      await APICall.askBEupdate({ type: "pool", poolContract });

      await delay(2000).then(() => {
        // fetchUserStakeInfo();
        fetchTokenBalance();
        setAmount(0);
      });
    }

    if (mode === "TOKEN_FARM") {
      toast.success("Process...");

      await execContractTx(
        currentAccount,
        api,
        lp_pool_contract.CONTRACT_ABI,
        poolContract,
        0, //-> value
        "genericPoolContractTrait::withdrawRewardPool",
        formatNumToBN(amount)
      );

      // TODO: x2 check ask BE update is needed?
      await APICall.askBEupdate({ type: "pool", poolContract });

      await delay(2000).then(() => {
        // fetchUserStakeInfo();
        fetchTokenBalance();
        setAmount(0);
      });
    }
  }
  return (
    <>
      <Stack
        w="full"
        spacing="30px"
        alignItems="start"
        direction={{ base: "column", lg: "row" }}
      >
        <IWCardOneColumn title="My Account" data={cardData} />

        <VStack flexDirection="column" spacing="30px">
          <CardThreeColumn
            title="General Information"
            data={[
              {
                title: "Pool Contract Address",
                content: addressShortener(poolContract),
              },
              {
                title: mode === "STAKING_POOL" ? "APR" : "Multiplier",
                content:
                  mode === "STAKING_POOL"
                    ? `${apy / 100}%`
                    : mode === "NFT_FARM"
                    ? `${(multiplier / 10 ** 12).toFixed(2)}`
                    : mode === "TOKEN_FARM"
                    ? `${(multiplier / 10 ** 18).toFixed(2)}`
                    : `${apy / 100}%`,
              },
              {
                title: "Start Date",
                content: `${new Date(startTime).toLocaleString("en-US")}`,
              },
              {
                title: "Pool Length (days)",
                content: `${duration / 86400}`,
              },
              {
                title: "Reward Pool",
                content: `${formatNumDynDecimal(rewardPool)} ${tokenSymbol}`,
              },
              {
                title: "Total Value Locked",
                content: `${formatNumDynDecimal(totalStaked)} ${
                  mode === "NFT_FARM"
                    ? `NFT`
                    : mode === "TOKEN_FARM"
                    ? lptokenSymbol
                    : tokenSymbol
                }`,
              },
            ]}
          >
            <IWCard mt="24px" w="full" variant="solid">
              <Flex
                w="100%"
                spacing="20px"
                flexDirection={{ base: "column", lg: "row" }}
                alignItems={{ base: "center", lg: "center" }}
              >
                <IWInput
                  value={amount}
                  onChange={({ target }) => setAmount(target.value)}
                  type="number"
                  placeholder="Enter amount to add or remove"
                  inputRightElementIcon={
                    <Heading as="h5" size="h5">
                      {tokenSymbol}
                    </Heading>
                  }
                />

                <HStack
                  ml={{ base: "0", lg: "20px" }}
                  mt={{ base: "10px", lg: "0px" }}
                  maxW={{ base: "full", lg: "50%" }}
                  w="full"
                  spacing="10px"
                  justifyContent="space-between"
                >
                  <ConfirmModal
                    action="stake"
                    buttonVariant="primary"
                    buttonLabel="Add Rewards"
                    onClick={handleAddRewards}
                    message={`Add to reward pool ${amount} ${tokenSymbol}. Continue?`}
                  />

                  <ConfirmModal
                    action="unstake"
                    buttonVariant="primary"
                    buttonLabel="Remove Rewards"
                    onClick={handleRemoveRewards}
                    message={`Remove from reward pool ${amount} ${tokenSymbol}. Continue?`}
                  />
                </HStack>
              </Flex>
            </IWCard>

            <Text
              mt="10px"
              textAlign="left"
              w="full"
              fontSize="md"
              lineHeight="28px"
            >
              Note: You will be able to withdraw undistributed rewards after
              Pool is expired on{" "}
              <Text as="span" color="black">
                {new Date(startTime + duration * 1000).toLocaleString("en-US")}
              </Text>
            </Text>
          </CardThreeColumn>

          {mode === "TOKEN_FARM" ? (
            <>
              {" "}
              <CardTwoColumn
                title="Staking Token Information"
                data={[
                  { title: "Token Name", content: lptokenName },
                  {
                    title: "Contract Address",
                    content: addressShortener(lptokenContract),
                  },
                  {
                    title: "Total Supply",
                    content: `${formatNumDynDecimal(
                      lptokenTotalSupply,
                      0
                    )} ${lptokenSymbol}`,
                  },
                  { title: "Token Symbol", content: lptokenSymbol },
                ]}
              />
              <CardTwoColumn
                title="Reward Token Information"
                data={[
                  { title: "Token Name", content: tokenName },
                  {
                    title: "Contract Address",
                    content: addressShortener(tokenContract),
                  },
                  {
                    title: "Total Supply",
                    content: `${formatNumDynDecimal(
                      tokenTotalSupply,
                      0
                    )} ${tokenSymbol}`,
                  },
                  { title: "Token Symbol", content: tokenSymbol },
                ]}
              />
            </>
          ) : (
            <CardTwoColumn
              title="Staking Information"
              data={[
                { title: "Token Name", content: tokenName },
                {
                  title: "Contract Address",
                  content: addressShortener(tokenContract),
                },
                {
                  title: "Total Supply",
                  content: `${formatNumDynDecimal(
                    tokenTotalSupply,
                    0
                  )} ${tokenSymbol}`,
                },
                { title: "Token Symbol", content: tokenSymbol },
              ]}
            />
          )}
        </VStack>
      </Stack>
    </>
  );
};
