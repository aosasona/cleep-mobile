import { Ionicons } from "@expo/vector-icons";
import {
  Actionsheet,
  AspectRatio,
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  useColorModeValue,
  VStack,
} from "native-base";
import { useWindowDimensions } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { appColors } from "../../lib/configs/theme";
import { showToast } from "../../lib/toast";
import * as Clipboard from "expo-clipboard";

interface Props {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectionSheet({ url, isOpen, onClose }: Props) {
  const { width } = useWindowDimensions();
  const bg = useColorModeValue("muted.100", "muted.800");

  async function copyURL() {
    try {
      await Clipboard.setStringAsync(url);
      showToast("Success", "Copied to clipboard!", "done");
    } catch (err: any) {
      console.log(err.message);
      showToast("Error", "Failed to copy", "error");
    }
  }

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content px={3}>
        <VStack alignItems="center" space={4} py={4}>
          <Heading>Add a new device</Heading>
          <Center bg="muted.50" p={3} rounded={10}>
            <QRCode
              value={url}
              logo={require("../../assets/favicon.png")}
              logoSize={30}
              logoMargin={10}
              logoBorderRadius={6}
              logoBackgroundColor={appColors.primary}
              size={width * 0.8}
              onError={(err) =>
                showToast("Error", "Something went wrong!", "error")
              }
            />
          </Center>

          <Box
            w={width * 0.88}
            bg={`${appColors["primary-faded"]}`}
            p={4}
            rounded={10}
          >
            <Text fontSize={12} color="primary" textAlign="left">
              Scan the QR code above on another device to join this session,
              you'll need your session password/signing key to complete the
              process. Unable to use a camera/QR scanner? You can also use the
              link below.
            </Text>
          </Box>

          <HStack
            w={width * 0.88}
            bg={bg}
            justifyContent="space-between"
            alignItems="center"
            px={4}
            py={3}
            rounded={10}
          >
            <Text fontSize={12} textAlign="left" opacity={0.8}>
              {url}
            </Text>
            <IconButton
              icon={<Icon as={Ionicons} name="ios-copy-outline" />}
              _icon={{ size: 5, color: "primary" }}
              _pressed={{ opacity: 0.5 }}
              onPress={copyURL}
            />
          </HStack>
        </VStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
}
