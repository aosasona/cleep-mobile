import {
  HStack,
  ScrollView,
  Switch,
  Text,
  useColorMode,
  VStack,
} from "native-base";
import { useContext } from "react";
import { GlobalContext } from "../../context/global/Provider";
import { GlobalActionEnum } from "../../context/global/Reducer";

export default function Settings() {
  const { state, dispatch } = useContext(GlobalContext);

  const { toggleColorMode, colorMode } = useColorMode();

  const isDarkMode = colorMode === "dark";

  const toggleTheme = () => {
    toggleColorMode();
    dispatch({
      type: GlobalActionEnum.TOGGLE_COLOR_MODE,
      payload: { colorMode: isDarkMode ? "light" : "dark" },
    });
  };

  return (
    <ScrollView>
      <VStack
        _dark={{ bg: "muted.900" }}
        _light={{ bg: "muted.50" }}
        px={4}
        py={3}
        rounded={12}
      >
        <HStack alignItems="center" justifyContent="space-between">
          <Text>Dark mode</Text>
          <Switch value={isDarkMode} onToggle={toggleTheme} />
        </HStack>
      </VStack>
    </ScrollView>
  );
}
