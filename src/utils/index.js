import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, isHex } from "@polkadot/util";
import { formatBalance } from "@polkadot/util";
import BN from "bn.js";
import numeral from "numeral";

// "12,345" (string) or 12,345 (string) -> 12345 (number)
export const formatChainStringToNumber = (str) => {
  return parseFloat(str.replace(/,/g, "").replace(/"/g, ""));
};
export const formatQueryResultToNumber = (result, chainDecimals = 12) => {
  const ret = result?.toHuman()?.replaceAll(",", "");

  const formattedStrBal = formatBalance(ret, {
    withSi: false,
    forceUnit: "-",
    decimals: chainDecimals,
  });

  return formattedStrBal;
};

export const addressShortener = (addr = "", digits = 4) => {
  digits = 2 * digits >= addr.length ? addr.length : digits;
  return `${addr.substring(0, digits)}...${addr.slice(-digits)}`;
};

export function isAddressValid(address) {
  try {
    const formattedAddress = isHex(address)
      ? hexToU8a(address)
      : decodeAddress(address);

    encodeAddress(formattedAddress);

    return true;
  } catch (error) {
    // console.log(error);
    return false;
  }
}

export function delay(sec) {
  return new Promise((res) => setTimeout(res, sec));
}

export const formatNumToBN = (number = 0) => {
  return new BN(number * 10 ** 6).mul(new BN(10 ** 6)).toString();
};

export const formatNumDynDecimal = (num = 0, dec = 4) => {
  const number = parseInt(num * 10 ** dec) / 10 ** dec;
  const numStr = number.toString();
  const dotIdx = numStr.indexOf(".");

  if (dotIdx === -1) {
    return numeral(numStr).format("0,0");
  }

  const intPart = numeral(numStr.slice(0, dotIdx)).format("0,0");
  const decPart = numStr.slice(dotIdx + 1, numStr.length);

  return intPart + `${dotIdx === -1 ? "" : `.${decPart}`}`;
};
