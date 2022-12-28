import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex } from '@polkadot/util';
import axios from "axios";
import numeral from 'numeral';

export function randomString(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function shortenNumber(number) {
  return nFormatter(number, 1);
}
function nFormatter(num, digits) {
  var si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
}
export function isValidImage(imageUrl) {
  try {
    fetch(imageUrl).then((res) => {
      if (res.status === 200) return true;
      return false;
    });
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function convertStringToPrice(stringPrice) {
  try {
    /* eslint-disable no-useless-escape */
    const a = stringPrice.replace(/\,/g, '');
    // let price = new BN(a, 10).div(new BN(10 ** 6)).toNumber();
    return a / 10 ** 12;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export function convertStringToDateTime(stringTimeStamp) {
  /* eslint-disable no-useless-escape */
  const a = stringTimeStamp.replace(/\,/g, '');
  const dateObject = new Date(parseInt(a));
  return dateObject.toLocaleString(); //2019-12-9 10:30:15
}

export const IPFS_BASE_URL = 'https://artzeronft.infura-ipfs.io/ipfs';

export async function getCloudFlareImage(imageHash = '', size = 500) {
  const fallbackURL = `${IPFS_BASE_URL}/${imageHash.replace('ipfs://', '')}`;

  const ret = `https://api.artzero.io/getImage?input=${imageHash}&size=${size}&url=${fallbackURL}`;

  let result;

  try {
    const response = await axios.get(ret);
    result = response?.data || fallbackURL;
  } catch (error) {
    console.error('getCloudFlareImage error', error.message);
    result = fallbackURL;
  }

  return result;
}

export function isValidAddressPolkadotAddress(address) {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));

    return true;
  } catch (error) {
    // console.log(error);
    return false;
  }
}

export function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export const convertTimeStamp = (input) => {
  var d = new Date(input);
  // console.log(input,d);
  return (
    twoDigit(d.getDate()) +
    '/' +
    twoDigit(d.getMonth() + 1) +
    '/' +
    d.getFullYear() +
    ' ' +
    twoDigit(d.getHours()) +
    ':' +
    twoDigit(d.getMinutes()) +
    ':' +
    twoDigit(d.getSeconds())
  );
};

export const secondsToTime = (secs) => {
  let hours = Math.floor(secs / (60 * 60));

  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);

  let obj = {
    h: twoDigit(hours),
    m: twoDigit(minutes),
    s: twoDigit(seconds),
  };
  return obj;
};
export const secondsToTimeString = (seconds, showSecond = true) => {
  var y = parseInt(seconds / (365 * 3600 * 24));
  var d = parseInt((seconds % (365 * 3600 * 24)) / (3600 * 24));
  var h = parseInt((seconds % (3600 * 24)) / 3600);
  var m = parseInt((seconds % 3600) / 60);
  var s = parseInt(seconds % 60);
  // console.log(seconds,y,d,h,m,s);
  let obj = {
    y: twoDigit(y),
    d: twoDigit(d),
    h: twoDigit(h),
    m: twoDigit(m),
    s: twoDigit(s),
  };
  if (!showSecond) return `${obj.d}d ${obj.h}h ${obj.m}m`;
  else return `${obj.d}d ${obj.h}h ${obj.m}m ${obj.s}s`;
};

export const convertTimeStampNoTime = (input) => {
  if (input <= 0) return '';
  var d = new Date(input);
  return (
    twoDigit(d.getDate()) +
    '/' +
    twoDigit(d.getMonth() + 1) +
    '/' +
    d.getFullYear()
  );
};

export const twoDigit = (myNumber) => {
  if (parseInt(myNumber) < 10)
    return ('0' + myNumber).slice(-2);
  else {
    return myNumber;
  }
};

export const twoDigitTime = (time) => {
  if (time < 10) return '0' + time;
  else return time + '';
};

export const truncateStr = (str, n = 6) => {
  if (!str) return '';
  return str.length > n
    ? str.substr(0, n - 1) + '...' + str.substr(str.length - n, str.length - 1)
    : str;
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatNumDynamicDecimal = (num = 0, dec = 6) => {
  const number = parseInt(num * 10 ** dec) / 10 ** dec;
  const numStr = number.toString();
  const dotIdx = numStr.indexOf('.');

  if (dotIdx === -1) {
    return numeral(numStr).format('0,0');
  }

  const intPart = numeral(numStr.slice(0, dotIdx)).format('0,0');
  const decPart = numStr.slice(dotIdx + 1, numStr.length);

  return intPart + `${dotIdx === -1 ? '' : `.${decPart}`}`;
};
