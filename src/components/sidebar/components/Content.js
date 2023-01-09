import { Flex, Stack, Link, Text } from "@chakra-ui/react";
import { WalletConnect } from "components/navbar/NavbarLinks";
import { WalletNotConnect } from "components/navbar/NavbarLinks";
import { CreateMenuDropdown } from "components/navbar/NavbarLinks";
import { menuListData } from "components/navbar/NavbarLinks";

import Brand from "components/sidebar/components/Brand";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

function SidebarContent({ onClose }) {
  const [currentAnchor, setCurrentAnchor] = useState("");

  useEffect(() => {
    const href = window.location.href;
    const index = href.indexOf("#");
    const length = href.length;

    const shortenUrl = href.slice(index, length);

    shortenUrl === "#/"
      ? setCurrentAnchor("")
      : setCurrentAnchor(shortenUrl.replace("/", ""));
  }, []);

  return (
    <Flex direction="column" height="100%" pt="25px" borderRadius="30px">
      <Brand />

      <Stack
        direction="column"
        alignItems={"start"}
        mb="auto"
        mt="8px"
        px="20px"
      >
        {menuListData?.map(({ title, href }) => (
          <Flex
            w={"full"}
            p="6px 10px"
            bg={
              (!currentAnchor && href === "#hero") || currentAnchor === href
                ? "bg.1"
                : "transparent"
            }
            borderRadius="5px"
            key={title}
            ml={{ base: "0px", md: "20px" }}
          >
            <Link
              to={href}
              as={RouterLink}
              onClick={() => {
                onClose();

                setCurrentAnchor(href);
              }}
              bg="transparent"
              textDecoration="none"
              fontWeight="600"
              color={"text.1"}
              href={href}
            >
              <Text bg="transparent" fontSize="md">
                {title}
              </Text>
            </Link>
          </Flex>
        ))}

        <CreateMenuDropdown onClose={onClose} />

        <Flex ml="30px" pt="10px">
          {0 < 1 ? <WalletConnect /> : <WalletNotConnect />}
        </Flex>
      </Stack>
    </Flex>
  );
}

export default SidebarContent;
