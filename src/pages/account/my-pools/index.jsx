import { Stack } from "@chakra-ui/react";
import SectionContainer from "components/container/SectionContainer";

import { IWTable } from "components/table/IWTable";
import { APICall } from "api/client";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

export default function MyPoolsPage({ api }) {
  const { currentAccount } = useSelector((s) => s.wallet);

  const [poolsListData, setPoolsListData] = useState([]);

  useEffect(() => {
    let isUnmounted = false;

    const fetchPoolsList = async () => {
      try {
        const { status, ret } = await APICall.getPoolsList();

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

  const poolsListDataFiltered = useMemo(() => {
    //TODO; add more filter here later
    return poolsListData;
  }, [poolsListData]);

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

    tableBody: poolsListDataFiltered,
  };

  return (
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
        {/* <Stack
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
        </Stack> */}

        {/* <HStack
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
        </HStack> */}

        <IWTable {...tableData} />
      </Stack>
    </SectionContainer>
  );
}
