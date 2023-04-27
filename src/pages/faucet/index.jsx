import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import IWCard from "components/card/Card";
import IWCardOneColumn from "components/card/CardOneColumn";
import SectionContainer from "components/container/SectionContainer";
import { AzeroLogo } from "components/icons/Icons";
import IWInput from "components/input/Input";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import azt_contract from "utils/contracts/azt_contract";
import token_sale from "utils/contracts/token_sale";
import private_sale from "utils/contracts/private_sale";
import public_sale from "utils/contracts/public_sale";

import { formatQueryResultToNumber } from "utils";
import { execContractQuery } from "utils/contracts";
import { addressShortener } from "utils";
import { isAddressValid } from "utils";
import { toastMessages } from "constants";
import { toast } from "react-hot-toast";
import { delay } from "utils";
import { execContractTx } from "utils/contracts";
import { formatNumToBN } from "utils";
import { fetchUserBalance } from "redux/slices/walletSlice";
import { formatNumDynDecimal } from "utils";
import { formatChainStringToNumber } from "utils";
import AddressCopier from "components/address-copier/AddressCopier";
import IWTabs from "components/tabs/IWTabs";
import SaleTab from "components/tabs/SaleTab";
import IWCountDown from "components/countdown/CountDown";
import { formatBalance } from "@polkadot/util";
import CardThreeColumn from "components/card/CardThreeColumn";
import BN from "bn.js";

const inwContractAddress = azt_contract.CONTRACT_ADDRESS;

export default function FaucetPage({ api }) {
  const { currentAccount } = useSelector((s) => s.wallet);
  const { allTokensList } = useSelector((s) => s.allPools);

  const dispatch = useDispatch();

  const inwBalance = currentAccount?.balance?.inw ?? 0;
  const azeroBalance = currentAccount?.balance?.azero ?? 0;
  const [selectedContractAddress, setSelectedContractAddress] = useState(null);

  const [inwTotalSupply, setInwTotalSupply] = useState(0);
  const [availableMint, setAvailableMint] = useState('0');
  const [inwBuyAmount, setInwBuyAmount] = useState("");
  const [inwInCur, setInwInCur] = useState(0);
  const [inwPrice, setInwPrice] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [saleInfo, setSaleInfo] = useState({});

  const [accountInfo, setAccountInfo] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [accountInfoLoading, setAccountInfoLoading] = useState(false);

  const prepareAccountInfoData = useCallback(() => {
    setAccountInfoLoading(true);

    const fetch = async () => {
      let ret = [
        {
          title: "Account Address",
          content: !currentAccount?.address
            ? "No account selected"
            : addressShortener(currentAccount?.address),
        },
        { title: "Azero Balance", content: `${azeroBalance} AZERO` },
        { title: "INW Balance", content: `${inwBalance} INW` },
      ];

      try {
        if (selectedContractAddress) {
          let balance = await execContractQuery(
            currentAccount?.address,
            api,
            azt_contract.CONTRACT_ABI,
            selectedContractAddress,
            0,
            "psp22::balanceOf",
            currentAccount?.address
          );

          const symbol = allTokensList.find(
            (item) => item.contractAddress === selectedContractAddress
          )?.symbol;

          ret.push({
            title: `${symbol} Balance`,
            content: `${formatQueryResultToNumber(balance)} ${symbol}`,
          });
        }
        setAccountInfoLoading(false);
        setAccountInfo((prev) => {
          return ret;
        });
      } catch (error) {
        setAccountInfoLoading(false);
        toast.error(error.message);
        console.log("error", error);
      }
    };
    fetch();
  }, [
    api,
    azeroBalance,
    currentAccount?.address,
    allTokensList,
    selectedContractAddress,
    inwBalance,
  ]);

  const getPriceInw = async (token) => {
    let price = await execContractQuery(
      currentAccount?.address,
      api,
      token.CONTRACT_ABI,
      token.CONTRACT_ADDRESS,
      0,
      "genericTokenSaleTrait::inwPrice"
    );
    setInwPrice(formatQueryResultToNumber(price));
  };

  const getSaleInfo = async (token) => {
    let query1 = execContractQuery(
      currentAccount?.address,
      api,
      token.CONTRACT_ABI,
      token.CONTRACT_ADDRESS,
      0,
      "genericTokenSaleTrait::endTime"
    );
    const query2 = execContractQuery(
      currentAccount?.address,
      api,
      token.CONTRACT_ABI,
      token.CONTRACT_ADDRESS,
      0,
      "genericTokenSaleTrait::getBuyerInfo",
      currentAccount?.address
    );

    const query3 = execContractQuery(
      currentAccount?.address,
      api,
      token.CONTRACT_ABI,
      token.CONTRACT_ADDRESS,
      0,
      "genericTokenSaleTrait::totalPurchasedAmount"
    );

    const query4 = execContractQuery(
      currentAccount?.address,
      api,
      token.CONTRACT_ABI,
      token.CONTRACT_ADDRESS,
      0,
      "genericTokenSaleTrait::totalAmount"
    );

    const query5 = execContractQuery(
      currentAccount?.address,
      api,
      token.CONTRACT_ABI,
      token.CONTRACT_ADDRESS,
      0,
      "genericTokenSaleTrait::totalClaimedAmount"
    );
    const query6 = execContractQuery(
      currentAccount?.address,
      api,
      token.CONTRACT_ABI,
      token.CONTRACT_ADDRESS,
      0,
      "genericTokenSaleTrait::vestingDuration"
    );

    const query7 = execContractQuery(
      currentAccount?.address,
      api,
      token.CONTRACT_ABI,
      token.CONTRACT_ADDRESS,
      0,
      "genericTokenSaleTrait::totalPurchasedAmount"
    );
    const query8 = execContractQuery(
      currentAccount?.address,
      api,
      token.CONTRACT_ABI,
      token.CONTRACT_ADDRESS,
      0,
      "genericTokenSaleTrait::isBurned"
    );
    const query9 = execContractQuery(
      currentAccount?.address,
      api,
      token.CONTRACT_ABI,
      token.CONTRACT_ADDRESS,
      0,
      "genericTokenSaleTrait::getUnclaimedAmount"
    );
    const [
      endTime,
      buyInfoQr,
      balancePurchaseInwQr,
      balanceTotalInwQr,
      totalClaimedQr,
      vestingDuration,
      totalPuchaedQr,
      isBurnedQr,
      unclaimAmount,
    ] = await Promise.all([
      query1,
      query2,
      query3,
      query4,
      query5,
      query6,
      query7,
      query8,
      query9,
    ]);
    const leftAmount =
      +balanceTotalInwQr.toHuman().Ok?.replaceAll(",", "") -
      +balancePurchaseInwQr.toHuman().Ok?.replaceAll(",", "");
    const result = endTime?.toHuman()?.Ok?.replaceAll(",", "");
    const result2 = buyInfoQr?.toHuman()?.Ok;
    const result3 = balanceTotalInwQr?.toHuman()?.Ok;
    const buyInfo = {
      claimedAmount: formatNumDynDecimal(
        result2?.claimedAmount?.replaceAll(",", "") / 10 ** 12,
        2
      ),
      purchasedAmount: formatNumDynDecimal(
        result2?.purchasedAmount?.replaceAll(",", "") / 10 ** 12,
        2
      ),
    };
  
    setAvailableMint(formatNumDynDecimal(leftAmount / 10 ** 12));
    setSaleInfo({
      buyerInfo: buyInfo,
      totalSale: formatNumDynDecimal(
        result3?.replaceAll(",", "") / 10 ** 12,
        2
      ),
      totalClaimed: formatNumDynDecimal(
        totalClaimedQr?.toHuman()?.Ok?.replaceAll(",", "") / 10 ** 12,
        2
      ),
      endTimeSale: result,
      unclaimAmount: unclaimAmount?.toHuman()?.Ok?.Ok?.replaceAll(",", "") || 0,
      burnedAmount: isBurnedQr?.toHuman()?.Ok
        ? result3?.replaceAll(",", "") -
          +totalPuchaedQr?.toHuman()?.Ok?.replaceAll(",", "")
        : 0,
      vestingDuration: vestingDuration?.toHuman()?.Ok?.replaceAll(",", "") || 0,
    });
  };

  useEffect(() => {
    prepareAccountInfoData();
  }, [prepareAccountInfoData]);

  const faucetHandler = async (selectedContractAddress) => {
    if (!api) {
      toast.error(toastMessages.ERR_API_CONN);
      return;
    }

    if (!currentAccount) {
      toast.error(toastMessages.NO_WALLET);
      return;
    }

    if (!selectedContractAddress) {
      toast.error(toastMessages.NO_TOKEN_SELECTED);
      return;
    }

    if (!isAddressValid(selectedContractAddress)) {
      toast.error(toastMessages.INVALID_ADDRESS);
      return;
    }

    try {
      await execContractTx(
        currentAccount,
        api,
        azt_contract.CONTRACT_ABI,
        selectedContractAddress,
        0, //-> value
        "faucet"
      );
    } catch (error) {
      console.log(error);
    }

    await delay(2000).then(() => {
      prepareAccountInfoData();
    });
  };

  const getInwMintingCapAndTotalSupply = useCallback(async () => {
    if (!api) {
      setInwTotalSupply(0);
      return;
    }

    let result1 = await execContractQuery(
      process.env.REACT_APP_PUBLIC_ADDRESS,
      api,
      azt_contract.CONTRACT_ABI,
      azt_contract.CONTRACT_ADDRESS,
      0,
      "psp22Capped::cap"
    );
    const inwTotalSupply = formatQueryResultToNumber(result1);

    setInwTotalSupply(inwTotalSupply.replace(".0000", ""));

    let result2 = await execContractQuery(
      process.env.REACT_APP_PUBLIC_ADDRESS,
      api,
      azt_contract.CONTRACT_ABI,
      azt_contract.CONTRACT_ADDRESS,
      0,
      "psp22::totalSupply"
    );
    const inwInCUr = formatQueryResultToNumber(result2);

    setInwInCur(inwInCUr.replace(".0000", ".00"));
  }, [api]);

  const isSaleEnded = useMemo(
    () => Date.now() >= saleInfo?.endTimeSale,
    [saleInfo?.endTimeSale]
  );

  const disableBuyBtn = useMemo(() => {
    return (
      inwBuyAmount * parseFloat(inwPrice) >=
        formatChainStringToNumber(azeroBalance) || isSaleEnded || availableMint?.replaceAll(',', '') < +inwBuyAmount
    );
  }, [azeroBalance, inwBuyAmount, inwPrice, isSaleEnded, availableMint]);

  const getBalanceContract = async (token) => {
    let balance = await execContractQuery(
      currentAccount?.address,
      api,
      azt_contract.CONTRACT_ABI,
      azt_contract.CONTRACT_ADDRESS,
      0,
      "psp22::balanceOf",
      token.CONTRACT_ADDRESS
    );
    setAvailableMint(
      formatQueryResultToNumber(balance).replace(".0000", ".00")
    );
  };
  const getPublicsaleInfo = async (token) => {
    let endTime = await execContractQuery(
      currentAccount?.address,
      api,
      token.CONTRACT_ABI,
      token.CONTRACT_ADDRESS,
      0,
      "genericTokenSaleTrait::endTime"
    );
    setSaleInfo({ endTimeSale: endTime?.toHuman()?.Ok?.replaceAll(",", "") });
  };

  useEffect(() => {
    getInwMintingCapAndTotalSupply();
  }, [api, currentAccount, getInwMintingCapAndTotalSupply]);

  const getInfo = () => {
    if (tabIndex === 0) {
      getPriceInw(private_sale);
      getSaleInfo(private_sale);
      getBalanceContract(private_sale);
    } else {
      getPublicsaleInfo(public_sale);
      getPriceInw(public_sale);
      getBalanceContract(public_sale);
    }
  }

  useEffect(() => {
    getInfo()
  }, [tabIndex]);

  function roundUp(v, n = 12) {
    return Math.ceil(v * Math.pow(10, n)) / Math.pow(10, n);
}

  useEffect(() => {
    if (!(api && currentAccount?.address)) return;
    getInfo()
    const interval = setInterval(() => {
      getInfo()
    }, 60000);
    return () => clearInterval(interval);
  }, [api, currentAccount]);

  const inwPublicMintHandler = async () => {
    if (!api) {
      toast.error(toastMessages.ERR_API_CONN);
      return;
    }

    if (!currentAccount) {
      toast.error(toastMessages.NO_WALLET);
      return;
    }

    await execContractTx(
      currentAccount,
      api,
      public_sale.CONTRACT_ABI,
      public_sale.CONTRACT_ADDRESS,
      roundUp(inwPrice*inwBuyAmount) * 10 ** 12, //-> value
      "genericTokenSaleTrait::purchase",
      formatNumToBN(inwBuyAmount) // -> token_amount, <...args>
    );

    await delay(5000);

    toast.promise(
      delay(1000).then(() => {
        if (currentAccount) {
          dispatch(fetchUserBalance({ currentAccount, api }));
        }

        getInwMintingCapAndTotalSupply();
        getInfo()
        setInwBuyAmount("");
      }),
      {
        loading: "Fetching new data ... ",
        success: "Done !",
        error: "Could not fetch data!!!",
      }
    );
  };

  const inwPrivateMintHandler = async () => {
    if (!api) {
      toast.error(toastMessages.ERR_API_CONN);
      return;
    }

    if (!currentAccount) {
      toast.error(toastMessages.NO_WALLET);
      return;
    }
    console.log(roundUp(inwPrice*inwBuyAmount));
    await execContractTx(
      currentAccount,
      api,
      private_sale.CONTRACT_ABI,
      private_sale.CONTRACT_ADDRESS,
      roundUp(inwPrice*inwBuyAmount) * 10 ** 12, //-> value
      "genericTokenSaleTrait::purchase",
      formatNumToBN(inwBuyAmount) // -> token_amount, <...args>
    );

    await delay(5000);

    toast.promise(
      delay(1000).then(() => {
        if (currentAccount) {
          dispatch(fetchUserBalance({ currentAccount, api }));
        }

        getInwMintingCapAndTotalSupply();
        getInfo()
        setInwBuyAmount("");
      }),
      {
        loading: "Fetching new data ... ",
        success: "Done !",
        error: "Could not fetch data!!!",
      }
    );
  };

  const claimPrivateInw = async () => {
    if (!api) {
      toast.error(toastMessages.ERR_API_CONN);
      return;
    }

    if (!currentAccount) {
      toast.error(toastMessages.NO_WALLET);
      return;
    }

    await execContractTx(
      currentAccount,
      api,
      private_sale.CONTRACT_ABI,
      private_sale.CONTRACT_ADDRESS,
      0, //-> value
      "genericTokenSaleTrait::claim"
    );

    await delay(5000);

    toast.promise(
      delay(1000).then(() => {
        if (currentAccount) {
          dispatch(fetchUserBalance({ currentAccount, api }));
        }

        getInwMintingCapAndTotalSupply();
        getInfo()
        setInwBuyAmount("");
      }),
      {
        loading: "Fetching new data ... ",
        success: "Done !",
        error: "Could not fetch data!!!",
      }
    );
  };

  const tabsData = [
    {
      label: <>Private Sale</>,
      component: !isSaleEnded ? (
        <IWCard
          w="full"
          variant="outline"
          title={
            <Flex justifyContent={"space-between"}>
              <Heading as="h4" size="h4" lineHeight="25px">
                Acquire INW Tokens
              </Heading>
              <Flex>
                {saleInfo?.endTimeSale ? (
                  <>
                    Sale end in:{" "}
                    <Text paddingLeft={"4px"}>
                      <IWCountDown date={+saleInfo?.endTimeSale} />{" "}
                    </Text>{" "}
                  </>
                ) : (
                  ""
                )}
              </Flex>
            </Flex>
          }
        >
          <IWCard mt="16px" w="full" variant="solid">
            <Stack
              w="100%"
              spacing="20px"
              direction={{ base: "column" }}
              align={{ base: "column", xl: "center" }}
            >
              <IWInput
                value={inwBuyAmount}
                onChange={({ target }) => setInwBuyAmount(target.value)}
                type="number"
                placeholder="Enter INW amount"
                inputRightElementIcon={
                  <Heading as="h5" size="h5" fontWeight="semibold">
                    INW
                  </Heading>
                }
              />

              <IWInput
                value={formatNumDynDecimal(roundUp(inwPrice*inwBuyAmount), 4)}
                isDisabled={true}
                placeholder="0.000000000"
                inputRightElementIcon={<AzeroLogo />}
              />
              <Flex
                mt={{ base: "15px", lg: "0px" }}
                w="full"
                justifyContent="space-between"
              >
                <Text textAlign="left" fontSize="md" lineHeight="28px">
                  Price: {inwPrice} INW / Azero
                </Text>
                <Text textAlign="left" fontSize="md" lineHeight="28px">
                  INW Available to acquire: {availableMint}
                </Text>
              </Flex>
              {inwBuyAmount ? (
                <Flex
                  mt={{ base: "15px", lg: "0px" }}
                  w="full"
                  justifyContent="space-between"
                >
                  <Text textAlign="left" fontSize="md" lineHeight="28px">
                    You will receive 5% ({roundUp((inwBuyAmount * 5) / 100)} INW) at TGE
                    {/* , then linear vesting over the next 24 months */}
                  </Text>
                </Flex>
              ) : (
                ""
              )}
              <Button
                w="full"
                onClick={inwPrivateMintHandler}
                disabled={disableBuyBtn}
              >
                Buy INW
              </Button>
            </Stack>
          </IWCard>
        </IWCard>
      ) : (
        <>
          <CardThreeColumn
            title="Private Sale Vesting"
            data={[
              {
                title: "Claimable Amount",
                content: `${formatNumDynDecimal(saleInfo?.unclaimAmount/10**12, 2)} INW`,
              },
              {
                title: "Total Claimed Amount",
                content: `${saleInfo?.buyerInfo?.claimedAmount} INW`,
              },
              {
                title: "Allocation",
                content: `${saleInfo?.buyerInfo?.purchasedAmount} INW`,
              },
              {
                title: "Vesting Duration",
                content: `${saleInfo?.vestingDuration / 60 / 1000} minutes`,
              },
              {
                title: "Vesting Start Date/Time",
                content: new Date(+saleInfo?.endTimeSale).toLocaleString(
                  "en-US"
                ),
              },
              {
                title: "Vesting End Date/Time",
                content: new Date(
                  +saleInfo?.endTimeSale + +saleInfo?.vestingDuration
                ).toLocaleString("en-US"),
              },
            ]}
          />
          {/* <IWCardOneColumn
              title="Overall Stats"
              data={[
                { title: "Allocation", content: `${saleInfo?.totalSale} INW` },
                {
                  title: "Burned Amount",
                  content: `${formatNumDynDecimal(
                    saleInfo?.burnedAmount / 10 ** 12
                  )} INW`,
                },
                {
                  title: "Claimed Amount",
                  content: `${saleInfo?.totalClaimed} INW`,
                },
                // { title: "In Circulation: ", content: `${inwInCur} INW` },
                {
                  title: "Vesting Duration",
                  content: `${saleInfo?.vestingDuration / 60 / 1000} minutes`,
                },
              ]}
            />
            <IWCardOneColumn
              title="Your Stats"
              data={[
                {
                  title: "Allocation",
                  content: `${saleInfo?.buyerInfo?.purchasedAmount} INW`,
                },
                {
                  title: "Unlocked Amount",
                  content: `${formatNumDynDecimal(
                    saleInfo?.buyerInfo?.purchasedAmount.replaceAll(",", "") -
                      saleInfo?.unclaimAmount?.replaceAll(",", "")
                  )} INW`,
                },
                {
                  title: "Claimed Amount",
                  content: `${saleInfo?.buyerInfo?.claimedAmount} INW`,
                },
                // { title: "In Circulation: ", content: `${inwInCur} INW` },
                {
                  title: "Claimable Amount",
                  content: `${saleInfo?.unclaimAmount} INW`,
                },
              ]}
            /> */}
          <Button
            w="full"
            mt="20px"
            onClick={claimPrivateInw}
            disabled={!(+saleInfo?.unclaimAmount > 0)}
          >
            Claim INW
          </Button>
        </>
      ),
      isDisabled: false,
    },
    {
      label: <>Public Sale</>,
      component: (
        <IWCard
          w="full"
          variant="outline"
          title={
            <Flex justifyContent={"space-between"}>
              <Heading as="h4" size="h4" lineHeight="25px">
                Acquire INW Tokens
              </Heading>
              <Flex>
                {saleInfo?.endTimeSale ? (
                  !isSaleEnded ? (
                    <>
                      Sale end in:{" "}
                      <Text paddingLeft={"4px"}>
                        <IWCountDown date={+saleInfo?.endTimeSale} />{" "}
                      </Text>{" "}
                    </>
                  ) : (
                    <>Sale Ended!</>
                  )
                ) : (
                  ""
                )}
              </Flex>
            </Flex>
          }
        >
          <IWCard mt="16px" w="full" variant="solid">
            <Stack
              w="100%"
              spacing="20px"
              direction={{ base: "column" }}
              align={{ base: "column", xl: "center" }}
            >
              <IWInput
                value={inwBuyAmount}
                onChange={({ target }) => setInwBuyAmount(target.value)}
                type="number"
                placeholder="Enter INW amount"
                inputRightElementIcon={
                  <Heading as="h5" size="h5" fontWeight="semibold">
                    INW
                  </Heading>
                }
              />

              <IWInput
                value={formatNumDynDecimal(inwBuyAmount * parseFloat(inwPrice))}
                isDisabled={true}
                placeholder="0.000000000"
                inputRightElementIcon={<AzeroLogo />}
              />
              <Flex
                mt={{ base: "15px", lg: "0px" }}
                w="full"
                justifyContent="space-between"
              >
                <Text textAlign="left" fontSize="md" lineHeight="28px">
                  Price: {inwPrice} INW / Azero
                </Text>
                <Text textAlign="left" fontSize="md" lineHeight="28px">
                  INW Available to acquire: {availableMint}
                </Text>
              </Flex>

              <Button
                w="full"
                onClick={inwPublicMintHandler}
                disabled={disableBuyBtn}
              >
                Buy INW
              </Button>
            </Stack>
          </IWCard>
        </IWCard>
      ),
      isDisabled: false,
    },
  ];

  return (
    <>
      {/* <SectionContainer
        mt={{ base: "0px", xl: "20px" }}
        title="Faucet"
        description={
          <span>
            Get some test tokens into your account. To get some TZERO, please
            visit{" "}
            <Link
              isExternal
              color="text.1"
              href="https://faucet.test.azero.dev"
            >
              https://faucet.test.azero.dev
            </Link>
          </span>
        }
      >
        <Stack
          w="full"
          spacing="30px"
          alignItems="start"
          direction={{ base: "column", lg: "row" }}
        >
          <IWCardOneColumn title="My Account" data={accountInfo} />

          <IWCard w="full" variant="outline" title="Get Test Tokens">
            <IWCard mt="16px" w="full" variant="solid">
              <Stack
                w="100%"
                spacing="20px"
                direction={{ base: "column", xl: "row" }}
                align={{ base: "column", xl: "center" }}
              >
                <Select
                  // isDisabled={accountInfoLoading}
                  id="token"
                  placeholder="Select token"
                  onChange={({ target }) =>
                    setSelectedContractAddress(target.value)
                  }
                >
                  {allTokensList?.map((token, idx) => (
                    <option key={idx} value={token.contractAddress}>
                      {token?.symbol} ({token?.name}) -{" "}
                      {addressShortener(token?.contractAddress)}
                    </option>
                  ))}
                </Select>

                <Button
                  // isDisabled={accountInfoLoading}
                  minW="130px"
                  onClick={() => faucetHandler(selectedContractAddress)}
                >
                  Send me
                </Button>
              </Stack>
            </IWCard>
          </IWCard>
        </Stack>{" "}
      </SectionContainer> */}

      <SectionContainer
        mt={{ base: "0px", xl: "8px" }}
        title="INW Tokens"
        description={
          <>
            {/* INW tokens are used as transaction fee. 100M INW tokens are
            available at {inwMintingFee}
            <AzeroLogo w="14px" h="14px" ml="2px" mb="3px" /> per INW. You can
            trade INW on PanoramaSwap in due time. */}
            INW will be airdropped to ArtZero's Early Contributors; Public Sale
            Participants; and Validator Stakers after 18th April 2023{" "}
            <Link
              isExternal
              fontWeight="400"
              color={"text.1"}
              _hover={{ color: "text.2" }}
              href={"https://twitter.com/inkwhale_net"}
            >
              Check out Twitter for more information
            </Link>
          </>
        }
      >
        <Stack
          w="full"
          spacing="30px"
          alignItems="start"
          direction={{ base: "column", lg: "row" }}
        >
          <IWCardOneColumn
            title="Ink Whale Token"
            data={[
              { title: "Token Symbol", content: "INW" },
              {
                title: "Contract Address",
                content: <AddressCopier address={inwContractAddress} />,
              },
              { title: "Max Supply", content: `${inwTotalSupply} INW` },
              // { title: "In Circulation: ", content: `${inwInCur} INW` },
              { title: "Your Balance: ", content: `${inwBalance} INW` },
            ]}
          />
          <Box w={"full"}>
            <SaleTab
              tabsData={tabsData}
              tabIndex={tabIndex}
              onChangeTab={(index) => {
                setTabIndex(index);
              }}
            />
          </Box>
        </Stack>
      </SectionContainer>
    </>
  );
}
