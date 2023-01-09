import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Select,
  Show,
  Stack,
  Switch,
} from "@chakra-ui/react";
import SectionContainer from "components/container/SectionContainer";
import IWInput from "components/input/Input";

import LogoPancake from "assets/img/denom/logo-pancake.png";
import { IWTable } from "components/table/IWTable";
import IWTabs from "components/tabs/IWTabs";

export default function FarmsPage() {
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
              <Switch id="my-stake" />
              <FormLabel htmlFor="my-stake" mb="0" ml="10px" fontWeight="400">
                My Stake
              </FormLabel>
            </FormControl>

            <FormControl maxW="200px" display="flex" alignItems="center">
              <Switch id="zero-reward-pools" />
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

const tableDataNFT = {
  tableHeader: [
    {
      name: "poolNameNFT",
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

  tableBody: [
    {
      poolNameNFT: "PMP Collection",
      poolLogo: LogoPancake,
      contractAddress: "5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
      redirectUrl: "farms/5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
      earn: "WAL",
      tvl: "123 NFTs",
      multiplier: "1.215",
      rewardPool: "298,093.215",
      expiredIn: "18d 10h 10m 54s",
      myStake: "100,000",
      isMyStake: Boolean(parseInt(Math.random().toFixed(0))),
    },
    {
      poolNameNFT: "PMP Collection",
      poolLogo: LogoPancake,
      contractAddress: "5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
      redirectUrl: "farms/5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
      earn: "WAL",
      tvl: "123 NFTs",
      multiplier: "1.215",
      rewardPool: "298,093.215",
      expiredIn: "18d 10h 10m 54s",
      myStake: "100,000",
      isMyStake: Boolean(parseInt(Math.random().toFixed(0))),
    },
    {
      poolNameNFT: "PMP Collection",
      poolLogo: LogoPancake,
      contractAddress: "5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
      redirectUrl: "farms/5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
      earn: "WAL",
      tvl: "123 NFTs",
      multiplier: "1.215",
      rewardPool: "298,093.215",
      expiredIn: "18d 10h 10m 54s",
      myStake: "100,000",
      isMyStake: Boolean(parseInt(Math.random().toFixed(0))),
    },
    {
      poolNameNFT: "PMP Collection",
      poolLogo: LogoPancake,
      contractAddress: "5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
      redirectUrl: "farms/5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
      earn: "WAL",
      tvl: "123 NFTs",
      multiplier: "1.215",
      rewardPool: "298,093.215",
      expiredIn: "18d 10h 10m 54s",
      myStake: "100,000",
      isMyStake: Boolean(parseInt(Math.random().toFixed(0))),
    },
    {
      poolNameNFT: "PMP Collection",
      poolLogo: LogoPancake,
      contractAddress: "5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
      redirectUrl: "farms/5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
      earn: "WAL",
      tvl: "123 NFTs",
      multiplier: "1.215",
      rewardPool: "298,093.215",
      expiredIn: "18d 10h 10m 54s",
      myStake: "100,000",
      isMyStake: Boolean(parseInt(Math.random().toFixed(0))),
    },
  ],
};

const tableDataToken = {
  tableHeader: [
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

  tableBody: [
    {
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
    {
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
    {
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
    {
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
    {
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
  ],
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
