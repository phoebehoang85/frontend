import BN from 'bn.js';
import toast from 'react-hot-toast';
import { web3FromSource } from '../wallets/extension-dapp';

import { isValidAddressPolkadotAddress } from '../utils';
import { ContractPromise } from '@polkadot/api-contract';

let contract;

export const setNFTPoolGeneratorContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};

async function newPool(
  caller_account,
  source,
  contract_owner,
  psp34_contract_address,
  psp22_contract_address,
  multiplier,
  decimal,
  duration,
  startTime
) {
  if (!contract || !caller_account) {
    console.log('invalid', contract, caller_account);
    return null;
  }

  let unsubscribe;

  const gasLimit = -1;
  const value = 0;//new BN(10 * 10 ** 6).mul(new BN(10 ** 6)).toString();
  const multiplier_input = new BN(multiplier * 10 ** decimal).toString();
  const injector = await web3FromSource(source);
  await contract.tx
    .newPool(
      { gasLimit, value },
      contract_owner,
      psp34_contract_address,
      psp22_contract_address,
      multiplier_input,
      duration,
      startTime
    )
    .signAndSend(
      caller_account,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            toast.error(`There is some error with your request`);
          } else {
            console.log('dispatchError', dispatchError.toString());
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman())[0];
          if (statusText === '0') {
            toast.success(`Creating NFT Pool ...`);
          } else {
            if (status?.isFinalized) {
              toast.success(
                `NFT Pool created. It takes up to 10s for the token to show in the list`
              );
            }
          }
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log('e', e));
  return unsubscribe;
}

async function getPoolCount(caller_account) {
  if (!contract) {
    console.log('invalid', contract);
    return null;
  }
  if (!caller_account) {
    caller_account = '5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc';
  }

  const gasLimit = -1;
  const azero_value = 0;
  try {
    const { result, output } = await contract.query.getPoolCount(
      caller_account,
      { value: azero_value, gasLimit }
    );
    if (result.isOk) {
      // console.log(output.toHuman());
      const a = output.toHuman().replace(/\,/g, '');
      return a;
    }
  } catch (e) {
    console.log(e);
    return null;
  }

  return null;
}
async function getPoolCountByOwner(caller_account, owner) {
  if (!contract) {
    console.log('invalid', contract);
    return null;
  }
  if (!caller_account) {
    caller_account = '5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc';
  }

  if (!isValidAddressPolkadotAddress(owner)) {
    // toast.error(`invalid account`);
    return;
  }

  const gasLimit = -1;
  const azero_value = 0;
  try {
    const { result, output } = await contract.query.getPoolCountByOwner(
      caller_account,
      { value: azero_value, gasLimit },
      owner
    );
    if (result.isOk) {
      // console.log(output.toHuman());
      const a = output.toHuman().replace(/\,/g, '');
      return a;
    }
  } catch (e) {
    console.log(e);
    return null;
  }

  return null;
}

async function getPoolByOwner(caller_account, owner, index) {
  if (!contract) {
    console.log('invalid', contract);
    return null;
  }
  if (!caller_account) {
    caller_account = '5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc';
  }

  if (!isValidAddressPolkadotAddress(owner)) {
    // toast.error(`invalid account`);
    return;
  }

  const gasLimit = -1;
  const azero_value = 0;
  try {
    const { result, output } = await contract.query.getPoolByOwner(
      caller_account,
      { value: azero_value, gasLimit },
      owner,
      index
    );
    if (result.isOk) {
      // console.log(output.toHuman());
      const a = output.toHuman().replace(/\,/g, '');
      return a;
    }
  } catch (e) {
    console.log(e);
    return null;
  }

  return null;
}

async function getCreationFee(caller_account) {
  if (!contract) {
    console.log('invalid', contract);
    return null;
  }
  if (!caller_account) {
    caller_account = '5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc';
  }

  const gasLimit = -1;
  const azero_value = 0;
  try {
    const { result, output } = await contract.query.getCreationFee(
      caller_account,
      { value: azero_value, gasLimit }
    );
    if (result.isOk) {
      // console.log(output.toHuman());
      const a = output.toHuman().replace(/\,/g, '');
      return a / 10 ** 12;
    }
  } catch (e) {
    console.log(e);
    return null;
  }

  return null;
}

async function getPool(caller_account, index) {
  if (!contract) {
    console.log('invalid', contract);
    return null;
  }
  if (!caller_account) {
    caller_account = '5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc';
  }

  const gasLimit = -1;
  const azero_value = 0;
  try {
    const { result, output } = await contract.query.getPool(
      caller_account,
      { value: azero_value, gasLimit },
      index
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

const contract_calls = {
  newPool,
  getPoolCount,
  getPool,
  getPoolCountByOwner,
  getPoolByOwner,
  getCreationFee,
};

export default contract_calls;
