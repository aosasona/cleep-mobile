import { Feather } from "@expo/vector-icons";
import { Box, HStack, Icon, Pressable, Text } from "native-base";
import { useMemo } from "react";
import { generateRandomColor } from "../../lib/colors";
import { Cleep, Session } from "../../lib/types";
import * as Haptics from "expo-haptics";
import { Alert, Share } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { screens } from "../../constants/screens";

interface Props {
  navigation: NavigationProp<any>;
  cleep: Cleep;
  session: Session;
}

export default function CleepCard({ navigation, cleep, session }: Props) {
  const bg = useMemo(() => generateRandomColor(0.18), []);

  const shareContent = async () => {
    try {
      await Share.share({ title: "Cleep", message: cleep.content });
      Haptics.selectionAsync().then().catch();
    } catch (err: any) {
      Alert.alert("Error", "Unable to share");
    }
  };

  return (
    <Pressable
      w="94%"
      bg={bg}
      _pressed={{ opacity: 0.5 }}
      px={3}
      py={3}
      rounded={8}
      onPress={() =>
        cleep.type == "text"
          ? navigation.navigate(screens.ADD_CLEEP, {
            session,
            cleep,
          })
          : null
      }
      onLongPress={shareContent}
      my={1.5}
    >
      {cleep.type == "text" ? (
        <Text fontSize={13} color="muted.300" noOfLines={10}>
          {cleep.content}
        </Text>
      ) : (
        <Box>
          <HStack>
            <Icon as={Feather} name="file" size={5} />
            <Text>{cleep.content}</Text>
          </HStack>
        </Box>
      )}
    </Pressable>
  );
}
