import { ChevronRightIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
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
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import SectionContainer from "components/container/SectionContainer";
import IWInput from "components/input/Input";

import IWCard from "components/card/Card";
import ConfirmModal from "components/modal/ConfirmModal";
import IWCardOneColumn from "components/card/CardOneColumn";
import CardThreeColumn from "components/card/CardThreeColumn";
import CardTwoColumn from "components/card/CardTwoColumn";
import { useLocation } from "react-router-dom";
import { formatDataCellTable } from "components/table/IWTable";
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
        <Stack
          w="full"
          spacing="30px"
          alignItems="start"
          direction={{ base: "column" }}
        >
          <IWCard
            mt="16px"
            w="full"
            variant="solid"
            border="1px solid #E3DFF3"
            bg="bg.1"
          >
            <Flex
              minH="70px"
              flexDirection={{ base: "column", lg: "row" }}
              justifyContent={{ base: "space-between" }}
            >
              {cardData?.cardHeaderList?.map((item) => {
                const { name, hasTooltip, label, tooltipContent } = item;

                return (
                  <Flex
                    mt={{ base: "15px", lg: "0px" }}
                    w="full"
                    key={name}
                    justifyContent="center"
                    flexDirection={{ base: "row", lg: "column" }}
                  >
                    <Flex
                      w={{ base: "45%", lg: "full" }}
                      color="text.2"
                      fontWeight="400"
                      fontSize="16px"
                      lineHeight="28px"
                      alignItems="center"
                    >
                      {label}
                      {hasTooltip && (
                        <Tooltip fontSize="md" label={tooltipContent}>
                          <QuestionOutlineIcon ml="6px" color="text.2" />
                        </Tooltip>
                      )}
                    </Flex>

                    <Flex
                      color="text.1"
                      fontWeight="600"
                      lineHeight="28px"
                      justify={{ base: "start" }}
                      alignItems={{ base: "center" }}
                      w={{ base: "55%", lg: "full" }}
                      fontSize={{ base: "16px", lg: "20px" }}
                    >
                      <Text>
                        {formatDataCellTable(cardData?.cardValue, name)}
                      </Text>
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>
          </IWCard>
        </Stack>
      </SectionContainer>

      <SectionContainer mt={{ base: "-28px", xl: "-48px" }}>
        <MyStakeStakingPoolInfo {...state} {...currentAccount} />
      </SectionContainer>
    </>
  );
}

const MyStakeStakingPoolInfo = ({
  variant = "my-staking-pool",
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
  ...rest
}) => {
  const { currentAccount, api } = useSelector((s) => s.wallet);

  const [unstakeFee, setUnstakeFee] = useState(0);
  const [stakeInfo, setStakeInfo] = useState(null);
  const [tokenBalance, setTokenBalance] = useState();

  const [amount, setAmount] = useState(0);

  const fetchUserStakeInfo = useCallback(async () => {
    if (!currentAccount?.balance) return;

    let queryResult = await execContractQuery(
      currentAccount?.address,
      api,
      pool_contract.CONTRACT_ABI,
      poolContract,
      0,
      "genericPoolContractTrait::getStakeInfo",
      currentAccount?.address
    );

    let info = queryResult?.toHuman();

    if (info) {
      info = {
        ...info,
        lastRewardUpdate: formatChainStringToNumber(info.lastRewardUpdate),
        stakedValue: formatChainStringToNumber(info.stakedValue),
        unclaimedReward: formatChainStringToNumber(info.unclaimedReward),
      };
    }

    setStakeInfo(info);
  }, [api, currentAccount?.address, currentAccount?.balance, poolContract]);

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
    fetchUserStakeInfo();
    fetchTokenBalance();
  }, [
    api,
    currentAccount?.address,
    currentAccount?.balance,
    fetchTokenBalance,
    fetchUserStakeInfo,
    poolContract,
  ]);

  useEffect(() => {
    const fetchFee = async () => {
      if (!currentAccount?.balance) return;

      const result = await execContractQuery(
        currentAccount?.address,
        api,
        pool_contract.CONTRACT_ABI,
        poolContract,
        0,
        "genericPoolContractTrait::unstakeFee"
      );

      const fee = formatQueryResultToNumber(result);
      setUnstakeFee(fee);
    };

    fetchFee();
  }, [api, currentAccount?.address, currentAccount?.balance, poolContract]);

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
      fetchUserStakeInfo();
      fetchTokenBalance();
      setAmount(0);
    });
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
      fetchUserStakeInfo();
      fetchTokenBalance();
      setAmount(0);
    });
  }

  return (
    <Stack
      w="full"
      spacing="30px"
      alignItems="start"
      direction={{ base: "column", lg: "row" }}
    >
      <IWCardOneColumn
        title="My Account"
        data={[
          {
            title: "Account Address",
            content: address
              ? addressShortener(address)
              : "No account selected",
          },
          {
            title: "Account Balance",
            content: `${balance?.azero || 0} AZERO`,
          },
          {
            title: `${tokenSymbol} Balance`,
            content: `${tokenBalance || 0} ${tokenSymbol}`,
          },
        ]}
      />

      <VStack flexDirection="column" spacing="30px">
        <CardThreeColumn
          title="General Information"
          data={[
            {
              title: "Pool Contract Address",
              content: addressShortener(poolContract),
            },
            { title: "APR", content: `${apy / 100}%` },
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
              content: `${formatNumDynDecimal(totalStaked)} ${tokenSymbol}`,
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
                placeholder="Enter amount to stake or unstake"
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
        </CardThreeColumn>

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
      </VStack>
    </Stack>
  );
};
