import { Box, Button, Heading, Show, Stack } from "@chakra-ui/react";
import IWCard from "components/card/Card";
import IWCardOneColumn from "components/card/CardOneColumn";
import SectionContainer from "components/container/SectionContainer";
import IWInput from "components/input/Input";
import IWSelect from "components/select/IWSelect";
import IWTabs from "components/tabs/IWTabs";

import React from "react";

export default function TokensPage() {
  return (
    <>
      <SectionContainer
        mt={{ base: "0px", xl: "20px" }}
        title="Token Interaction"
        description={
          <span>Check token information, transfer or burn tokens.</span>
        }
      >
        <Stack
          w="full"
          spacing="30px"
          alignItems="start"
          direction={{ base: "column" }}
        >
          <IWCard mt="16px" w="full" variant="solid">
            <Stack
              w="full"
              spacing="20px"
              alignItems={{ base: "end" }}
              flexDirection={{ base: "column", lg: "row" }}
            >
              <Box w="full" pr={{ lg: "10px" }}>
                <IWSelect
                  dataList={["Token A", "Token B", "Token C"]}
                  label="Token Contract Address"
                />
              </Box>
              <Box w="full" pr={{ lg: "20px" }}>
                <IWInput
                  type="number"
                  placeholder="Address to check"
                  label="or enter token contract address"
                />
              </Box>

              <Button w="full" maxW={{ base: "full", lg: "190px" }}>
                Load
              </Button>
            </Stack>
          </IWCard>

          <IWTabs tabsData={tabsData} />
        </Stack>
      </SectionContainer>
    </>
  );
}

const TokensTabCheckBalance = ({ mode }) => {
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
          { title: "Azero Balance", content: "10,036,000.000" },
          { title: "WAL Balance", content: "10,036,000.000" },
        ]}
      />

      <IWCard
        w="full"
        variant="outline"
        title="Enter any address to check balance"
      >
        <IWCard mt="16px" w="full" variant="solid">
          <Stack
            w="100%"
            spacing="20px"
            direction={{ base: "column" }}
            align={{ base: "column", xl: "center" }}
          >
            <IWInput type="number" placeholder="Address to check" />

            <IWInput
              type="number"
              placeholder="0"
              // inputRightElementIcon={<AzeroLogo />}
              inputRightElementIcon={
                <Heading as="h5" size="h5" fontWeight="semibold">
                  $WAL
                </Heading>
              }
            />

            <Button w="full">Check</Button>
          </Stack>
        </IWCard>
      </IWCard>
    </Stack>
  );
};

const TokensTabTransferToken = ({ mode }) => {
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
          { title: "Azero Balance", content: "10,036,000.000" },
          { title: "WAL Balance", content: "10,036,000.000" },
        ]}
      />

      <IWCard w="full" variant="outline" title="Transfer WAL Tokens">
        <IWCard mt="16px" w="full" variant="solid">
          <Stack
            w="100%"
            spacing="20px"
            direction={{ base: "column" }}
            align={{ base: "column", xl: "center" }}
          >
            <IWInput type="number" placeholder="Address to transfer" />

            <IWInput
              type="number"
              placeholder="Amount to transfer"
              // inputRightElementIcon={<AzeroLogo />}
              inputRightElementIcon={
                <Heading as="h5" size="h5" fontWeight="semibold">
                  $WAL
                </Heading>
              }
            />

            <Button w="full">Transfer</Button>
          </Stack>
        </IWCard>
      </IWCard>
    </Stack>
  );
};

const TokensTabBurnToken = ({ mode }) => {
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
          { title: "Azero Balance", content: "10,036,000.000" },
          { title: "WAL Balance", content: "10,036,000.000" },
        ]}
      />

      <IWCard w="full" variant="outline" title="Burn WAL Tokens">
        <IWCard mt="16px" w="full" variant="solid">
          <Stack
            w="100%"
            spacing="20px"
            direction={{ base: "column" }}
            align={{ base: "column", xl: "center" }}
          >
            <IWInput
              type="number"
              placeholder="Amount to burn"
              // inputRightElementIcon={<AzeroLogo />}
              inputRightElementIcon={
                <Heading as="h5" size="h5" fontWeight="semibold">
                  $WAL
                </Heading>
              }
            />

            <Button w="full">Burn</Button>
          </Stack>
        </IWCard>
      </IWCard>
    </Stack>
  );
};

const tabsData = [
  {
    label: <>Check Balance</>,
    component: <TokensTabCheckBalance mode="BALANCE_CHECK" />,
    isDisabled: false,
  },
  {
    label: (
      <>
        Transfer<Show above="md"> Token</Show>
      </>
    ),
    component: <TokensTabTransferToken mode="TRANSFER_TOKEN" />,
    isDisabled: false,
  },
  {
    label: (
      <>
        Burn<Show above="md"> Token</Show>
      </>
    ),
    component: <TokensTabBurnToken mode="BURN_TOKEN" />,
    isDisabled: false,
  },
];
