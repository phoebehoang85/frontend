// "12,345" (string) or 12,345 (string) -> 12345 (number)
export const formatChainStringToNumber = (str) => {
  return parseFloat(str.replace(/,/g, "").replace(/"/g, ""));
};

export const addressShortener = (addr = "", digits = 4) => {
  digits = 2 * digits >= addr.length ? addr.length : digits;
  return `${addr.substring(0, digits)}...${addr.slice(-digits)}`;
};
