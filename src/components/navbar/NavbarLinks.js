import {
  Flex,
  Link,
  Text,
  Show,
  Menu,
  MenuButton,
  MenuList,
  Heading,
  MenuItem,
} from "@chakra-ui/react";
import IWCard from "components/card/Card";

import { SidebarResponsive } from "components/sidebar/Sidebar";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";

import routes from "routes.js";
import WalletButton from "components/wallet/WalletButton";
import { useSelector } from "react-redux";

export default function NavbarLinks(props) {
  const { secondary } = props;

  const [currentAnchor, setCurrentAnchor] = useState("");
  const currentAccount = useSelector((s) => s.wallet.currentAccount);

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
    <Flex
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
      justifyContent="end"
      bg="transparent"
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
    >
      <SidebarResponsive routes={routes} />

      <Show above="md">
        <Flex bg="transparent">
          {menuListData?.map(({ title, href }) => (
            <Flex
              _hover={{ textDecoration: "none", bg: "bg.1" }}
              p="6px 10px"
              bg={
                (!currentAnchor && href === "#hero") || currentAnchor === href
                  ? "bg.1"
                  : "transparent"
              }
              borderRadius="5px"
              key={title}
              ml={{ base: "20px", md: "20px" }}
            >
              <Link
                to={href}
                as={RouterLink}
                color={"text.1"}
                fontWeight="600"
                bg="transparent"
                textDecoration="none"
                _hover={{ textDecoration: "none", bg: "bg.1" }}
                onClick={() => setCurrentAnchor(href)}
              >
                <Text bg="transparent" fontSize="md">
                  {title}
                </Text>
              </Link>
            </Flex>
          ))}

          {!currentAccount ? null : (
            <Flex
              _hover={{ textDecoration: "none", bg: "bg.1" }}
              p="6px 10px"
              bg={currentAnchor === "/account" ? "bg.1" : "transparent"}
              borderRadius="5px"
              ml={{ base: "20px", md: "20px" }}
            >
              <Link
                to="/account"
                as={RouterLink}
                color={"text.1"}
                fontWeight="600"
                bg="transparent"
                textDecoration="none"
                _hover={{ textDecoration: "none", bg: "bg.1" }}
                onClick={() => setCurrentAnchor('"/account"')}
              >
                <Text bg="transparent" fontSize="md">
                  My Account
                </Text>
              </Link>
            </Flex>
          )}

          <CreateMenuDropdown />
        </Flex>
      </Show>

      <Show above="md">
        <Flex ml="30px">
          <WalletButton />
        </Flex>
      </Show>
    </Flex>
  );
}

NavbarLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};

export const menuListData = [
  {
    title: "Faucet",
    href: "/faucet",
  },
  {
    title: "Pools",
    href: "/pools",
  },
  {
    title: "Farms",
    href: "/farms",
  },
  {
    title: "Tokens",
    href: "/tokens",
  },
];

export const CreateMenuDropdown = ({ onClose }) => {
  const history = useHistory();

  return (
    <Menu placement="bottom-end">
      <MenuButton
        p="0px"
        bg="transparent"
        _hover={{ bg: "bg.1" }}
        borderRadius="5px"
        ml={{ base: "20px", md: "20px" }}
      >
        <Flex w="full" p="6px 10px" borderRadius="5px">
          <Link color={"text.1"} fontWeight="600" textDecoration="none">
            <Text fontSize="md">Create</Text>
          </Link>
        </Flex>
      </MenuButton>

      <MenuList
        p="0px"
        m="0px"
        border="none"
        borderRadius="10px"
        boxShadow="0px 10px 21px rgba(0, 0, 0, 0.08)"
      >
        <Flex flexDirection="column" p="20px">
          {[
            { label: "Token", href: "/create/token" },
            { label: "Staking Pool Token", href: "/create/stake-pool" },
            { label: "NFT Yield Farm", href: "/create/nft-lp" },
            { label: "Token Yield Farm", href: "/create/token-lp" },
          ].map((item, idx) => (
            <IWCard
              key={idx}
              mb="0px"
              px="-24px"
              alignItems={{ base: "center" }}
              cursor="pointer"
              variant="menuBlank"
              minW={{ base: "full", lg: "180px" }}
            >
              <Link
                _hover={{ textDecoration: "none" }}
                to={item.href}
                as={RouterLink}
                color={"text.1"}
                fontWeight="600"
                bg="transparent"
                textDecoration="none"
                onClick={() => {
                  history.push(item.href);
                  // onClose();
                }}
              >
                <MenuItem
                  _active={{ bg: "transparent" }}
                  _focus={{ bg: "transparent" }}
                >
                  <Flex
                    w="full"
                    justify={{ base: "start" }}
                    alignItems={{ base: "center" }}
                  >
                    <Heading as="h5" size="h5" ml="10px">
                      {item.label}
                    </Heading>
                  </Flex>
                </MenuItem>
              </Link>
            </IWCard>
          ))}
        </Flex>
      </MenuList>
    </Menu>
  );
};

//  const WalletConnect = () => {
//   const history = useHistory();

//   return (
//     <Menu placement="bottom-end">
//       <MenuButton p="0px">
//         <Flex alignItems="center" w="full">
//           <Avatar bg="bg.1" w="44px" h="44px" />{" "}
//           <Heading
//             w="full"
//             as="h5"
//             size="h5"
//             ml="10px"
//             // ps="20px"
//             // pt="16px"
//             // pb="10px"
//           >
//             5HQ...NHXT{" "}
//           </Heading>
//         </Flex>
//       </MenuButton>

//       <MenuList
//         p="0px"
//         m="0px"
//         border="none"
//         borderRadius="10px"
//         boxShadow="0px 10px 21px rgba(0, 0, 0, 0.08)"
//       >
//         <Flex flexDirection="column" p="20px">
//           {[
//             { title: "WAL Balance", content: "100,000.000" },
//             { title: "WAL Balance", content: "25,000.948" },
//           ].map(({ title, content }, idx) => {
//             return (
//               <IWCard
//                 key={idx}
//                 mb="12px"
//                 variant="menu"
//                 minW={{ base: "full", lg: "350px" }}
//               >
//                 <Flex justify={{ base: "space-between" }}>
//                   <Text>{title}</Text>

//                   <Heading as="h4" size="h4">
//                     {content}
//                   </Heading>
//                 </Flex>
//               </IWCard>
//             );
//           })}

//           <IWCard mb="12px" variant="menu" minW={{ base: "full", lg: "350px" }}>
//             <Flex justify={{ base: "space-between" }}>
//               <Text>Show more Balance</Text>

//               <MenuItem
//                 w="32px"
//                 h="32px"
//                 _active={{ bg: "transparent" }}
//                 _focus={{ bg: "transparent" }}
//               >
//                 <Circle
//                   cursor="pointer"
//                   w="32px"
//                   h="32px"
//                   bg="bg.5"
//                   onClick={() => history.push("/account/my-balance")}
//                 >
//                   <MenuArrowRightIcon color="text.1" />
//                 </Circle>
//               </MenuItem>
//             </Flex>
//           </IWCard>

//           <Flex
//             w="full"
//             mt={{ base: "12px" }}
//             mb={{ base: "24px" }}
//             justifyContent="space-between"
//           >
//             {myMenuList.map((item, idx) => (
//               <Fragment key={idx}>
//                 <MenuCardIcon {...item} />
//               </Fragment>
//             ))}
//           </Flex>

//           <Button w="full" variant="outline">
//             Log out
//           </Button>
//         </Flex>
//       </MenuList>
//     </Menu>
//   );
// };

// const myMenuList = [
//   {
//     borderColor: "#93F0F5",
//     borderColorHover: "#0000",
//     bgColor: "#E8FDFF",
//     bgColorHover: "#93F0F5",
//     iconColor: "#6CE5ED",
//     iconColorHover: "#57527E",
//     icon: <MyPoolsIcon />,
//     title: "My pools",
//   },
//   {
//     borderColor: "#93F0F5",
//     borderColorHover: "#0000",
//     bgColor: "#E8FDFF",
//     bgColorHover: "#93F0F5",
//     iconColor: "#6CE5ED",
//     iconColorHover: "#57527E",
//     icon: <MyNFTFarmsIcon />,
//     title: "My NFT Farms",
//   },
//   {
//     borderColor: "#93F0F5",
//     borderColorHover: "#0000",
//     bgColor: "#E8FDFF",
//     bgColorHover: "#93F0F5",
//     iconColor: "#6CE5ED",
//     iconColorHover: "#57527E",
//     icon: <MyLPFarmsIcon />,
//     title: "My LP Farms",
//   },
// ];

//  const WalletNotConnect = () => {
//   return (
//     <Menu placement="bottom-end">
//       <MenuButton p="0px">
//         <Button minW="170px">Select Wallet</Button>
//       </MenuButton>

//       <MenuList
//         p="0px"
//         m="0px"
//         border="none"
//         borderRadius="10px"
//         boxShadow="0px 10px 21px rgba(0, 0, 0, 0.08)"
//       >
//         <Flex flexDirection="column" p="20px">
//           {[1, 2, 3].map((_, idx) => (
//             <IWCard
//               key={idx}
//               mb="0px"
//               px="-24px"
//               alignItems={{ base: "start" }}
//               cursor="pointer"
//               variant="menuBlank"
//               minW={{ base: "full", lg: "180px" }}
//             >
//               <Flex
//                 onClick={() => {}}
//                 w="full"
//                 mt="-6px"
//                 justify={{ base: "start" }}
//                 alignItems={{ base: "center" }}
//               >
//                 <MenuItem
//                   mt="-6px"
//                   _active={{ bg: "transparent" }}
//                   _focus={{ bg: "transparent" }}
//                 >
//                   <Circle
//                     w="44px"
//                     h="44px"
//                     borderWidth="1px"
//                     borderColor="border"
//                     bg="white"
//                   >
//                     <Image
//                       src={SubWalletLogo}
//                       w="26px"
//                       h="26px"
//                       alt="logo-subwallet"
//                     />
//                   </Circle>

//                   <Heading as="h5" size="h5" ml="10px">
//                     Subwallet
//                   </Heading>
//                 </MenuItem>
//               </Flex>
//             </IWCard>
//           ))}
//         </Flex>
//       </MenuList>
//     </Menu>
//   );
// };

// TODO: Move to separate component
// const MenuCardIcon = ({
//   title,
//   icon,
//   color,
//   borderColor,
//   borderColorHover,
//   bgColor,
//   bgColorHover,
//   iconColor,
//   iconColorHover,
//   ...rest
// }) => {
//   return (
//     <Box
//       w="full"
//       cursor="pointer"
//       textAlign="center"
//       id="menu-card-icon"
//       transition=".25s all ease;"
//       {...rest}
//     >
//       <Flex w="full" alignItems="center" justifyContent="center">
//         <Box
//           id="card-wrapper"
//           width={{ base: "62px" }}
//           height={{ base: "62px" }}
//           position={"relative"}
//         >
//           <MenuIconBorder
//             color={borderColor}
//             sx={{
//               "#card-wrapper:hover &": {
//                 color: borderColorHover,
//               },
//             }}
//           />
//           <MenuIconBackground
//             zIndex="0"
//             top="0px"
//             left="0px"
//             width={{ base: "62px" }}
//             height={{ base: "62px" }}
//             position={"absolute"}
//             color={bgColor}
//             sx={{
//               "#card-wrapper:hover &": {
//                 color: bgColorHover,
//               },
//             }}
//           />
//           <Square
//             top="0%"
//             left="0%"
//             width={{ base: "62px" }}
//             height={{ base: "62px" }}
//             position={"absolute"}
//             color={iconColor}
//             sx={{
//               "#card-wrapper:hover &": {
//                 color: iconColorHover,
//               },
//             }}
//           >
//             {icon}
//           </Square>
//         </Box>
//       </Flex>
//       <Text
//         color="text.1"
//         fontSize="15px"
//         lineHeight="19px"
//         mt={{ base: "6px" }}
//       >
//         {title}
//       </Text>
//     </Box>
//   );
// };
