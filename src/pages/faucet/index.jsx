import { Button, Heading, Link, Select, Stack, Text } from "@chakra-ui/react";
import IWCard from "components/card/Card";
import IWCardOneColumn from "components/card/CardOneColumn";
import SectionContainer from "components/container/SectionContainer";
import { AzeroLogo } from "components/icons/Icons";
import IWInput from "components/input/Input";

import React from "react";

export default function FaucetPage() {
  return (
    <>
      <SectionContainer
        mt={{ base: "0px", xl: "20px" }}
        title="Faucet"
        description={
          <span>
            Get some test tokens into your account. To get some TZERO, please
            visit{" "}
            <Link
              isExternal
              color="text.1"
              href="https://faucet.test.azero.dev"
            >
              https://faucet.test.azero.dev
            </Link>
          </span>
        }
      >
        <Stack
          w="full"
          spacing="30px"
          alignItems="start"
          direction={{ base: "column", lg: "row" }}
        >
          <IWCardOneColumn
            title="My Account"
            data={[
              { title: "Account Address", content: "5Dthb...4hiX" },
              { title: "Azero Balance", content: "25,000.948" },
              { title: "WAL Balance", content: "99,999.000" },
            ]}
          />

          <IWCard w="full" variant="outline" title="Get Test Tokens">
            <IWCard mt="16px" w="full" variant="solid">
              <Stack
                w="100%"
                spacing="20px"
                direction={{ base: "column", xl: "row" }}
                align={{ base: "column", xl: "center" }}
              >
                <Select id="token" defaultValue="Select token">
                  {["Token A", "Token B", "Token C"].map((item, idx) => (
                    <option key={idx} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>

                <Button minW="130px">Send me</Button>
              </Stack>
            </IWCard>
          </IWCard>
        </Stack>{" "}
      </SectionContainer>

      <SectionContainer
        mt={{ base: "0px", xl: "8px" }}
        title="WAL Tokens"
        description={`WAL tokens are used as transaction fee. 100M WAL tokens are available at 0.05 per WAL. You can trade WAL on PanoramaSwap in due time.`}
      >
        <Stack
          w="full"
          spacing="30px"
          alignItems="start"
          direction={{ base: "column", lg: "row" }}
        >
          <IWCardOneColumn
            title="Information"
            data={[
              { title: "Total Name", content: "Ink Whale Token" },
              { title: "Contract Address", content: "5Dth...34hiX" },
              { title: "Total Supply", content: "10,036,000.000" },
              { title: "Token Symbol", content: "WAL" },
            ]}
          />

          <IWCard w="full" variant="outline" title="Acquire WAL Tokens">
            <IWCard mt="16px" w="full" variant="solid">
              <Stack
                w="100%"
                spacing="20px"
                direction={{ base: "column" }}
                align={{ base: "column", xl: "center" }}
              >
                <IWInput
                  type="number"
                  placeholder="Enter WAL amount"
                  inputRightElementIcon={
                    <Heading as="h5" size="h5" fontWeight="semibold">
                      $WAL
                    </Heading>
                  }
                />

                <IWInput
                  type="number"
                  placeholder="0.000000000"
                  inputRightElementIcon={<AzeroLogo />}
                />

                <Text textAlign="left" w="full" fontSize="md" lineHeight="28px">
                  (There are 20,952.000 WAL tokens available to mint){" "}
                </Text>

                <Button w="full">Get WAL</Button>
              </Stack>
            </IWCard>
          </IWCard>
        </Stack>
      </SectionContainer>

      {/* <SimpleGrid gap="10px" p={{ base: "30px", md: "80px", xl: "80px" }}>
        <Heading as="h2" size="h2">
          Colors
        </Heading>
        <Heading as="h5" size="h5">
          Primary
        </Heading>
        <HStack spacing="0">
          <Square size="50px" bg="brand.100" />
          <Square size="50px" bg="brand.200" />
          <Square size="50px" bg="brand.300" />
          <Square size="50px" bg="brand.400" />
          <Square size="50px" bg="brand.500" />
          <Square size="50px" bg="brand.600" />
          <Square size="50px" bg="brand.700" />
          <Square size="50px" bg="brand.800" />
          <Square size="50px" bg="brand.900" />
        </HStack>

        <HStack>
          <Circle size="100px" bg="brand.500" />
        </HStack>
        <Heading as="h5" size="h5">
          Text
        </Heading>
        <HStack>
          <Circle size="100px" bg="text.1" />
          <Circle size="100px" bg="text.2" />
          <Circle size="100px" bg="text.3" border="1px solid lightgrey" />
        </HStack>
        <Heading as="h5" size="h5">
          Background
        </Heading>
        <HStack>
          <Circle size="100px" bg="bg.1" />
          <Circle size="100px" bg="bg.2" />
          <Circle size="100px" bg="bg.3" />
          <Circle size="100px" bg="bg.4" />
          <Circle size="100px" bg="bg.5" />
          <Circle size="100px" bg="bg.6" border="1px solid lightgrey" />
        </HStack>
        <Heading as="h5" size="h5">
          Border
        </Heading>
        <HStack>
          <Circle size="100px" bg="border" />
        </HStack>
        <Heading as="h5" size="h5">
          Decoration
        </Heading>
        <HStack>
          <Circle size="100px" bg="decoration.1" />
          <Circle size="100px" bg="decoration.2" />
          <Circle size="100px" bg="decoration.3" />
          <Circle size="100px" bg="decoration.4" />
          <Circle size="100px" bg="decoration.5" />
        </HStack>
        <Divider />
        <Heading as="h2" size="h2">
          Typography
        </Heading>
        <>
          <Heading my="20px" as="h1" size="display" noOfLines={1}>
            Display -Bold-60/70
          </Heading>
          <Heading my="20px" as="h1" size="h1">
            Heading 01-Outfit-Bold-36/auto
          </Heading>
          <Heading my="20px" as="h2" size="h2">
            Heading 02-Outfit-Bold-30/auto
          </Heading>
          <Heading my="20px" as="h3" size="h3">
            Heading 03-Outfit-Bold-24/auto
          </Heading>
          <Heading my="20px" as="h4" size="h4">
            Heading 04-Outfit-Bold-20/auto
          </Heading>
          <Heading my="20px" as="h5" size="h5">
            Heading 05-Outfit-Bold-18/auto
          </Heading>{" "}
          <Heading my="20px" as="h5" size="h6">
            Heading 06-Outfit-Bold-16/auto
          </Heading>
          <Heading my="20px" as="h6" size="menu">
            Menu-Outfit-Bold-16/auto
          </Heading>
          <Text>Body medium-Outfit-Regular -18/30</Text>
          <Text fontSize="md" lineHeight="28px">
            Body small-Outfit-Regular -16/28
          </Text>
        </>
        <HStack>
          <Button w="200px" variant="primary">
            Button Primary
          </Button>
          <Button isDisabled w="200px" variant="primary">
            Button Primary
          </Button>
        </HStack>
        <HStack>
          <Button w="200px" variant="secondary">
            Button Secondary
          </Button>
          <Button isDisabled w="200px" variant="secondary">
            Button Secondary
          </Button>
        </HStack>
        <HStack>
          <Button w="200px" variant="outline">
            Button outline
          </Button>
          <Button isDisabled w="200px" variant="outline">
            Button outline
          </Button>
        </HStack>
        <Link>Link</Link>
      </SimpleGrid> */}
    </>
  );
}
