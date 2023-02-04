import { Feather, Ionicons } from "@expo/vector-icons";
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { useMemo } from "react";
import { generateRandomColor } from "../../lib/colors";
import { Cleep } from "../../lib/types";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { Alert, Share } from "react-native";
import { showToast } from "../../lib/toast";

interface Props {
  cleep: Cleep;
}

export default function CleepCard({ cleep }: Props) {
  const bg = useMemo(() => generateRandomColor(0.18), []);

  const shareContent = async () => {
    try {
      await Share.share({ title: "Cleep", message: cleep.content });
      Haptics.selectionAsync().then().catch();
    } catch (err: any) {
      Alert.alert("Error", "Unable to share");
    }
  };

  const copyContent = async () => {
    try {
      await Clipboard.setStringAsync(cleep.content);
      showToast("Success", "Copied to clipboard", "done");
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
