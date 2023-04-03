// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  grey: "#F4F0F6",
  hash: "F7F7F7",
  primary: "#662483",
};

const theme = extendTheme({ colors });

export default theme;
