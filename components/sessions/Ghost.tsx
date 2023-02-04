import { AspectRatio, Box, Heading, Text, VStack } from "native-base";
import { useWindowDimensions } from "react-native";
import Lottie from "lottie-react-native";

interface Props {
  headerText?: string;
  message?: string;
}

export default function Ghost({ headerText, message }: Props) {
  const { width, height } = useWindowDimensions();

  const lottieWidth = width * 0.6;
  return (
    <Box height={height * 0.7} alignItems="center" justifyContent="center">
      <VStack space={2}>
        <AspectRatio
          w={lottieWidth > 200 ? lottieWidth : 250}
          ratio={1}
          mx="auto"
        >
          <Box>
            <Lottie
              source={require("../../assets/lottie/empty.json")}
              autoPlay={true}
              loop={true}
            />
          </Box>
        </AspectRatio>
        <Heading textAlign="center">{headerText || "No sessions"}</Heading>
        <Text
          fontSize={14}
          maxW={width * 0.75}
          textAlign="center"
          opacity={0.5}
        >
          {message ||
            "Looks like you have not joined any Cleep sessions on this device."}
        </Text>
      </VStack>
    </Box>
  );
}
