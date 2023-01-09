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
  VStack,
} from "@chakra-ui/react";
import SectionContainer from "components/container/SectionContainer";

import { useHistory, useLocation, useParams } from "react-router-dom";
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

export default function FarmDetailPage() {
  const params = useParams();
  const location = useLocation();
  console.log("params", params);
  console.log("location", location?.state?.mode);

  const currMode = location?.state?.mode;

  const tabsData = [
    {
      label: "My Stakes & Rewards",
      component: <MyStakeRewardInfo mode={currMode} />,
      isDisabled: false,
    },
    {
      label: (
        <>
          Pool Info<Show above="md">rmation</Show>
        </>
      ),
      component: <PoolInfo mode={currMode} />,
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
                        w={{ base: "55%", lg: "full" }}
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
                              src={cardData?.cardValue?.poolLogo}
                              alt="logo-subwallet"
                            />
                          </Circle>
                        )}
                        <Text>{cardData?.cardValue[name]}</Text>{" "}
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

const MyStakeRewardInfo = ({ mode }) => {
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
            { title: "Account Address", content: "5Dth...34hiX" },
            { title: "Account Balance", content: "10,036,000.000" },
            { title: "azUSD Balance", content: "10,036.000" },
          ]}
        />
        <CardThreeColumn
          title="Staking Information"
          data={[
            { title: "My Stakes (FOD)", content: "1.000" },
            { title: "Last Claim", content: "27/12/2022" },
            {
              title: "My Unclaimed Rewards (FOD)",
              content: "0.0000005571521",
            },
          ]}
        >
          <ConfirmModal
            action="claim"
            buttonVariant="outline"
            buttonLabel="Claim Rewards"
            onClick={() => alert("Do Claim Rewards")}
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

const cardData = {
  cardHeaderList: [
    {
      name: "stake",
      hasTooltip: false,
      tooltipContent: "",
      label: "Stake",
    },
    {
      name: "earn",
      hasTooltip: false,
      tooltipContent: "",
      label: "Earn",
    },
    {
      name: "tvl",
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
      name: "expiredIn",
      hasTooltip: false,
      tooltipContent: "",
      label: "Expired In",
    },
    {
      name: "myStake",
      hasTooltip: false,
      tooltipContent: "",
      label: "My Stake",
    },
  ],

  cardValue: {
    stake: "Praying Mantis Predators",
    poolLogo: LogoPancake,
    contractAddress: "5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
    redirectUrl: "farms/5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
    earn: "WAL",
    tvl: "298,093.215",
    rewardPool: "298,093.215",
    multiplier: "1.215",
    expiredIn: "18d 10h 10m 54s",
    myStake: "100,000",
    isMyStake: Boolean(parseInt(Math.random().toFixed(0))),
  },
};

const AvailableNFTs = () => (
  <>
    <Stack
      w="full"
      spacing="30px"
      alignItems="start"
      direction={{ base: "column", lg: "row" }}
    >
      <IWCardNFTWrapper
        data={[
          {
            nftName: "Praying Mantis Predator #82",
            action: "Unstake",
            imageUrl:
              "https://imagedelivery.net/Iw4Pp5uTB3HCaJ462QFK1Q/PMP/nfts/82/500",
          },
          {
            nftName: "Praying Mantis Predator #83",
            action: "Unstake",
            imageUrl:
              "https://imagedelivery.net/Iw4Pp5uTB3HCaJ462QFK1Q/PMP/nfts/83/500",
          },
          {
            nftName: "Praying Mantis Predator #84",
            action: "Unstake",
            imageUrl:
              "https://imagedelivery.net/Iw4Pp5uTB3HCaJ462QFK1Q/PMP/nfts/84/500",
          },
          {
            nftName: "Praying Mantis Predator #85",
            action: "Unstake",
            imageUrl:
              "https://imagedelivery.net/Iw4Pp5uTB3HCaJ462QFK1Q/PMP/nfts/85/500",
          },
          {
            nftName: "Praying Mantis Predator #86",
            action: "Unstake",
            imageUrl:
              "https://imagedelivery.net/Iw4Pp5uTB3HCaJ462QFK1Q/PMP/nfts/86/500",
          },
        ]}
      />
    </Stack>
  </>
);

const StakedNFTs = () => (
  <Stack
    hidden
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
);

const tabsNFTData = [
  {
    label: "Available NFTs",
    component: <AvailableNFTs />,
    isDisabled: false,
  },
  {
    label: "Staked NFTs",
    component: <StakedNFTs />,
    isDisabled: false,
  },
];

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
