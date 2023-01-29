import { Checkbox, HStack, Pressable, Text, VStack } from "native-base";
import { useMemo } from "react";
import { Session } from "../../lib/db/database";

interface Props {
  idx: number;
  session: Session;
  isEditing: boolean;
  selected: number[];
  handleSelect: (idx: number, select: boolean) => void;
}

export default function SessionCard({
  idx,
  session,
  selected,
  isEditing,
  handleSelect,
}: Props) {
  const isSelected = useMemo(
    () => selected.includes(idx),
    [isEditing, selected]
  );

  const dur = Math.ceil(session.duration / 24);

  return (
    <Pressable>
      <HStack alignItems="center" space={3}>
        {isEditing && (
          <Checkbox
            isChecked={isSelected}
            value={"select" + idx}
            rounded="full"
            colorScheme="rose"
            accessibilityLabel="Select session"
            onChange={(val) => handleSelect(idx, val)}
          />
        )}
        <VStack space={1}>
          <Text>{session.session_id}</Text>
          <Text fontSize={12} opacity={0.4}>
            {dur} day{dur > 1 && "s"}
          </Text>
        </VStack>
      </HStack>
    </Pressable>
  );
}
