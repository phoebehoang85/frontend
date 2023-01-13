import axios from "axios";

//const baseURL = "http://localhost:3412";

const client = async (
  method,
  url,
  options = {},
  baseURL = process.env.REACT_APP_API_BASE_URL
) => {
  const headers = {
    Accept: "*/*",
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const urlencodedOptions = new URLSearchParams(
    Object.entries(options)
  ).toString();

  const { data } = await axios({
    baseURL,
    url,
    method,
    headers,
    timeout: 30000,
    data: urlencodedOptions,
  });

  if (data?.status === "FAILED") {
    console.log("error FAILED @ xx>>", url, data?.message);
  }

  return data;
};

export const APICall = {
  getFaucetTokensList: async () => {
    return await client("POST", "/getTokens", {});
  },

  getPoolsList: async () => {
    return await client("POST", "/getPools", {});
  },

  getNftLPList: async () => {
    const ret = await client("POST", "/getNFTPools", {
      // sort: 1,
      // limit: 5,
      // offset: 5,
      // showZeroPool: true,
    });

    return ret;
  },

  getTokenLPList: async () => {
    const ret = await client("POST", "/getLPPools", {
      // sort: 1,
      // limit: 5,
      // offset: 5,
      // showZeroPool: true,
    });

    return ret;
  },

  askBEupdate: async ({ type, poolContract }) => {
    const ret = await client("POST", "/update", { type, poolContract });

    return ret;
  },

  // ARTZERO BE CALL
  getCollectionByAddressFromArtZero: async ({ collection_address }) => {
    const ret = await client(
      "POST",
      "/getCollectionByAddress",
      {
        collection_address,
      },
      process.env.REACT_APP_ARTZERO_API_BASE_URL
    );

    return ret;
  },

  getNFTsByOwnerAndCollectionFromArtZero: async ({
    collection_address,
    owner,
  }) => {
    const ret = await client(
      "POST",
      "/getNFTsByOwnerAndCollection",
      {
        collection_address,
        owner,
      },
      process.env.REACT_APP_ARTZERO_API_BASE_URL
    );

    return ret;
  },

  getNftByIdFromArtZero: async ({ collection_address, token_id }) => {
    const ret = await client(
      "POST",
      "/getNFTByID",
      {
        collection_address,
        token_id,
      },
      process.env.REACT_APP_ARTZERO_API_BASE_URL
    );

    return ret;
  },

  askBEupdateNFTFromArtZero: async ({ collection_address, token_id }) => {
    const ret = await client(
      "POST",
      "/updateNFT",
      {
        collection_address,
        token_id,
      },
      process.env.REACT_APP_ARTZERO_API_BASE_URL
    );

    return ret;
  },
};
