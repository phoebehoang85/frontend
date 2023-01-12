import { Flex, useClipboard } from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import { addressShortener } from "utils";

export default function AddressCopier({ address, truncated = true }) {
  const { onCopy } = useClipboard(address);

  const handleCopy = () => {
    toast.success("Address copied!");
    onCopy();
  };

  return (
    <Flex
      cursor="pointer"
      alignItems="center"
      onClick={handleCopy}
      _hover={{ color: "#7ae7ff" }}
    >
      {truncated ? addressShortener(address) : address}
    </Flex>
  );
}
