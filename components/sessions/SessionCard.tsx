import { Feather } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import {
  Box,
  Checkbox,
  HStack,
  Icon,
  Pressable,
  Text,
  useColorModeValue,
  VStack,
} from "native-base";
import { useMemo } from "react";
import { screens } from "../../constants/screens";
import { Session } from "../../lib/db/database";
import { hasExpired } from "../../lib/time";

interface Props {
  idx: number;
  session: Session;
  isEditing: boolean;
  selected: number[];
  handleSelect: (idx: number) => void;
  navigation: NavigationProp<any>;
}

export default function SessionCard({
  idx,
  session,
  selected,
  isEditing,
  handleSelect,
  navigation,
}: Props) {
  const isSelected = useMemo(
    () => selected.includes(idx),
    [isEditing, selected]
  );

  const dur = Math.ceil(session.duration / 24);

  const highlightBg = useColorModeValue("muted.200", "muted.900");

  const expired = useMemo(
    () => hasExpired(session.created_at, session.duration),
    [session]
  );

  const goToCleepboard = () => {
    navigation.navigate(screens.CLEEPBOARD, { session_id: session.session_id });
  };

  return (
    <Pressable
      bg={isSelected ? highlightBg : "transparent"}
      _pressed={{ opacity: 0.5 }}
      disabled={expired}
      py={3}
      px={3}
      onPress={() => (isEditing ? handleSelect(idx) : goToCleepboard())}
    >
      <HStack justifyContent="space-between" alignItems="center">
        <Box>
          <HStack alignItems="center" space={3}>
            {isEditing && (
              <Checkbox
                isChecked={isSelected}
                value={"select" + idx}
                rounded="full"
                accessibilityLabel="Select session"
                onChange={() => handleSelect(idx)}
                mx={1}
              />
            )}
            <VStack space={1}>
              <Text opacity={expired ? 0.4 : 1} strikeThrough={expired}>
                {session.session_id}
              </Text>
              <Text fontSize={12} opacity={0.4}>
                {dur} day{dur > 1 && "s"}
              </Text>
            </VStack>
          </HStack>
        </Box>
        <Icon as={Feather} name="chevron-right" opacity={0.4} />
      </HStack>
    </Pressable>
  );
}
