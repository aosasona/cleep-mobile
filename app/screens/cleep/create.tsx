import {
  Button,
  HStack,
  Icon,
  IconButton,
  TextArea,
  View,
  VStack,
} from "native-base";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Cleep, ScreenProps, Session } from "../../../lib/types";
import * as Clipboard from "expo-clipboard";
import { showToast } from "../../../lib/toast";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { Alert, Keyboard } from "react-native";
import { handleException } from "../../../lib/error";
import {
  createTextCleep,
  deleteCleep,
  updateTextCleep,
} from "../../../lib/requests/cleep";
import { useFocusEffect } from "@react-navigation/native";

export default function Create({ navigation, route }: ScreenProps) {
  const session = (route.params as any)?.session as Session | null;
  const cleep = (route.params as any)?.cleep as Cleep;

  if (!session) {
    navigation.goBack();
  }

  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (cleep) {
      setContent(cleep.content);
    }
  }, [cleep]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const hasString = await Clipboard.hasStringAsync();
        if (hasString && !content && !file && !cleep) {
          const clipboardContent = await Clipboard.getStringAsync();
          setContent(clipboardContent);
        }
      })();
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HStack space={2}>
          <IconButton
            icon={<Icon as={MaterialCommunityIcons} name="keyboard-close" />}
            _icon={{ color: "primary" }}
            _pressed={{ opacity: 0.5 }}
            onPress={() => Keyboard.dismiss()}
            py={4}
          />
          <IconButton
            icon={<Icon as={Ionicons} name="ios-trash-outline" />}
            _icon={{ color: "primary" }}
            _pressed={{ opacity: 0.5 }}
            onPress={handleCleepDelete}
            py={4}
          />
        </HStack>
      ),
    });
  }, [navigation, cleep]);

  const pasteClipboardContent = () => {
    Clipboard.getStringAsync()
      .then((data) => setContent(data))
      .catch((err) => showToast("Error", "Unable to paste content", "error"));
  };

  const handleCleepDelete = async () => {
    Alert.alert(
      "Confirm action",
      `Are you sure you want to delete this cleep?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteCleep(session, cleep.id);
              navigation.goBack();
            } catch (err) {
              const msg = handleException(err);
              showToast("Error", msg, "error");
            }
          },
        },
      ]
    );
  };

  const createCleep = async () => {
    try {
      setSaving(true);

      if (!file) {
        if (cleep) {
          await updateTextCleep(session, cleep.id, content);
        } else {
          await createTextCleep(session, content);
        }
      }

      navigation.goBack();
    } catch (err) {
      const msg = handleException(err);
      showToast("Error", msg, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View flex={1}>
      <VStack flex={1} space={2}>
        <TextArea
          value={content}
          flex={1}
          variant="filled"
          bg="transparent"
          borderWidth={0}
          fontSize={14}
          placeholder="Enter content here..."
          onChangeText={setContent}
          autoCorrect
          autoCompleteType="text"
          mb={3}
        />
        <HStack
          justifyContent="space-between"
          alignItems="center"
          px={4}
          mb={3}
          space={1}
        >
          <Button
            w="5/6"
            bg="primary"
            py={4}
            isLoading={saving}
            onPress={createCleep}
            _text={{ color: "white" }}
            _pressed={{ opacity: 0.5 }}
          >
            Save
          </Button>
          <IconButton
            w="1/6"
            icon={<Icon as={Octicons} name="paste" />}
            _icon={{ color: "primary" }}
            _pressed={{ opacity: 0.5 }}
            onPress={pasteClipboardContent}
            p={1}
          />
        </HStack>
      </VStack>
    </View>
  );
}
