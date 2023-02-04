import { Ionicons } from "@expo/vector-icons";
import {
  Actionsheet,
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  VStack,
} from "native-base";
import { Share, useWindowDimensions } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { appColors } from "../../lib/configs/theme";
import { showToast } from "../../lib/toast";

interface Props {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectionSheet({ url, isOpen, onClose }: Props) {
  const { width } = useWindowDimensions();
  const bg = useColorModeValue("muted.100", "muted.800");

  async function shareSession() {
    try {
      Share.share({
        message:
          "Hey there! Click this link to join my Cleep session, I'll provide you with the session password soon 😉",
        url: url,
      });
    } catch (err: any) {
      showToast("Error", "Failed to share", "error");
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
              logo={require("../../assets/qr-logo.png")}
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
            px={3}
            py={3}
            rounded={10}
          >
            <Text fontSize={12} textAlign="left" opacity={0.8} px={1}>
              {url}
            </Text>
            <IconButton
              icon={<Icon as={Ionicons} name="ios-share-outline" />}
              _icon={{ size: 5, color: "primary" }}
              _pressed={{ opacity: 0.5 }}
              onPress={shareSession}
            />
          </HStack>
        </VStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
}
