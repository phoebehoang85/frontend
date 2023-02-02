import { ContractPromise } from "@polkadot/api-contract";
import { web3FromSource } from "@polkadot/extension-dapp";
import { formatBalance } from "@polkadot/util";
import { toastMessages } from "constants";
import { toast } from "react-hot-toast";

let wsApi;

export function initialApi(a) {
  wsApi = a;
}
// getEstimatedGas
export async function getEstimatedGas(
  address,
  contract,
  value,
  queryName,
  ...args
) {
  const fetchGas = async () => {
    let ret = -1;
    // let gasLimit = 6946816000 * 5;

    try {
      const { gasRequired, result, output } = await contract.query[queryName](
        address,
        { gasLimit: ret, storageDepositLimit: null, value },
        ...args
      );

      if (output?.isErr) {
        toast.error("error: ", output.value.toString());
        console.log("error getEstimatedGas xx>>", output.value.toString());
        return output.value.toString();
      }

      if (result?.isOk) {
        ret = gasRequired.toString();
      }
    } catch (error) {
      console.log("error fetchGas xx>>", error.message);
    }

    return ret;
  };

  let result;

  await toast.promise(
    fetchGas().then((data) => (result = data)),
    {
      success: `Estimated transaction fee...`,
      error: "Could not fetching gas!",
    },
    {
      success: {
        duration: 500,
        icon: "🔥",
      },
    }
  );

  return result;
}

export async function execContractQuery(
  callerAddress, // -> currentAccount?.address
  api,
  contractAbi,
  contractAddress,
  value = 0,
  queryName,
  ...args
) {
  const contract = new ContractPromise(wsApi, contractAbi, contractAddress);
  // console.log("execContractQuery", queryName);
  // let gasLimit = 6946816000 * 5;

  try {
    const { result, output } = await contract.query[queryName](
      callerAddress,
      { gasLimit: -1, storageDepositLimit: null, value },
      ...args
    );

    if (result.isOk) {
      return output;
    }
  } catch (error) {
    console.log("@_@ ", queryName, " error >>", error.message);
  }
}

export async function execContractTx(
  caller, // -> currentAccount Object
  api,
  contractAbi,
  contractAddress,
  value = 0,
  queryName,
  ...args
) {
  // NOTE: amount need to convert before passing in
  // const totalAmount = new BN(token_amount * 10 ** 6).mul(new BN(10 ** 6)).toString();
  console.log("execContractTx ", queryName);

  const contract = new ContractPromise(wsApi, contractAbi, contractAddress);

  let unsubscribe;
  let gasLimit = 6946816000 * 5;

  const { signer } = await web3FromSource(caller?.meta?.source);

  gasLimit = await getEstimatedGas(
    caller?.address,
    contract,
    value,
    queryName,
    ...args
  );
  // console.log("gasLimit", gasLimit);
  const txNotSign = contract.tx[queryName]({ gasLimit, value }, ...args);

  await txNotSign
    .signAndSend(caller.address, { signer }, ({ events = [], status }) => {
      if (Object.keys(status.toHuman())[0] === "0") {
        toast.success(`Processing ...`);
      }

      events.forEach(({ event: { method } }) => {
        if (method === "ExtrinsicSuccess" && status.type === "InBlock") {
          toast.success("Successful!");
        } else if (method === "ExtrinsicFailed") {
          toast.error(`${toastMessages.CUSTOM} ${method}.`);
        }
      });
    })
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => {
      console.log("error", error);
      toast.error(`${toastMessages.CUSTOM} ${error}.`);
    });

  return unsubscribe;
}

export async function getAzeroBalanceOfAddress({ api, address }) {
  if (!address || !wsApi) return console.log("acct , wsApi invalid!");
  if (!wsApi) {
    toast.error(toastMessages.ERR_API_CONN);
    return;
  }

  if (!address) {
    toast.error(toastMessages.NO_WALLET);
    return;
  }

  const {
    data: { free: balance, miscFrozen },
  } = await wsApi.query.system.account(address);

  const [chainDecimals] = await wsApi.registry.chainDecimals;

  const formattedStrBal = formatBalance(balance, {
    withSi: false,
    forceUnit: "-",
    decimals: chainDecimals,
  });

  const formattedStrBalMiscFrozen = formatBalance(miscFrozen, {
    withSi: false,
    forceUnit: "-",
    decimals: chainDecimals,
  });

  const formattedNumBal =
    formattedStrBal.replaceAll(",", "") * 1 -
    formattedStrBalMiscFrozen.replaceAll(",", "") * 1;

  return formattedNumBal;
}
