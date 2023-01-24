import { AntDesign } from "@expo/vector-icons";
import { Stack } from "expo-router";
import {
  ScrollView,
  Heading,
  HStack,
  IconButton,
  Icon,
  Modal,
  useDisclose,
  Actionsheet,
  Box,
  Text,
  useColorModeValue,
  Slider,
} from "native-base";
import { useState } from "react";
import CustomSafeAreaView from "../../components/custom/CustomSafeAreaView";

export default function Home() {
  return (
    <CustomSafeAreaView>
      <ScrollView>
        <Stack.Screen options={{ headerShown: false }} />
        <HStack justifyContent="space-between" alignItems="center">
          <Heading fontSize={32} mt={2}>
            Sessions
          </Heading>
          <IconButton
            icon={<Icon as={AntDesign} name="pluscircleo" />}
            _icon={{ size: "md", color: "primary" }}
            _pressed={{ opacity: 0.5 }}
          />
        </HStack>
      </ScrollView>
    </CustomSafeAreaView>
  );
}
