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
import { APICall } from "api/client";
import { useEffect, useState, useMemo } from "react";
import { execContractQuery } from "utils/contracts";
import { useSelector } from "react-redux";
import pool_contract from "utils/contracts/pool_contract";
import { formatChainStringToNumber } from "utils";

export default function PoolsPage({ api }) {
  const { currentAccount } = useSelector((s) => s.wallet);

  const [poolsListData, setPoolsListData] = useState([]);

  useEffect(() => {
    let isUnmounted = false;

    const fetchPoolsList = async () => {
      try {
        const { status, ret } = await APICall.getPoolsList();

        if (status === "OK") {
          const poolsListAddMyStake = await Promise.all(
            ret?.map(async (pool) => {
              let queryResult = await execContractQuery(
                currentAccount?.address,
                api,
                pool_contract.CONTRACT_ABI,
                pool?.poolContract,
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

              return { ...pool, stakeInfo };
            })
          );

          if (isUnmounted) return;
          setPoolsListData(poolsListAddMyStake);
        }
      } catch (error) {
        console.log("error", error.message);
      }
    };
    fetchPoolsList();

    return () => (isUnmounted = true);
  }, [api, currentAccount?.address]);

  const poolsListDataFiltered = useMemo(() => {
    return poolsListData;
  }, [poolsListData]);

  const tableData = {
    tableHeader: [
      {
        name: "tokenName",
        hasTooltip: false,
        tooltipContent: "Lorem lorem",
        label: "Stake & Earn",
      },
      {
        name: "totalStaked",
        hasTooltip: true,
        tooltipContent: "Lorem lorem",
        label: "TVL",
      },
      {
        name: "apy",
        hasTooltip: false,
        tooltipContent: "Lorem lorem",
        label: "APY",
      },
      {
        name: "rewardPool",
        hasTooltip: true,
        tooltipContent: "Lorem lorem",
        label: "Reward Pool",
      },
      {
        name: "startTime",
        hasTooltip: false,
        tooltipContent: "Lorem lorem",
        label: "Expired In",
      },
      {
        name: "stakeInfo",
        hasTooltip: false,
        tooltipContent: "Lorem lorem",
        label: "My Stake",
      },
    ],

    tableBody: poolsListDataFiltered,
  };

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
