import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import SectionContainer from "components/container/SectionContainer";
import IWInput from "components/input/Input";
import { IWTable } from "components/table/IWTable";

import React from "react";
import IWSelect from "components/select/IWSelect";
import { AzeroLogo } from "components/icons/Icons";
import { useLocation } from "react-router-dom";

export default function CreateLPPage() {
  const { pathname } = useLocation();
  console.log("mode pathname", pathname);
  const mode =
    pathname === "/create/token-lp"
      ? "TOKEN_LP"
      : pathname === "/create/nft-lp"
      ? "NFT_LP"
      : "";

  console.log("mode CreateLPPage", mode);
  return (
    <>
      <SectionContainer
        mt={{ base: "0px", xl: "20px" }}
        title="Create ArtZero's NFT Yield Farms"
        description={
          <span>
            {mode === "NFT_LP" ? "NFT" : ""} Stakers get rewards in selected
            token. The creation costs
            <Text as="span" fontWeight="700" color="text.1">
              {" "}
              100 WAL
            </Text>
          </span>
        }
      >
        <VStack w="full">
          <SimpleGrid
            w="full"
            mb={{ base: "30px" }}
            columns={{ base: 1, lg: 2 }}
            spacingX={{ lg: "20px" }}
            spacingY={{ base: "20px", lg: "32px" }}
          >
            <Box w="full">
              <IWSelect
                dataList={["Token A", "Token B", "Token C"]}
                label={`Select ${
                  mode === "NFT_LP"
                    ? "NFT Collection to stake"
                    : mode === "TOKEN_LP"
                    ? "Token to stake"
                    : ""
                } `}
              />
            </Box>
            <Box w="full">
              <IWInput
                type="number"
                placeholder="Address "
                label="or enter contract address"
              />
            </Box>

            <Box w="full">
              <IWSelect
                dataList={["Token A", "Token B", "Token C"]}
                label="Select Token to reward stakers"
              />
            </Box>
            <Box w="full">
              <IWInput
                type="number"
                placeholder="Address"
                label="or enter contract address"
              />
            </Box>

            <Box w="full">
              <IWSelect
                dataList={[
                  "12/29/2022 5:08 PM",
                  "12/29/2022 5:08 PM",
                  "12/29/2022 5:08 PM",
                ]}
                label="Start Date & Time"
              />
            </Box>
            <Box w="full">
              <IWInput
                type="number"
                placeholder="25000.657"
                label="Your AZERO Balance"
                inputRightElementIcon={<AzeroLogo />}
              />
            </Box>

            <Box w="full">
              <IWInput
                type="number"
                placeholder="0"
                label="Pool Length (days)"
              />
            </Box>
            <Box w="full">
              {mode === "NFT_LP" ? (
                <IWInput
                  type="number"
                  placeholder="250.657"
                  label="Your Token Balance"
                />
              ) : (
                <Stack
                  flexDirection={{ base: "column", lg: "row" }}
                  justifyContent="space-between"
                  alignItems="end"
                  w="full"
                >
                  <IWInput
                    type="number"
                    placeholder="99,999.000"
                    label="Your Token Balance"
                    inputRightElementIcon={
                      <Heading as="h5" size="h5" fontWeight="semibold">
                        $BMI
                      </Heading>
                    }
                  />
                  <IWInput
                    ml={{ lg: "20px" }}
                    type="number"
                    placeholder="99,999.000"
                    inputRightElementIcon={
                      <Heading as="h5" size="h5" fontWeight="semibold">
                        $APK
                      </Heading>
                    }
                  />
                </Stack>
              )}
            </Box>

            <Box w="full">
              <IWInput type="number" placeholder="1.0" label="Multiplier" />
            </Box>

            <Box w="full">
              <IWInput
                type="number"
                placeholder="99,999.000"
                label="Your WAL Balance"
                inputRightElementIcon={
                  <Heading as="h5" size="h5" fontWeight="semibold">
                    $WAL
                  </Heading>
                }
              />
            </Box>
          </SimpleGrid>

          <Button w="full" maxW={{ lg: "260px" }}>
            Create Token Yield Farms
          </Button>
        </VStack>
      </SectionContainer>

      <SectionContainer
        mt={{ base: "0px", xl: "8px" }}
        title="Recent ArtZero's Yield Farms Pools
        "
        description={`Fugiat quis do exercitation ut consequat id consectetur.`}
      >
        <IWTable {...tableData} />
      </SectionContainer>
    </>
  );
}
const tableData = {
  tableHeader: [
    {
      name: "contractAddress",
      hasTooltip: false,
      tooltipContent: "",
      label: "Contract Address",
    },
    {
      name: "creatorAddress",
      hasTooltip: false,
      tooltipContent: "",
      label: "Creator",
    },
    {
      name: "creatorName",
      hasTooltip: false,
      tooltipContent: "",
      label: "Name",
    },
    {
      name: "symbol",
      hasTooltip: false,
      tooltipContent: "",
      label: "Symbol",
    },
    {
      name: "decimal",
      hasTooltip: false,
      tooltipContent: "",
      label: "Decimal",
    },
    {
      name: "initialMint",
      hasTooltip: false,
      tooltipContent: "",
      label: "Initial Mint",
    },
    {
      name: "mintToAddress",
      hasTooltip: false,
      tooltipContent: "",
      label: "Mint To",
    },
  ],

  tableBody: [
    {
      contractAddress: "5CiP...JbtUe5",
      creatorAddress: "5CiP...JbtUe5",
      creatorName: "Shaktiman",
      symbol: "MNI",
      decimal: "12",
      initialMint: "1",
      mintToAddress: "5CiP...JbtUe5",
    },
    {
      contractAddress: "5CiP...JbtUe5",
      creatorAddress: "5CiP...JbtUe5",
      creatorName: "Shaktiman",
      symbol: "MNI",
      decimal: "12",
      initialMint: "1",
      mintToAddress: "5CiP...JbtUe5",
    },
    {
      contractAddress: "5CiP...JbtUe5",
      creatorAddress: "5CiP...JbtUe5",
      creatorName: "Shaktiman",
      symbol: "MNI",
      decimal: "12",
      initialMint: "1",
      mintToAddress: "5CiP...JbtUe5",
    },
    {
      contractAddress: "5CiP...JbtUe5",
      creatorAddress: "5CiP...JbtUe5",
      creatorName: "Shaktiman",
      symbol: "MNI",
      decimal: "12",
      initialMint: "1",
      mintToAddress: "5CiP...JbtUe5",
    },
  ],
};
