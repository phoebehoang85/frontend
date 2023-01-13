import { Box, Button, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import SectionContainer from "components/container/SectionContainer";
import IWInput from "components/input/Input";
import { IWTable } from "components/table/IWTable";
import { toastMessages } from "constants";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBalance } from "redux/slices/walletSlice";
import { delay } from "utils";
import { formatNumToBN } from "utils";
import { formatQueryResultToNumber } from "utils";
import { execContractQuery } from "utils/contracts";
import { execContractTx } from "utils/contracts";
import azt_contract from "utils/contracts/azt_contract";
import core_contract from "utils/contracts/core";
import psp22_contract from "utils/contracts/psp22_contract";

export default function CreateTokenPage({ api }) {
  const dispatch = useDispatch();
  const { currentAccount } = useSelector((s) => s.wallet);

  const [tokenName, setTokenName] = useState("");
  const [mintAddress, setMintAddress] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState(0);

  const [createTokenFee, setCreateToken] = useState(0);
  const [tokenListData, setTokenListData] = useState([]);
  console.log("tokenListData", tokenListData);
  useEffect(() => {
    const fetchCreateTokenFee = async () => {
      if (!currentAccount?.balance) return;

      const result = await execContractQuery(
        currentAccount?.address,
        "api",
        core_contract.CONTRACT_ABI,
        core_contract.CONTRACT_ADDRESS,
        0,
        "tokenManagerTrait::getCreationFee"
      );

      const fee = formatQueryResultToNumber(result);

      setCreateToken(fee);
    };

    fetchCreateTokenFee();
  }, [currentAccount?.address, currentAccount?.balance]);

  useEffect(() => {
    const fetchDataTable = async () => {
      let ret = [];

      if (!currentAccount) return;

      const result = await execContractQuery(
        currentAccount?.address,
        "api",
        core_contract.CONTRACT_ABI,
        core_contract.CONTRACT_ADDRESS,
        0,
        "tokenManagerTrait::getTokenCount"
      );

      const tokenCount = result.toHuman();

      for (let index = tokenCount; index > 0; index--) {
        const info = await execContractQuery(
          currentAccount?.address,
          "api",
          core_contract.CONTRACT_ABI,
          core_contract.CONTRACT_ADDRESS,
          0,
          "tokenManagerTrait::getTokenInfo",
          index
        );
        if (info) {
          ret.push(info.toHuman());
        }
      }
      setTokenListData(ret);
    };

    fetchDataTable();
  }, [currentAccount, currentAccount?.address]);

  async function createNewToken() {
    if (!currentAccount) {
      toast.error(toastMessages.NO_WALLET);
      return;
    }

    // if (parseInt(currentAccount?.balance?.wal) < unstakeFee) {
    //   toast.error(`You don't have enough WAL. Unstake costs ${unstakeFee} WAL`);
    //   return;
    // }

    //Approve
    toast.success("Step 1: Approving...");

    let approve = await execContractTx(
      currentAccount,
      "api",
      psp22_contract.CONTRACT_ABI,
      azt_contract.CONTRACT_ADDRESS,
      0, //-> value
      "psp22::approve",
      core_contract.CONTRACT_ADDRESS,
      formatNumToBN(createTokenFee)
    );

    if (!approve) return;

    await delay(3000);

    toast.success("Step 2: Process unstaking...");

    const newToken = await execContractTx(
      currentAccount,
      "api",
      core_contract.CONTRACT_ABI,
      core_contract.CONTRACT_ADDRESS,
      0, //-> value
      "newToken",
      mintAddress,
      totalSupply,
      tokenName,
      tokenSymbol,
      12 // tokenDecimal
    );

    setTokenName("");
    setMintAddress("");
    setTokenSymbol("");
    setTotalSupply(0);
    console.log("newToken", newToken);

    // await APICall.askBEupdate({ type: "nft", poolContract });
    // await APICall.askBEupdateNFTFromArtZero({
    //   token_id: tokenID,
    //   collection_address: NFTtokenContract,
    // });

    // toast.success("Please wait up to 10s for the data to be updated");

    // await delay(5000).then(() => {
    currentAccount && dispatch(fetchUserBalance({ currentAccount, api }));
    //   fetchTokenBalance();
    // });
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
        name: "creator",
        hasTooltip: false,
        tooltipContent: "",
        label: "Creator",
      },
      {
        name: "name",
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
        name: "totalSupply",
        hasTooltip: false,
        tooltipContent: "",
        label: "Initial Mint",
      },
      {
        name: "mintTo",
        hasTooltip: false,
        tooltipContent: "",
        label: "Mint To",
      },
    ],

    tableBody: [...tokenListData],
  };
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
              {createTokenFee} WAL
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
            <Box w={{ base: "full" }}>
              <IWInput
                type="text"
                value={tokenName}
                label="Token Name"
                placeholder="Token Name"
                onChange={({ target }) => setTokenName(target.value)}
              />
            </Box>
            <Box w={{ base: "full" }}>
              <IWInput
                type="text"
                value={mintAddress}
                label="Mint to"
                placeholder="Address"
                onChange={({ target }) => setMintAddress(target.value)}
              />
            </Box>
            <Box w={{ base: "full" }}>
              <IWInput
                type="text"
                value={tokenSymbol}
                label="Token Symbol"
                placeholder="Token Symbol"
                onChange={({ target }) => setTokenSymbol(target.value)}
              />
            </Box>
            <Box w={{ base: "full" }}>
              <IWInput
                isDisabled={true}
                value={`${currentAccount?.balance?.azero} AZERO`}
                label="Your Azero Balance"
                onChange={({ target }) => setTokenSymbol(target.value)}
              />
            </Box>
            <Box w={{ base: "full" }}>
              <IWInput
                type="text"
                value={totalSupply}
                label="Total Supply"
                placeholder="Total Supply"
                onChange={({ target }) => setTotalSupply(target.value)}
              />
            </Box>
            <Box w={{ base: "full" }}>
              <IWInput
                isDisabled={true}
                value={`${currentAccount?.balance?.wal} WAL`}
                label="Your WAL Balance"
                onChange={({ target }) => setTokenSymbol(target.value)}
              />
            </Box>
          </SimpleGrid>

          <Button w="full" maxW={{ lg: "170px" }} onClick={createNewToken}>
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
