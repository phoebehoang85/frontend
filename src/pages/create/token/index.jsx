import { Box, Button, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import SectionContainer from "components/container/SectionContainer";
import IWInput from "components/input/Input";
import { IWTable } from "components/table/IWTable";

import React from "react";

export default function CreateTokenPage() {
  return (
    <>
      <SectionContainer
        mt={{ base: "0px", xl: "20px" }}
        title="Create Token"
        description={
          <span>
            Create standard PSP22 (ERC20) token and mint the total supply to a
            specific address. The creation requires
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
            columns={{ base: 1, lg: 2 }}
            spacingX={{ lg: "20px" }}
            spacingY={{ base: "20px", lg: "32px" }}
            mb={{ base: "30px" }}
          >
            {[
              { type: "text", label: "Token Name", placeholder: "Token Name" },
              { type: "text", label: "Mint to", placeholder: "Address" },
              {
                type: "text",
                label: "Token Symbol",
                placeholder: "Token Symbol",
              },
              { type: "text", label: "Your Balance", placeholder: "25000.657" },
              { type: "text", label: "Total Supply", placeholder: "0" },
              {
                type: "text",
                label: "Your WAL Balance",
                placeholder: "99,999.000",
              },
            ]?.map((item, idx) => {
              return (
                <Box
                  key={idx}
                  // mt="20px"
                  w={{ base: "full" }}
                >
                  <IWInput {...item} />
                </Box>
              );
            })}
          </SimpleGrid>

          <Button w="full" maxW={{ lg: "170px" }}>
            Create Token
          </Button>
        </VStack>
      </SectionContainer>

      <SectionContainer
        mt={{ base: "0px", xl: "8px" }}
        title="Recent Tokens"
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
