import { Feather } from "@expo/vector-icons";
import {
  Button,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  useColorModeValue,
} from "native-base";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  meta: { headerText: string; buttonText: string; placeholder?: string };
  isPasswordField?: boolean;
  value: string;
  setValue: (value: string) => void | Dispatch<SetStateAction<any>>;
  show: boolean;
  toggleShow: () => void;
  loading: boolean;
  toggleloading?: (value?: boolean) => void;
  handleSubmit: (...data: any) => any;
}

export default function CustomPrompt({
  meta,
  isPasswordField,
  value,
  show,
  loading,
  setValue,
  toggleShow,
  handleSubmit,
}: Props) {
  const [isText, setIsText] = useState(true);
  const bg = useColorModeValue("muted.50", "muted.900");
  const color = useColorModeValue("muted.900", "muted.50");

  return (
    <Modal
      isOpen={show}
      onClose={toggleShow}
      size="xl"
      _backdrop={{ opacity: 0.9 }}
      avoidKeyboard={true}
      closeOnOverlayClick={true}
    >
      <Modal.Content bg={bg}>
        <Modal.CloseButton />
        <Modal.Header bg={bg} borderBottomWidth={0} pt={5}>
          {meta.headerText}
        </Modal.Header>
        <Modal.Body bg={bg} px={1} pt={1} pb={0} _scrollview={{ bg }}>
          <Input
            bg={bg}
            type={isText ? "text" : "password"}
            textAlign="center"
            variant="filled"
            placeholder={meta.placeholder || "Enter sesison's signing key"}
            value={value}
            onChangeText={setValue}
            InputRightElement={
              isPasswordField ? (
                <IconButton
                  icon={<Icon as={Feather} name={isText ? "eye-off" : "eye"} />}
                  _icon={{ size: 4, color: color, mx: 2 }}
                  onPress={() => setIsText(!isText)}
                />
              ) : null
            }
          />
        </Modal.Body>
        <Modal.Footer bg={bg} borderTopWidth={0} pb={6}>
          <HStack w="full" justifyContent="space-around" space={2}>
            <Button
              w="45%"
              bg="transparent"
              py={4}
              px={4}
              rounded={6}
              _text={{ color: color, fontSize: 12 }}
              _pressed={{ opacity: 0.5 }}
              onPress={toggleShow}
            >
              Cancel
            </Button>
            <Button
              w="45%"
              bg="primary"
              py={4}
              px={4}
              rounded={6}
              _text={{ fontSize: 12 }}
              _pressed={{ opacity: 0.5 }}
              isLoading={loading}
              onPress={handleSubmit}
            >
              {meta.buttonText}
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
