import { SearchIcon } from "@chakra-ui/icons";
import { Stack } from "@chakra-ui/react";
import SectionContainer from "components/container/SectionContainer";
import IWInput from "components/input/Input";

import { IWTable } from "components/table/IWTable";

export default function MyBalancePage() {
  return (
    <SectionContainer
      mt={{ base: "0px", xl: "20px" }}
      title="My Balance"
      description={
        <span>
          Veniam nisi nulla aute qui laboris qui pariatur cillum sunt qui ad
          mollit eu.
        </span>
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

        <IWTable {...tableData} />
      </Stack>
    </SectionContainer>
  );
}

const tableData = {
  tableHeader: [
    {
      name: "tokenName",
      hasTooltip: false,
      tooltipContent: "Lorem lorem",
      label: "Token Name",
    },
    {
      name: "tokenSymbol",
      hasTooltip: false,
      tooltipContent: "Lorem lorem",
      label: "Token Symbol",
    },
    {
      name: "balance",
      hasTooltip: false,
      tooltipContent: "Lorem lorem",
      label: "Balance",
    },
  ],

  tableBody: [
    {
      tokenName: "azUSD",
      tokenSymbol: "AZERO",
      balance: "1,711,777.500",
    },
    {
      tokenName: "azUSD",
      tokenSymbol: "AZERO",
      balance: "1,711,777.500",
    },
    {
      tokenName: "azUSD",
      tokenSymbol: "AZERO",
      balance: "1,711,777.500",
    },
    {
      tokenName: "azUSD",
      tokenSymbol: "AZERO",
      balance: "1,711,777.500",
    },
    {
      tokenName: "azUSD",
      tokenSymbol: "AZERO",
      balance: "1,711,777.500",
    },
  ],
};
