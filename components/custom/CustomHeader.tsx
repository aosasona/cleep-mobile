import { Box, useColorModeValue } from "native-base";

export default function CustomHeader() {
  const bg = useColorModeValue("light", "dark");
  return (
    <Box
      position="absolute"
      top={0}
      bottom={0}
      left={0}
      right={0}
      bg={bg}
      zIndex={-1}
    />
  );
}
