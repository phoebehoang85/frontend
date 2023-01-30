import { Box, Heading, useStyleConfig } from "@chakra-ui/react";

export default function IWCard(props) {
  const { variant, title, children, ...rest } = props;
  const styles = useStyleConfig("IWCard", { variant });
  // const tabsStyles = useStyleConfig("Tabs", { variant });


  
  return (
    <Box id="iw-card" __css={styles} {...rest}>
      {title && (
        <Heading as="h4" size="h4" lineHeight="25px">
          {title}
        </Heading>
      )}
      <Box
        mt="14px"
        pt="0px"
        borderTop={!title ? "" : "1px solid #E3DFF3"}
        w="full"
      >
        {children}
      </Box>
    </Box>
  );
}
