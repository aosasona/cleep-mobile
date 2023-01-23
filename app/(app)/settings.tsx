import {
  HStack,
  ScrollView,
  Switch,
  Text,
  useColorMode,
  VStack,
} from "native-base";

export default function Settings() {
  const { toggleColorMode } = useColorMode();
  return (
    <ScrollView>
      <VStack
        _dark={{ bg: "muted.900" }}
        _light={{ bg: "muted.50" }}
        px={3}
        py={5}
        rounded={12}
      >
        <HStack alignItems="center" justifyContent="space-between">
          <Text>Dark mode</Text>
          <Switch onToggle={toggleColorMode} />
        </HStack>
      </VStack>
    </ScrollView>
  );
}
