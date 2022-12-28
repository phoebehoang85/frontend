import BN from "bn.js";
import toast from "react-hot-toast";
import { web3FromSource } from "../wallets/extension-dapp";

import {
  isValidAddressPolkadotAddress,
} from "../utils";
import { ContractPromise } from "@polkadot/api-contract";

let contract;

export const setPSP34Contract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};

async function approve(
  caller_account,
  source,
  operator_address,
  token_id,
  is_approve) {
    if (!contract || !caller_account) {
      console.log("invalid",contract,caller_account);
      return null;
    }

    let unsubscribe ;

    const gasLimit = -1;

    const injector = await web3FromSource(source);
    await contract.tx['psp34::approve'](
        { gasLimit, value:0 },
        operator_address,
        token_id,
        is_approve
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
                `Approve NFT ...`
              );
          }
        }
      )
      .then((unsub) => (unsubscribe = unsub))
      .catch((e) => console.log("e", e));
    return unsubscribe;
}

const contract_calls = {
  approve,
  setPSP34Contract
};

export default contract_calls;
