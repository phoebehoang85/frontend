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
import IWCountDown from "components/countdown/CountDown";
import { Fragment } from "react";
import { GoStar } from "react-icons/go";
import { useHistory, useLocation } from "react-router-dom";
import { formatNumDynDecimal } from "utils";
import ImageCloudFlare from "components/image-cf/ImageCF";
import { addressShortener } from "utils";

export function IWTable({ tableHeader, tableBody, mode }) {
  const history = useHistory();
  const location = useLocation();

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
                  onClick={() =>
                    history.push({
                      state: { ...itemObj, mode },
                      pathname: `${location.pathname}/${itemObj?.poolContract}`,
                    })
                  }
                >
                  {tableHeader?.map((i, idx) => {
                    return (
                      <Fragment key={idx}>
                        <Td>{formatDataCellTable(itemObj, i?.name)}</Td>
                      </Fragment>
                    );
                  })}
                </Tr>
              </Fragment>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export const formatDataCellTable = (itemObj, header) => {
  switch (header) {
    case "totalStaked":
      const extPart = `NFT${itemObj[header] > 1 ? "s" : ""}`;
      return (
        <>
          <Text>
            {formatNumDynDecimal(itemObj[header])}{" "}
            {itemObj["NFTtokenContract"] && extPart}
          </Text>
        </>
      );

    case "multiplier":
      return (
        <>
          <Text>{(itemObj[header] / 10 ** 12).toFixed(6)}</Text>
        </>
      );

    case "rewardPool":
      return (
        <>
          <Text>{formatNumDynDecimal(itemObj[header])}</Text>
        </>
      );

    case "startTime":
      return (
        <>
          <IWCountDown date={itemObj[header] + itemObj["duration"] * 1000} />
        </>
      );

    case "apy":
      return (
        <>
          <Text>{itemObj[header] / 100}%</Text>
        </>
      );

    case "poolName":
      return (
        <>
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
        </>
      );

    case "nftInfo":
      return (
        <>
          <Flex
            w="full"
            justify={{ base: "start" }}
            alignItems={{ base: "center" }}
          >
            <ImageCloudFlare
              borderWidth="1px"
              w="40px"
              h="40px"
              size="500"
              alt={header}
              borderRadius="5px"
              src={itemObj[header]?.avatarImage}
            />
            <Text ml="8px">{itemObj[header]?.name}</Text>
          </Flex>
        </>
      );

    case "poolNameNFT":
      return (
        <>
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
        </>
      );

    case "stakeInfo":
      const numberStakeInfo =
        itemObj[header] &&
        formatNumDynDecimal(itemObj[header].stakedValue / 10 ** 12);

      const numberNFTStakeInfo =
        itemObj[header] && formatNumDynDecimal(itemObj[header].stakedValue);

      return (
        <>
          {itemObj[header] ? (
            itemObj["NFTtokenContract"] ? (
              <Flex alignItems="center">
                <Text mr="8px">{numberNFTStakeInfo}</Text>
                <GoStar color="#FFB800" />
              </Flex>
            ) : (
              <Flex alignItems="center">
                <Text mr="8px">{numberStakeInfo}</Text>
                <GoStar color="#FFB800" />
              </Flex>
            )
          ) : (
            ""
          )}
        </>
      );

    case "myStake":
      return (
        <>
          <Flex alignItems="center">
            <Text mr="8px">{itemObj[header]}</Text>
            {itemObj["isMyStake"] && <GoStar color="#FFB800" />}
          </Flex>
        </>
      );

    case "totalSupply":
      return (
        <>
          <Text>{formatNumDynDecimal(itemObj[header] / 10 ** 12)}</Text>
        </>
      );

    case "duration":
      return (
        <>
          <Text>{itemObj[header] / 86400} days</Text>
        </>
      );

    case "tokenTotalSupply":
      return (
        <>
          <Text>{formatNumDynDecimal(itemObj[header] / 10 ** 12)}</Text>
        </>
      );

    case "contractAddress":
      return (
        <>
          <Text>{addressShortener(itemObj[header])}</Text>
        </>
      );
    case "owner":
      return (
        <>
          <Text>{addressShortener(itemObj[header])}</Text>
        </>
      );

    case "poolContract":
      return (
        <>
          <Text>{addressShortener(itemObj[header])}</Text>
        </>
      );

    case "creator":
      return (
        <>
          <Text>{addressShortener(itemObj[header])}</Text>
        </>
      );

    case "mintTo":
      return (
        <>
          <Text>{addressShortener(itemObj[header])}</Text>
        </>
      );

    default:
      return (
        <>
          <Text textAlign="left">{itemObj[header]} </Text>
        </>
      );
  }
};
