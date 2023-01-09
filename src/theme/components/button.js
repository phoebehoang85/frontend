import { mode } from "@chakra-ui/theme-tools";
export const buttonStyles = {
  components: {
    Button: {
      baseStyle: {
        borderRadius: "5px",
        transition: ".25s all ease",
        boxSizing: "border-box",
        boxShadow: "45px 76px 113px 7px rgba(112, 144, 176, 0.08)",
        _focus: { boxShadow: "none" },
        _active: { boxShadow: "none" },
      },
      sizes: {
        md: { height: "52px", fontSize: "lg", fontWeights: "semibold" },
      },
      variants: {
        primary: () => ({
          bg: "brand.500",
          color: "text.1",
          _focus: { bg: "#6EDDE4" },
          _active: { bg: "#6EDDE4" },
          _hover: { bg: "#8BE7ED" },
          _disable: { bg: "#A9CED0" },
        }),
        secondary: () => ({
          bg: "text.1",
          color: "#FFFFFF",
          _focus: { bg: "#322E55" },
          _active: { bg: "#322E55" },
          _hover: { bg: "#4A456B" },
          _disable: { bg: "#A3A0B7" },
        }),
        outline: () => ({
          bg: "transparent",
          border: "2px solid #93F0F5",
          color: "text.1",
          _focus: { bg: "#6EDDE4" },
          _active: { bg: "#6EDDE4" },
          _hover: { bg: "#A7F1F6" },
          _disable: { bg: "transparent" },
        }),
        brand: (props) => ({
          bg: mode("brand.500", "brand.400")(props),
          color: mode("secondaryGray.500", "white")(props),
          _focus: { bg: mode("brand.500", "brand.400")(props) },
          _active: { bg: mode("brand.500", "brand.400")(props) },
          _hover: { bg: mode("brand.600", "brand.400")(props) },
        }),
        darkBrand: (props) => ({
          bg: mode("brand.900", "brand.400")(props),
          color: mode("secondaryGray.500", "white")(props),
          _focus: { bg: mode("brand.900", "brand.400")(props) },
          _active: { bg: mode("brand.900", "brand.400")(props) },
          _hover: { bg: mode("brand.800", "brand.400")(props) },
        }),
        lightBrand: (props) => ({
          bg: mode("#F2EFFF", "whiteAlpha.100")(props),
          color: mode("secondaryGray.500", "white")(props),
          _focus: { bg: mode("#F2EFFF", "whiteAlpha.100")(props) },
          _active: { bg: mode("secondaryGray.300", "whiteAlpha.100")(props) },
          _hover: { bg: mode("secondaryGray.400", "whiteAlpha.200")(props) },
        }),
        light: (props) => ({
          bg: mode("secondaryGray.300", "whiteAlpha.100")(props),
          color: mode("secondaryGray.900", "white")(props),
          _focus: {
            bg: mode("secondaryGray.300", "whiteAlpha.100")(props),
          },
          _active: {
            bg: mode("secondaryGray.300", "whiteAlpha.100")(props),
          },
          _hover: {
            bg: mode("secondaryGray.400", "whiteAlpha.200")(props),
          },
        }),
        action: (props) => ({
          fontWeight: "500",
          borderRadius: "50px",
          bg: mode("secondaryGray.300", "brand.400")(props),
          color: mode("brand.500", "white")(props),
          _focus: {
            bg: mode("secondaryGray.300", "brand.400")(props),
          },
          _active: { bg: mode("secondaryGray.300", "brand.400")(props) },
          _hover: {
            bg: mode("secondaryGray.200", "brand.400")(props),
          },
        }),
        setup: (props) => ({
          fontWeight: "500",
          borderRadius: "50px",
          bg: mode("transparent", "brand.400")(props),
          border: mode("1px solid", "0px solid")(props),
          borderColor: mode("secondaryGray.400", "transparent")(props),
          color: mode("secondaryGray.900", "white")(props),
          _focus: {
            bg: mode("transparent", "brand.400")(props),
          },
          _active: { bg: mode("transparent", "brand.400")(props) },
          _hover: {
            bg: mode("secondaryGray.100", "brand.400")(props),
          },
        }),
      },
      defaultProps: {
        variant: "primary",
      },
    },
  },
};
