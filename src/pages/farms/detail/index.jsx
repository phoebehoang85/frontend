import { ChevronRightIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Circle,
  Flex,
  Heading,
  Hide,
  HStack,
  Image,
  Link,
  List,
  ListItem,
  Show,
  Square,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import SectionContainer from "components/container/SectionContainer";

import { useLocation } from "react-router-dom";
import IWCard from "components/card/Card";
import IWTabs from "components/tabs/IWTabs";
import ConfirmModal from "components/modal/ConfirmModal";
import IWCardOneColumn from "components/card/CardOneColumn";
import CardTwoColumn from "components/card/CardTwoColumn";
import CardThreeColumn from "components/card/CardThreeColumn";
import LogoPancake from "assets/img/denom/logo-pancake.png";
import IWCardNFTWrapper from "components/card/CardNFTWrapper";
import { TelegramIcon } from "components/icons/Icons";
import { DiscordIcon } from "components/icons/Icons";
import { TwitterIcon } from "components/icons/Icons";
import { formatDataCellTable } from "components/table/IWTable";
import { useSelector } from "react-redux";
import { useCallback, useState, useEffect } from "react";
import { execContractQuery } from "utils/contracts";
import nft_pool_contract from "utils/contracts/nft_pool";
import { formatChainStringToNumber } from "utils";
import psp22_contract from "utils/contracts/psp22_contract";
import { formatQueryResultToNumber } from "utils";
import { addressShortener } from "utils";
import { formatNumDynDecimal } from "utils";
import { calcUnclaimedRewardNftLP } from "utils";
import { toast } from "react-hot-toast";
import { toastMessages } from "constants";
import { execContractTx } from "utils/contracts";
import { delay } from "utils";
import { APICall } from "api/client";
import { formatNumToBN } from "utils";
import psp34_standard from "utils/contracts/psp34_standard";
import azt_contract from "utils/contracts/azt_contract";

export default function FarmDetailPage() {
  // const params = useParams();
  const { currentAccount } = useSelector((s) => s.wallet);

  const location = useLocation();

  const currMode = location?.state?.mode;

  const { state } = useLocation();

  const cardData = {
    cardHeaderList: [
      {
        name: "nftInfo",
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
        tooltipContent: "Lorem lorem",
        label: "TVL",
      },
      {
        name: "rewardPool",
        hasTooltip: true,
        tooltipContent: "Lorem lorem",
        label: "Reward Pool",
      },
      {
        name: "multiplier",
        hasTooltip: true,
        tooltipContent: "Lorem lorem",
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

  const tabsData = [
    {
      label: "My Stakes & Rewards",
      component: <MyStakeRewardInfo {...state} {...currentAccount} />,
      isDisabled: false,
    },
    {
      label: (
        <>
          Pool Info<Show above="md">rmation</Show>
        </>
      ),
      component: <PoolInfo {...state} />,
      isDisabled: false,
    },
  ];

  return (
    <>
      <Show above="md">
        <SectionContainer mt={{ xl: "-48px" }} mb={{ xl: "-32px" }}>
          <Breadcrumb
            spacing="4px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            <BreadcrumbItem color="text.1">
              <BreadcrumbLink href="#/pools">Yield Farm</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem color="text.2">
              <BreadcrumbLink href="#">NFT Yield Farm</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </SectionContainer>
      </Show>

      <SectionContainer
        mt={{ base: "0px", xl: "20px" }}
        title={`${
          currMode === "NFT_FARM"
            ? "NFT"
            : currMode === "TOKEN_FARM"
            ? "Token"
            : null
        } Yield Farm`}
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
              {cardData?.cardHeaderList?.map(
                ({ name, hasTooltip, label, tooltipContent }) => {
                  return name === "myStake" ? null : (
                    <Flex
                      mt={{ base: "15px", lg: "0px" }}
                      w={{ lg: "fit-content" }}
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
                        </Text>{" "}
                      </Flex>
                    </Flex>
                  );
                }
              )}
            </Flex>
          </IWCard>
        </Stack>
      </SectionContainer>

      <SectionContainer mt={{ base: "-28px", xl: "-48px" }}>
        <IWTabs tabsData={tabsData} />
      </SectionContainer>
    </>
  );
}

const MyStakeRewardInfo = ({
  mode,
  tokenSymbol,
  address,
  balance,
  apy,
  poolContract,
  tokenContract,
  rewardPool,
  nftInfo,
  tokenDecimal,
  multiplier,
  NFTtokenContract,
  ...rest
}) => {
  const { currentAccount } = useSelector((s) => s.wallet);

  const [unstakeFee, setUnstakeFee] = useState(0);

  const [stakeInfo, setStakeInfo] = useState(null);
  const [tokenBalance, setTokenBalance] = useState();
  const [availableNFT, setAvailableNFT] = useState([]);
  const [stakedNFT, setStakedNFT] = useState([]);

  const fetchUserStakeInfo = useCallback(async () => {
    if (!currentAccount?.balance) return;

    let queryResult = await execContractQuery(
      currentAccount?.address,
      "api",
      nft_pool_contract.CONTRACT_ABI,
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
  }, [currentAccount?.address, currentAccount?.balance, poolContract]);

  const fetchTokenBalance = useCallback(async () => {
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
  }, [currentAccount?.address, currentAccount?.balance, tokenContract]);

  useEffect(() => {
    fetchUserStakeInfo();
    fetchTokenBalance();
  }, [fetchTokenBalance, fetchUserStakeInfo]);

  const fetchAvailableNFT = useCallback(async () => {
    const { status, ret } =
      await APICall.getNFTsByOwnerAndCollectionFromArtZero({
        collection_address: nftInfo?.nftContractAddress,
        owner: currentAccount?.address,
      });

    if (status === "OK") {
      setAvailableNFT(ret);
    }
  }, [currentAccount?.address, nftInfo?.nftContractAddress]);

  const fetchStakedNFT = useCallback(async () => {
    let isUnmounted = false;

    if (stakeInfo) {
      const listData = await Promise.all(
        [...Array(stakeInfo?.stakedValue)].map(async (_, idx) => {
          if (!currentAccount?.balance) return;

          let queryResult = await execContractQuery(
            currentAccount?.address,
            "api",
            nft_pool_contract.CONTRACT_ABI,
            poolContract,
            0,
            "nftStakingListTrait::getStakedId",
            currentAccount?.address,
            idx
          );

          let stakedID = queryResult?.toHuman();

          const { status, ret } = await APICall.getNftByIdFromArtZero({
            collection_address: nftInfo?.nftContractAddress,
            token_id: parseInt(stakedID.U64),
          });

          if (status === "OK") {
            return ret[0];
          }
        })
      );
      if (isUnmounted) return;

      setStakedNFT(listData);
    }
    return () => (isUnmounted = true);
  }, [
    currentAccount?.address,
    currentAccount?.balance,
    nftInfo?.nftContractAddress,
    poolContract,
    stakeInfo,
  ]);

  useEffect(() => {
    fetchStakedNFT();
    fetchAvailableNFT();
  }, [fetchAvailableNFT, fetchStakedNFT]);

  useEffect(() => {
    const fetchFee = async () => {
      if (!currentAccount?.balance) return;

      const result = await execContractQuery(
        currentAccount?.address,
        "api",
        nft_pool_contract.CONTRACT_ABI,
        poolContract,
        0,
        "genericPoolContractTrait::unstakeFee"
      );

      const fee = formatQueryResultToNumber(result);
      setUnstakeFee(fee);
    };

    fetchFee();
  }, [currentAccount?.address, currentAccount?.balance, poolContract]);

  const tabsNFTData = [
    {
      label: "Available NFTs",
      component: (
        <AvailableNFTs
          action="Stake NFT"
          data={availableNFT}
          actionHandler={stakeNftHandler}
        />
      ),
      isDisabled: false,
    },
    {
      label: "Staked NFTs",
      component: (
        <StakedNFTs
          action="Unstake NFT"
          data={stakedNFT}
          actionHandler={unstakeNftHandler}
        />
      ),
      isDisabled: false,
    },
  ];

  async function handleClaimRewards() {
    if (!currentAccount) {
      toast.error(toastMessages.NO_WALLET);
      return;
    }

    await execContractTx(
      currentAccount,
      "api",
      nft_pool_contract.CONTRACT_ABI,
      poolContract,
      0, //-> value
      "claimReward"
    );

    await delay(2000).then(() => {
      fetchUserStakeInfo();
      fetchTokenBalance();
    });
  }

  async function stakeNftHandler(tokenID) {
    if (!currentAccount) {
      toast.error(toastMessages.NO_WALLET);
      return;
    }

    if (!rewardPool || parseInt(rewardPool) < 0) {
      toast.error("There is no reward balance in this pool!");
      return;
    }

    //Approve
    toast.success("Step 1: Approving...");
    console.log("nftInfo?.nftContractAddress", nftInfo?.nftContractAddress);
    let approve = await execContractTx(
      currentAccount,
      "api",
      psp34_standard.CONTRACT_ABI,
      NFTtokenContract,
      0, //-> value
      "psp34::approve",
      poolContract,
      { u64: tokenID },
      true
    );
    if (!approve) return;

    await delay(3000);

    toast.success("Step 2: Process staking...");

    await execContractTx(
      currentAccount,
      "api",
      nft_pool_contract.CONTRACT_ABI,
      poolContract,
      0, //-> value
      "stake",
      { u64: tokenID }
    );
    console.log("poolContract", NFTtokenContract);
    console.log(
      "poolContract ?/ 5FTFSCemxZejGd3JmTKyuS5vGHgHcB6eiAA3vfLy9rRXZ4ep"
    );
    await APICall.askBEupdate({ type: "nft", poolContract });
    await APICall.askBEupdateNFTFromArtZero({
      token_id: tokenID,
      collection_address: NFTtokenContract,
    });

    toast.success("Please wait up to 10s for the data to be updated");

    await delay(5000).then(() => {
      fetchUserStakeInfo();
      fetchTokenBalance();
    });
  }

  async function unstakeNftHandler(tokenID) {
    if (!currentAccount) {
      toast.error(toastMessages.NO_WALLET);
      return;
    }

    if (parseInt(currentAccount?.balance?.wal) < unstakeFee) {
      toast.error(`You don't have enough WAL. Unstake costs ${unstakeFee} WAL`);
      return;
    }

    //Approve
    toast.success("Step 1: Approving...");

    let approve = await execContractTx(
      currentAccount,
      "api",
      psp22_contract.CONTRACT_ABI,
      azt_contract.CONTRACT_ADDRESS,
      0, //-> value
      "psp22::approve",
      poolContract,
      formatNumToBN(unstakeFee)
    );

    if (!approve) return;

    await delay(3000);

    toast.success("Step 2: Process unstaking...");

    await execContractTx(
      currentAccount,
      "api",
      nft_pool_contract.CONTRACT_ABI,
      poolContract,
      0, //-> value
      "unstake",
      { u64: tokenID }
    );

    await APICall.askBEupdate({ type: "nft", poolContract });
    await APICall.askBEupdateNFTFromArtZero({
      token_id: tokenID,
      collection_address: NFTtokenContract,
    });

    toast.success("Please wait up to 10s for the data to be updated");

    await delay(5000).then(() => {
      fetchUserStakeInfo();
      fetchTokenBalance();
    });
  }

  return (
    <>
      <Stack
        w="full"
        spacing="30px"
        alignItems="start"
        direction={{ base: "column", lg: "row" }}
      >
        <IWCardOneColumn
          minW={{ base: "full", md: "280px", xl: "370px" }}
          w={{ base: "full", lg: "30%" }}
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
        <CardThreeColumn
          title="Staking Information"
          data={[
            {
              title: `My Stakes (${nftInfo?.name})`,
              content: `${formatNumDynDecimal(stakeInfo?.stakedValue)}`,
            },
            {
              title: "Last Claim",
              content: `${
                !currentAccount
                  ? "No account selected"
                  : !stakeInfo?.lastRewardUpdate
                  ? "Not claimed yet"
                  : new Date(stakeInfo?.lastRewardUpdate).toLocaleString(
                      "en-US"
                    )
              }`,
            },
            {
              title: "My Unclaimed Rewards (FOD)",
              content: `${calcUnclaimedRewardNftLP({
                ...stakeInfo,
                multiplier,
                tokenDecimal,
              })}`,
            },
          ]}
        >
          <ConfirmModal
            action="claim"
            buttonVariant="outline"
            buttonLabel="Claim Rewards"
            onClick={handleClaimRewards}
            message="Claim Rewards costs 10 WAL. Continue?"
          />
        </CardThreeColumn>
      </Stack>
      {mode === "NFT_FARM" ? (
        <SectionContainer
          px="0px"
          // mt={{ base: "-38px", xl: "-48px" }}
        >
          <IWTabs tabsData={tabsNFTData} />
        </SectionContainer>
      ) : null}
    </>
  );
};

const PoolInfo = ({ mode }) => (
  <>
    {mode === "NFT_MODE" ? (
      <IWCard
        mb={{ base: "24px", lg: "30px" }}
        pt={{ lg: "10px" }}
        pb={{ lg: "24px" }}
      >
        <Flex flexDirection={{ base: "column", md: "row" }}>
          <Square
            mr={{ lg: "24px" }}
            maxW={{ base: "300px", sm: "320px", lg: "160" }}
            maxH={{ base: "300px", sm: "320px", lg: "160" }}
            borderRadius="10px"
            overflow="hidden"
          >
            <Image
              w="full"
              h="full"
              src="https://imagedelivery.net/Iw4Pp5uTB3HCaJ462QFK1Q/PMP/nfts/82/500"
              alt="nft-image"
            />
          </Square>

          <Stack w="full" alignItems="start">
            <HStack alignItems="center" justifyContent="space-between" w="full">
              <Heading as="h2" size="h2" lineHeight="38px">
                Praying Mantis Predators
              </Heading>

              <Show above="md">
                <List display="flex">
                  <ListItem
                    me={{
                      base: "20px",
                      md: "24px",
                    }}
                  >
                    <Link
                      isExternal
                      fontWeight="400"
                      color={"gray.400"}
                      href="https://t.me/inkwhale"
                    >
                      <Box w="16px" h="24px">
                        <TelegramIcon />
                      </Box>
                    </Link>
                  </ListItem>
                  <ListItem
                    me={{
                      base: "20px",
                      md: "24px",
                    }}
                  >
                    <Link
                      isExternal
                      fontWeight="400"
                      color={"gray.400"}
                      href="https://discord.com/"
                    >
                      <Box w="16px" h="24px">
                        <DiscordIcon />
                      </Box>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      isExternal
                      fontWeight="400"
                      color={"gray.400"}
                      href="https://twitter.com/inkwhale_net"
                    >
                      <Box w="16px" h="24px">
                        <TwitterIcon />
                      </Box>
                    </Link>
                  </ListItem>
                </List>
              </Show>
            </HStack>

            <HStack justifyContent={{ base: "start" }} w="full">
              <Heading as="h4" size="h4" fontWeight="600" lineHeight="25px">
                5Dth...34hiX
              </Heading>
              <Text>copy</Text>
            </HStack>

            <Hide above="md">
              <List display="flex">
                <ListItem
                  me={{
                    base: "20px",
                    md: "24px",
                  }}
                >
                  <Link
                    isExternal
                    fontWeight="400"
                    color={"gray.400"}
                    href="https://t.me/inkwhale"
                  >
                    <Box w="16px" h="24px">
                      <TelegramIcon />
                    </Box>
                  </Link>
                </ListItem>
                <ListItem
                  me={{
                    base: "20px",
                    md: "24px",
                  }}
                >
                  <Link
                    isExternal
                    fontWeight="400"
                    color={"gray.400"}
                    href="https://discord.com/"
                  >
                    <Box w="16px" h="24px">
                      <DiscordIcon />
                    </Box>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    isExternal
                    fontWeight="400"
                    color={"gray.400"}
                    href="https://twitter.com/inkwhale_net"
                  >
                    <Box w="16px" h="24px">
                      <TwitterIcon />
                    </Box>
                  </Link>
                </ListItem>
              </List>
            </Hide>

            <HStack
              justifyContent="space-between"
              w="full"
              pb={{ base: "24px", lg: "0px" }}
            >
              <Flex
                w="full"
                minH="70px"
                flexDirection={{ base: "column", lg: "row" }}
                justifyContent={{ base: "space-between" }}
              >
                {cardDataPoolInfo?.cardHeaderList?.map(
                  ({ name, hasTooltip, label, tooltipContent }) => {
                    return name === "myStake" ? null : (
                      <Flex
                        mt={{ base: "15px", lg: "0px" }}
                        w={{ lg: "fit-content" }}
                        key={name}
                        justifyContent="center"
                        flexDirection={{ base: "column", lg: "column" }}
                      >
                        <Flex
                          w={{ base: "full" }}
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
                          w={{ base: "full" }}
                          color="text.1"
                          fontWeight="600"
                          fontSize={{ base: "16px", lg: "20px" }}
                          lineHeight="28px"
                          justify={{ base: "start" }}
                          alignItems={{ base: "center" }}
                        >
                          {name === "poolNameToken" && (
                            <Circle w="30px" h="30px" bg="white" mr="8px">
                              <Image
                                src={cardDataPoolInfo?.cardValue?.poolLogo}
                                alt="logo-subwallet"
                              />
                            </Circle>
                          )}
                          <Text>{cardDataPoolInfo?.cardValue[name]}</Text>{" "}
                        </Flex>
                      </Flex>
                    );
                  }
                )}
              </Flex>
            </HStack>
          </Stack>
        </Flex>
      </IWCard>
    ) : null}

    <Stack
      w="full"
      spacing="30px"
      alignItems="start"
      direction={{ base: "column", lg: "row" }}
    >
      <CardTwoColumn
        title="General Information"
        data={[
          { title: "Pool Contract Address", content: "5Dth...34hiX" },
          { title: "Multiplier", content: "8" },
          { title: "Start Date", content: "12/12/2022 11:23:47" },
          { title: "Pool Length", content: "90 days" },
          { title: "Reward Pool", content: "10,036,000.000" },
          {
            title: "Total Value Locked",
            content: "1,711,778.500 WAL",
          },
        ]}
      />
      <Stack w="full" spacing="30px">
        {mode === "TOKEN_FARM" ? (
          <CardTwoColumn
            title="Staking Token Information"
            data={[
              { title: "Total Name", content: "Ink Whale Token" },
              { title: "Contract Address", content: "5Dth...34hiX" },
              { title: "Total Supply", content: "10,036.000" },
              { title: "Token Symbol", content: "WAL" },
            ]}
          />
        ) : null}

        <CardTwoColumn
          title="Reward Token Information"
          data={[
            { title: "Total Name", content: "Ink Whale Token" },
            { title: "Contract Address", content: "5Dth...34hiX" },
            { title: "Total Supply", content: "10,036.000" },
            { title: "Token Symbol", content: "WAL" },
          ]}
        />
      </Stack>
    </Stack>
  </>
);

const AvailableNFTs = (props) => (
  // { data, action, actionHandler }
  <>
    <Stack
      w="full"
      spacing="30px"
      alignItems="start"
      direction={{ base: "column", lg: "row" }}
    >
      <IWCardNFTWrapper {...props} />
    </Stack>
  </>
);

const StakedNFTs = (props) => (
  <Stack
    w="full"
    spacing="30px"
    alignItems="start"
    direction={{ base: "column", lg: "row" }}
  >
    <IWCardNFTWrapper {...props} />
  </Stack>
);

const cardDataPoolInfo = {
  cardHeaderList: [
    {
      name: "collectionLink",
      hasTooltip: false,
      tooltipContent: "",
      label: "Collection Link",
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
      tooltipContent: "Lorem lorem",
      label: "Royalty Fee",
    },
    {
      name: "volume",
      hasTooltip: false,
      tooltipContent: "Lorem lorem",
      label: "Volume",
    },
  ],

  cardValue: {
    collectionLink: "Praying Mantis Predators",
    poolLogo: LogoPancake,
    contractAddress: "5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
    volume: "298,093.215",
    totalSupply: "1.111",
    royaltyFee: "1%",
  },
};
