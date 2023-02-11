import BN from "bn.js";
import toast from "react-hot-toast";
import { web3FromSource } from "../wallets/extension-dapp";

import {
  isValidAddressPolkadotAddress,
} from "../utils";
import { ContractPromise } from "@polkadot/api-contract";

let contract;

function setPSP22Contract(api, data) {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};

async function balanceOf(caller_account,account) {
  if (!contract) {
    console.log("invalid",contract);
    return null;
  }
  if (!caller_account) {
    caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
  }

  const gasLimit = -1;
  const azero_value = 0;
  if (!isValidAddressPolkadotAddress(account)) {
    //toast.error(`invalid account`);
    return;
  }
  try {
    const { result, output } = await contract.query["psp22::balanceOf"](
      caller_account,
      { value: azero_value, gasLimit },
      account
    );
    if (result.isOk) {
      // console.log(output.toHuman());
      const a = output.toHuman().replace(/\,/g, "");
      return a / 10 ** 12;
    }
  } catch (e) {
    console.log(e);
    return null;
  }

  return null;
}
async function totalSupply(caller_account) {
  if (!contract) {
    console.log("invalid",contract);
    return null;
  }
  if (!caller_account) {
    caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
  }

  const gasLimit = -1;
  const azero_value = 0;
  try {
    const { result, output } = await contract.query["psp22::totalSupply"](
      caller_account,
      { value: azero_value, gasLimit }
    );
    if (result.isOk) {
      // console.log(output.toHuman());
      const a = output.toHuman().replace(/\,/g, "");
      return a / 10 ** 12;
    }
  } catch (e) {
    console.log(e);
    return null;
  }

  return null;
}

async function tokenName(caller_account) {
  if (!contract) {
    console.log("invalid",contract);
    return null;
  }
  if (!caller_account) {
    caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
  }

  const gasLimit = -1;
  const azero_value = 0;

  try {
    const { result, output } = await contract.query["psp22Metadata::tokenName"](
      caller_account,
      { value: azero_value, gasLimit }
    );
    if (result.isOk) {
      return output.toHuman();
    }
  } catch (e) {
    console.log(e);
    return null;
  }

  return null;
}

async function tokenSymbol(caller_account) {
  if (!contract) {
    console.log("invalid",contract);
    return null;
  }
  if (!caller_account) {
    caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
  }

  const gasLimit = -1;
  const azero_value = 0;

  try {
    const { result, output } = await contract.query["psp22Metadata::tokenSymbol"](
      caller_account,
      { value: azero_value, gasLimit }
    );
    if (result.isOk) {
      return output.toHuman();
    }
  } catch (e) {
    console.log(e);
    return null;
  }

  return null;
}

async function tokenDecimals(caller_account) {
  if (!contract) {
    console.log("invalid",contract);
    return null;
  }
  if (!caller_account) {
    caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
  }

  const gasLimit = -1;
  const azero_value = 0;

  try {
    const { result, output } = await contract.query["psp22Metadata::tokenDecimals"](
      caller_account,
      { value: azero_value, gasLimit }
    );
    if (result.isOk) {
      return output.toHuman();
    }
  } catch (e) {
    console.log(e);
    return null;
  }

  return null;
}

async function transfer(caller_account, source, to, amount) {
  if (!contract || !caller_account) {
    console.log("invalid",contract,caller_account);
    return null;
  }

  let unsubscribe ;

  const gasLimit = -1;
  const value = 0;

  const totalAmount = new BN(amount * 10 ** 6).mul(new BN(10 ** 6)).toString();
  console.log(contract);
  console.log(caller_account);
  console.log(totalAmount);
  const injector = await web3FromSource(source);
  await contract.tx["psp22::transfer"]({ gasLimit, value },
    to, totalAmount, []
  )
    .signAndSend(
      caller_account,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError", dispatchError.toString());
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman())[0];
          if (statusText === "0")
            toast.success(
              `Transfering Tokens ...`
            );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
  return unsubscribe;
}

async function burn(caller_account, source, amount) {
  if (!contract || !caller_account) {
    console.log("invalid",contract,caller_account);
    return null;
  }

  let unsubscribe ;

  const gasLimit = -1;
  const value = 0;

  const totalAmount = new BN(amount * 10 ** 6).mul(new BN(10 ** 6)).toString();
  console.log(contract);
  console.log(caller_account);
  console.log(totalAmount);
  const injector = await web3FromSource(source);
  await contract.tx["psp22Burnable::burn"]({ gasLimit, value },
    caller_account, totalAmount
  )
    .signAndSend(
      caller_account,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError", dispatchError.toString());
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman())[0];
          if (statusText === "0")
            toast.success(
              `Burning Tokens ...`
            );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
  return unsubscribe;
}

async function approve(caller_account, source, spender, amount) {
  if (!contract || !caller_account) {
    console.log("invalid",contract,caller_account);
    return null;
  }

  let unsubscribe ;

  const gasLimit = -1;
  const value = 0;

  const totalAmount = new BN(amount * 10 ** 6).mul(new BN(10 ** 6)).toString();

  const injector = await web3FromSource(source);
  await contract.tx["psp22::approve"]({ gasLimit, value },
    spender,
    totalAmount
  )
    .signAndSend(
      caller_account,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError", dispatchError.toString());
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman())[0];
          if (statusText === "0")
            toast.success(
              `Approving Tokens ...`
            );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
  return unsubscribe;
}

async function faucet(caller_account, source) {
  if (!contract || !caller_account) {
    console.log("invalid",contract,caller_account);
    return null;
  }

  let unsubscribe ;

  const gasLimit = -1;
  const value = 0;

  const injector = await web3FromSource(source);
  await contract.tx.faucet({ gasLimit, value }
  )
    .signAndSend(
      caller_account,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError", dispatchError.toString());
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman())[0];
          if (statusText === "0")
            toast.success(
              `Sending Tokens ...`
            );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
  return unsubscribe;
}

const contract_calls = {
  balanceOf,
  tokenName,
  tokenSymbol,
  tokenDecimals,
  setPSP22Contract,
  transfer,
  burn,
  totalSupply,
  approve,
  faucet
};

export default contract_calls;
