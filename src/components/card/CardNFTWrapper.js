import {
  Button,
  Heading,
  Image,
  Square,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

export default function IWCardNFTWrapper(props) {
  const {
    data,
    // ...rest
  } = props;
  // const styles = useStyleConfig("IWCard", { variant });

  return (
    <>
      <Wrap spacing={{ base: "10px", md: "30px" }} w="full">
        {data?.map(({ nftName, action, imageUrl }, idx) => {
          return (
            <WrapItem>
              <VStack
                spacing="12px"
                key={idx}
                borderWidth="1px"
                borderRadius="10px"
                p={{ base: "10px", lg: "24px" }}
                w={{ base: "160px", sm: "170px", md: "270px" }}
              >
                <Square
                  maxW="222px"
                  maxH="222px"
                  borderRadius="10px"
                  overflow="hidden"
                >
                  <Image w="full" h="full" src={imageUrl} alt="nft-image" />
                </Square>

                <Heading
                  w="full"
                  as="h4"
                  size="h4"
                  mt="2px"
                  textAlign="left"
                  fontWeight="semibold"
                  lineHeight={{ base: "20px", lg: "25px" }}
                  fontSize={{ base: "16px", lg: "20px" }}
                >
                  {nftName}
                </Heading>

                <Button w="full">{action}</Button>
              </VStack>
            </WrapItem>
          );
        })}
      </Wrap>
    </>
  );
}
