import { QuestionOutlineIcon } from "@chakra-ui/icons";
import {
  Circle,
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { GoStar } from "react-icons/go";
import { useHistory } from "react-router-dom";

export function IWTable({ tableHeader, tableBody, mode }) {
  console.log("mode", mode);
  const history = useHistory();

  const formatData = (itemObj, header) => {
    switch (header) {
      // case "order":
      //   return itemObj[header];

      // case "marketCap":
      //   return (
      //     <>
      //       {useAzeroUnit ? (
      //         <>
      //           {formatNumDynamicDecimal(
      //             itemObj["nft_count"] * itemObj["floorPrice"]
      //           )}
      //           <TagRightIcon as={AzeroIcon} />
      //         </>
      //       ) : (
      //         <>
      //           ${" "}
      //           {formatNumDynamicDecimal(
      //             azeroPrice * itemObj["nft_count"] * itemObj["floorPrice"],
      //             2
      //           )}{" "}
      //         </>
      //       )}
      //     </>
      //   );

      // case "floorPrice":
      //   return (
      //     <>
      //       {useAzeroUnit ? (
      //         <>
      //           {formatNumDynamicDecimal(itemObj[header])}
      //           <TagRightIcon as={AzeroIcon} />
      //         </>
      //       ) : (
      //         <>$ {formatNumDynamicDecimal(azeroPrice * itemObj[header], 2)}</>
      //       )}
      //     </>
      //   );

      // case "name":
      //   return (
      //     <Flex alignItems="center">
      //       <ImageCloudFlare
      //         h="50px"
      //         w="50px"
      //         mr="20px"
      //         size="100"
      //         src={itemObj?.avatarImage}
      //       />

      //       <Flex direction="column" alignItems="flex-start">
      //         <Heading
      //           fontSize="16px"
      //           cursor="pointer"
      //           _hover={{ color: "brand.blue" }}
      //           onClick={() => {
      //             history.push(`/collection/${itemObj.nftContractAddress}`);
      //           }}
      //         >
      //           {itemObj[header]}
      //         </Heading>
      //         <Text color="#7ae7ff" fontSize="16px" mt="4px">
      //           {itemObj["nft_count"]} NFTs
      //         </Text>
      //       </Flex>
      //     </Flex>
      //   );

      // case "volume":
      //   return (
      //     <>
      //       {useAzeroUnit ? (
      //         <>
      //           <Box>
      //             {formatNumDynamicDecimal(itemObj[header])}{" "}
      //             <TagRightIcon as={AzeroIcon} />
      //           </Box>

      //           {/* <Box mt="6px" color="#34B979" fontSize="16px">
      //         +{itemObj[header]["percent"]}%
      //       </Box> */}
      //         </>
      //       ) : (
      //         <>
      //           <Box>
      //             $ {formatNumDynamicDecimal(azeroPrice * itemObj[header], 2)}
      //           </Box>

      //           {/* <Box mt="6px" color="#34B979" fontSize="16px">
      //         +{itemObj[header]["percent"]}%
      //       </Box> */}
      //         </>
      //       )}
      //     </>
      //   );

      // case "stakedAmount":
      //   return (
      //     <Text textAlign="left">
      //       {formatNumDynamicDecimal(itemObj[header])} NFT
      //       {1 * itemObj[header] > 1 ? "s" : ""}{" "}
      //     </Text>
      //   );

      case "poolName":
        return (
          <Td>
            <Flex
              w="full"
              justify={{ base: "start" }}
              alignItems={{ base: "center" }}
            >
              <Circle w="30px" h="30px" bg="white">
                <Image src={itemObj["poolLogo"]} alt="logo-subwallet" />
              </Circle>

              <Text ml="8px">{itemObj[header]}</Text>
            </Flex>
          </Td>
        );

      case "poolNameNFT":
        return (
          <Td>
            <Flex
              w="full"
              justify={{ base: "start" }}
              alignItems={{ base: "center" }}
            >
              <Circle w="30px" h="30px" bg="white">
                <Image src={itemObj["poolLogo"]} alt="logo-subwallet" />
              </Circle>

              <Text ml="8px">{itemObj[header]}</Text>
            </Flex>
          </Td>
        );

      case "myStake":
        return (
          <Td>
            <Flex alignItems="center">
              <Text mr="8px">{itemObj[header]}</Text>
              {itemObj["isMyStake"] && <GoStar color="#FFB800" />}
            </Flex>
          </Td>
        );

      default:
        return (
          <Td>
            <Text textAlign="left">{itemObj[header]}</Text>
          </Td>
        );
    }
  };

  return (
    <TableContainer
      w="full"
      color="text.1"
      fontSize="md"
      fontWeight="600"
      lineHeight="20px"
      borderRadius="10px"
      border="1px solid #E3DFF3"
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            {tableHeader?.map(({ name, label, hasTooltip, tooltipContent }) => (
              <Th
                key={name}
                h="60px"
                bg="bg.5"
                color="text.2"
                fontWeight="400"
                fontSize="16px"
                lineHeight="28px"
                textTransform="none"
              >
                <Flex alignItems="center">
                  {label}
                  {hasTooltip && (
                    <Tooltip fontSize="md" label={tooltipContent}>
                      <QuestionOutlineIcon ml="6px" color="text.2" />
                    </Tooltip>
                  )}
                </Flex>
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {tableBody?.map((itemObj, idx) => {
            return (
              <Fragment key={idx}>
                <Tr
                  h="60px"
                  cursor="pointer"
                  _hover={{ bg: "bg.1" }}
                  // onClick={() => history.push(`/${itemObj?.redirectUrl}`)}
                  onClick={() =>
                    history.push({
                      state: { mode },
                      pathname: `/${itemObj?.redirectUrl}`,
                    })
                  }
                >
                  {tableHeader?.map((i, idx) => {
                    return (
                      <Fragment key={idx}>
                        {formatData(itemObj, i?.name)}
                      </Fragment>
                    );
                  })}
                </Tr>
              </Fragment>
            );
          })}

          {/* {tableBody?.map(
            ({
              poolName,
              poolLogo,
              tvl,
              apr,
              rewardPool,
              expiredIn,
              myStake,
              isMyStake,
            }) => (
              <Tr
                h="60px"
                key={poolName}
                cursor="pointer"
                _hover={{ bg: "bg.1" }}
                onClick={() => history.push(`pools/${poolName}`)}
              >
                <Td>
                  <Flex
                    w="full"
                    justify={{ base: "start" }}
                    alignItems={{ base: "center" }}
                  >
                    <Circle w="30px" h="30px" bg="white">
                      <Image src={poolLogo} alt="logo-subwallet" />
                    </Circle>

                    <Text ml="8px">{poolName}</Text>
                  </Flex>
                </Td>
                <Td>{tvl}</Td>
                <Td>{apr}</Td>
                <Td>{rewardPool}</Td>
                <Td>{expiredIn}</Td>
                <Td>
                  <Flex alignItems="center">
                    <Text mr="8px">{myStake}</Text>
                    {isMyStake && <GoStar color="#FFB800" />}
                  </Flex>
                </Td>
              </Tr>
            )
          )} */}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
