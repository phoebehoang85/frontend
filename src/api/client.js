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
};
