import {
  HStack,
  ScrollView,
  Slider,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from "native-base";
import { useContext } from "react";
import {
  SettingsHStackProps,
  SettingsVStackProps,
} from "../../../constants/props";
import { GlobalContext } from "../../../context/global/Provider";
import { GlobalActionEnum } from "../../../context/global/Reducer";
import { showAlert } from "../../../lib/toast";
import { Picker } from "@react-native-picker/picker";
import { useWindowDimensions } from "react-native";
import { isAndroid } from "../../../lib/platform";

interface AvailableDuration {
  label: string;
  value: number;
}

export default function Settings() {
  const { state, dispatch } = useContext(GlobalContext);

  const { toggleColorMode, colorMode } = useColorMode();
  const { width } = useWindowDimensions();

  const isDarkMode = colorMode === "dark";

  const color = useColorModeValue("black", "white");

  const toggleTheme = () => {
    toggleColorMode();
    dispatch({
      type: GlobalActionEnum.TOGGLE_COLOR_MODE,
      payload: { colorMode: isDarkMode ? "light" : "dark" },
    });
  };

  const changeDefaultSessionDuration = (val: number) => {
    if (val == 0) {
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

  const availableDurations: AvailableDuration[] = [
    {
      label: "1",
      value: 1,
    },
    {
      label: "2",
      value: 2,
    },
    {
      label: "3",
      value: 3,
    },
    {
      label: "4",
      value: 4,
    },
    {
      label: "5",
      value: 5,
    },
    {
      label: "6",
      value: 6,
    },
    {
      label: "7",
      value: 7,
    },
    {
      label: "Unlimited",
      value: 0,
    },
  ];

  const DurComponent = isAndroid ? HStack : VStack;

  return (
    <ScrollView>
      <VStack space={4}>
        <HStack {...SettingsHStackProps}>
          <Text>Dark mode</Text>
          <Switch value={isDarkMode} onToggle={toggleTheme} />
        </HStack>

        <DurComponent
          justifyContent="space-between"
          alignItems="center"
          {...SettingsVStackProps}
          space={2}
        >
          <Text>Session duration</Text>
          <Picker
            selectedValue={state.defaultSessionDuration}
            onValueChange={(value, idx) => changeDefaultSessionDuration(value)}
            mode="dialog"
            prompt="Select a default session duration"
            dropdownIconColor={color}
            style={{
              width: isAndroid ? width * 0.4 : "100%",
              color: color,
            }}
            itemStyle={{
              color: color,
            }}
          >
            {availableDurations.map((current, idx) => (
              <Picker.Item
                key={idx}
                label={current.label}
                value={current.value}
              />
            ))}
          </Picker>
        </DurComponent>
      </VStack>
    </ScrollView>
  );
}
