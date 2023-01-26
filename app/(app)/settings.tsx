import {
  Divider,
  HStack,
  ScrollView,
  Slider,
  Switch,
  Text,
  useColorMode,
  VStack,
} from "native-base";
import { useContext } from "react";
import {
  SettingsHStackProps,
  SettingsVStackProps,
} from "../../constants/props";
import { GlobalContext } from "../../context/global/Provider";
import { GlobalActionEnum } from "../../context/global/Reducer";
import { showAlert } from "../../lib/toast";

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

  const changeDefaultSessionDuration = (val: number) => {
    if (val == 8) {
      showAlert(
        "Unavailable",
        "Sorry, this feature is not available yet",
        "error"
      );
      return;
    }
    dispatch({
      type: GlobalActionEnum.CHANGE_DEFAULT_SESSION_DURATION,
      payload: { defaultSessionDuration: val },
    });
  };

  return (
    <ScrollView>
      <VStack rounded={12}>
        <HStack {...SettingsHStackProps}>
          <Text>Dark mode</Text>
          <Switch value={isDarkMode} onToggle={toggleTheme} />
        </HStack>

        <VStack w="full" space={3} {...SettingsVStackProps}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text>Default session duration</Text>
            <Text fontSize={12} opacity={0.6}>
              {state.defaultSessionDuration}
            </Text>
          </HStack>
          <Slider
            w="full"
            colorScheme="rose"
            defaultValue={state.defaultSessionDuration}
            value={state.defaultSessionDuration}
            minValue={1}
            maxValue={8}
            onChange={changeDefaultSessionDuration}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <HStack justifyContent="space-between" alignItems="center" py={1}>
            <Text fontSize={10} opacity={0.5}>
              1 day
            </Text>
            <Text fontSize={10} opacity={0.5}>
              Unlimited
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
