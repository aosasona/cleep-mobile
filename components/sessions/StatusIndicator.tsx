import { Box, useColorModeValue } from "native-base";

interface Props {
  connected: boolean;
  retrying: boolean;
}

export default function StatusIndicator({ connected, retrying }: Props) {
  const bg = useColorModeValue("muted.200", "muted.900");
  return (
    <Box bg={bg} position="absolute" bottom={4} left={4} p={2} rounded={6}>
      <Box
        w={3}
        h={3}
        bg={connected ? "emerald.500" : retrying ? "amber.500" : "red.500"}
        rounded="full"
      />
    </Box>
  );
}
