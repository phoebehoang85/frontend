import BN from "bn.js";
import toast from "react-hot-toast";
import { web3FromSource } from "../wallets/extension-dapp";

import {
  isValidAddressPolkadotAddress,
} from "../utils";
import { ContractPromise } from "@polkadot/api-contract";

let contract;

export const setAZTContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};

async function publicMint(caller_account,source,token_amount, value) {
  if (!contract || !caller_account) {
    console.log("invalid",contract,caller_account);
    return null;
  }

  let unsubscribe ;

  const gasLimit = -1;

  const totalAmount = new BN(token_amount * 10 ** 6).mul(new BN(10 ** 6)).toString();
  console.log(totalAmount,value);

  const injector = await web3FromSource(source);
  await contract.tx["tokenMintCapTrait::publicMint"]
    ({ gasLimit, value },
    totalAmount)
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
              `Acquiring WAL Tokens ...`
            );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
  return unsubscribe;
}
//
// async function freeCap(caller_account) {
//   if (!contract) {
//     console.log("invalid",contract);
//     return null;
//   }
//   if (!caller_account) {
//     caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
//   }
//
//   const gasLimit = -1;
//   const azero_value = 0;
//   try {
//     const { result, output } = await contract.query.freeCap(
//       caller_account,
//       { value: azero_value, gasLimit }
//     );
//     if (result.isOk) {
//       // console.log(output.toHuman());
//       const a = output.toHuman().replace(/\,/g, "");
//       return a / 10 ** 12;
//     }
//   } catch (e) {
//     console.log(e);
//     return null;
//   }
//
//   return null;
// }
//total_free_minted
async function totalFreeMinted(caller_account) {
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
    const { result, output } = await contract.query.totalFreeMinted(
      caller_account,
      { value: azero_value, gasLimit }
    );
    if (result.isOk) {
      console.log(output.toHuman());
      const a = output.toHuman().replace(/\,/g, "");
      return a / 10 ** 12;
    }
  } catch (e) {
    console.log(e);
    return null;
  }

  return null;
}
async function cap(caller_account) {
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
    const { result, output } = await contract.query["tokenMintCapTrait::cap"](
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
async function mintingCap(caller_account) {
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
    const { result, output } = await contract.query["tokenMintCapTrait::mintingCap"](
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

async function totalMinted(caller_account) {
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
    const { result, output } = await contract.query["tokenMintCapTrait::totalMinted"](
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


async function mintingFee(caller_account) {
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
    const { result, output } = await contract.query["tokenMintCapTrait::mintingFee"](
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
    toast.error(`invalid account`);
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

async function isMinted(caller_account,account) {
  if (!contract || !caller_account) {
    console.log("invalid",contract,caller_account);
    return null;
  }

  const gasLimit = -1;
  const azero_value = 0;
  try {
    const { result, output } = await contract.query.isMinted(
      caller_account,
      { value: azero_value, gasLimit },
      account
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

const azt_calls = {
  balanceOf,
  cap,
  mintingFee,
  // freeMint,
  publicMint,
  // freeCap,
  isMinted,
  totalFreeMinted,
  totalSupply,
  totalMinted,
  mintingCap
};

export default azt_calls;
