import { ChevronRightIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Circle,
  Flex,
  HStack,
  Image,
  Show,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import SectionContainer from "components/container/SectionContainer";
import IWInput from "components/input/Input";

import IWCard from "components/card/Card";
import IWTabs from "components/tabs/IWTabs";
import ConfirmModal from "components/modal/ConfirmModal";
import LogoPancake from "assets/img/denom/logo-pancake.png";
import IWCardOneColumn from "components/card/CardOneColumn";
import CardThreeColumn from "components/card/CardThreeColumn";
import CardTwoColumn from "components/card/CardTwoColumn";

export default function PoolDetailPage() {
  return (
    <>
      <Show above="md">
        <SectionContainer mt={{ xl: "-48px" }} mb={{ xl: "-32px" }}>
          <Breadcrumb
            spacing="4px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            <BreadcrumbItem color="text.1">
              <BreadcrumbLink href="#/pools">Staking Pools</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem color="text.2">
              <BreadcrumbLink href="#">Detail</BreadcrumbLink>
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
              {cardData?.cardHeaderList?.map(
                ({ name, hasTooltip, label, tooltipContent }) => {
                  return name === "myStake" ? null : (
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

                        <Text>{cardData?.cardValue[name]}</Text>
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

const MyStakeRewardInfo = ({ variant = "nft-farm" }) => {
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
          { title: "Account Address", content: "5Dth...34hiX" },
          { title: "Account Balance", content: "10,036,000.000" },
          { title: "AZERO xxx-azUSD-LP Balance", content: "10,036.000" },
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

        <IWCard mt="24px" w="full" variant="solid">
          <Flex
            w="100%"
            spacing="20px"
            flexDirection={{ base: "column", lg: "row" }}
            alignItems={{ base: "center", lg: "center" }}
          >
            <IWInput
              type="number"
              placeholder="Enter amount to stake or unstake"
              // inputRightElementIcon={
              //   <Heading as="h5" size="h5">
              //     $WAL
              //   </Heading>
              // }
            />

            <HStack
              ml={{ base: "0", lg: "20px" }}
              mt={{ base: "10px", lg: "0px" }}
              maxW={{ base: "full", lg: "245px" }}
              w="full"
              spacing="10px"
              justifyContent="space-between"
            >
              <ConfirmModal
                action="stake"
                buttonVariant="primary"
                buttonLabel="Stake"
                onClick={() => alert("Do Stake")}
                message="Stake costs 10 WAL. Continue?"
              />

              <ConfirmModal
                action="unstake"
                buttonVariant="primary"
                buttonLabel="Unstake"
                onClick={() => alert("Do Unstake")}
                message="Unstake costs 10 WAL. Continue?"
              />
            </HStack>
          </Flex>
        </IWCard>
      </CardThreeColumn>
    </Stack>
  );
};

const PoolInfo = () => (
  <Stack
    w="full"
    spacing="30px"
    alignItems="start"
    direction={{ base: "column", lg: "row" }}
  >
    <CardTwoColumn
      title="qwe Staking Token Information"
      data={[
        { title: "Pool Contract Address", content: "5Dth...34hiX" },
        { title: "qwe APR", content: "35%" },
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
      title="General Information"
      data={[
        { title: "Total Name", content: "Ink Whale Token" },
        { title: "Contract Address", content: "5Dth...34hiX" },
        { title: "Total Supply", content: "10,036.000" },
        { title: "Token Symbol", content: "WAL" },
      ]}
    />
  </Stack>
);

const tabsData = [
  {
    label: <>My Stakes & Rewards</>,
    component: <MyStakeRewardInfo />,
    isDisabled: false,
  },
  {
    label: (
      <>
        Pool Info<Show above="md">rmation</Show>
      </>
    ),
    component: <PoolInfo />,
    isDisabled: false,
  },
];

const cardData = {
  cardHeaderList: [
    {
      name: "poolNameToken",
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
    poolNameToken: "AZERO",
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
