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

import LogoPancake from "assets/img/denom/logo-pancake.png";
import { IWTable } from "components/table/IWTable";

export default function PoolsPage() {
  return (
    <SectionContainer
      mt={{ base: "0px", xl: "20px" }}
      title="Staking Pools"
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

        <IWTable {...tableData} />
      </Stack>
    </SectionContainer>
  );
}

const tableData = {
  tableHeader: [
    {
      name: "poolName",
      hasTooltip: false,
      tooltipContent: "Lorem lorem",
      label: "Stake & Earn",
    },
    {
      name: "tvl",
      hasTooltip: true,
      tooltipContent: "Lorem lorem",
      label: "TVL",
    },
    {
      name: "apr",
      hasTooltip: false,
      tooltipContent: "Lorem lorem",
      label: "APR",
    },
    {
      name: "rewardPool",
      hasTooltip: true,
      tooltipContent: "Lorem lorem",
      label: "Reward Pool",
    },
    {
      name: "expiredIn",
      hasTooltip: false,
      tooltipContent: "Lorem lorem",
      label: "Expired In",
    },
    {
      name: "myStake",
      hasTooltip: false,
      tooltipContent: "Lorem lorem",
      label: "My Stake (WAL)",
    },
  ],

  tableBody: [
    {
      poolName: "azUSD",
      poolLogo: LogoPancake,
      contractAddress: "5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
      redirectUrl: "pools/5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
      tvl: "1,711,777.500",
      apr: "35%",
      rewardPool: "298,093.215",
      expiredIn: "18d : 10h : 10m : 54s",
      myStake: "100,000",
      isMyStake: Boolean(parseInt(Math.random().toFixed(0))),
    },
    {
      poolName: "azUSD",
      poolLogo: LogoPancake,
      contractAddress: "5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
      redirectUrl: "pools/5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
      tvl: "1,711,777.500",
      apr: "35%",
      rewardPool: "298,093.215",
      expiredIn: "18d : 10h : 10m : 54s",
      myStake: "100,000",
      isMyStake: Boolean(parseInt(Math.random().toFixed(0))),
    },
    {
      poolName: "azUSD",
      poolLogo: LogoPancake,
      contractAddress: "5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
      redirectUrl: "pools/5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
      tvl: "1,711,777.500",
      apr: "35%",
      rewardPool: "298,093.215",
      expiredIn: "18d : 10h : 10m : 54s",
      myStake: "100,000",
      isMyStake: Boolean(parseInt(Math.random().toFixed(0))),
    },
    {
      poolName: "azUSD",
      poolLogo: LogoPancake,
      contractAddress: "5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
      redirectUrl: "pools/5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
      tvl: "1,711,777.500",
      apr: "35%",
      rewardPool: "298,093.215",
      expiredIn: "18d : 10h : 10m : 54s",
      myStake: "100,000",
      isMyStake: Boolean(parseInt(Math.random().toFixed(0))),
    },
    {
      poolName: "azUSD",
      poolLogo: LogoPancake,
      contractAddress: "5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
      redirectUrl: "pools/5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
      tvl: "1,711,777.500",
      apr: "35%",
      rewardPool: "298,093.215",
      expiredIn: "18d : 10h : 10m : 54s",
      myStake: "100,000",
      isMyStake: Boolean(parseInt(Math.random().toFixed(0))),
    },
    {
      poolName: "azUSD",
      poolLogo: LogoPancake,
      contractAddress: "5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
      redirectUrl: "pools/5CiPbRSoW5bV21mEMYXPBNwamjHa5ZBnFW5mF1etPfJbtUe5",
      tvl: "1,711,777.500",
      apr: "35%",
      rewardPool: "298,093.215",
      expiredIn: "18d : 10h : 10m : 54s",
      myStake: "100,000",
      isMyStake: Boolean(parseInt(Math.random().toFixed(0))),
    },
  ],
};
