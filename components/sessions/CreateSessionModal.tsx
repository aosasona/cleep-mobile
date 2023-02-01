import { Feather } from "@expo/vector-icons";
import {
  Button,
  Icon,
  IconButton,
  Input,
  Modal,
  useColorModeValue,
} from "native-base";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { createSession } from "../../lib/requests/session";
import { handleException } from "../../lib/error";
import { showToast } from "../../lib/toast";
import { GlobalContext } from "../../context/global/Provider";

interface Props {
  signingKey: string;
  show: boolean;
  toggleShow: () => void;
  setSigningKey: Dispatch<SetStateAction<string>>;
}

export default function CreateModal({
  signingKey,
  show,
  toggleShow,
  setSigningKey,
}: Props) {
  const { state } = useContext(GlobalContext);

  const [showKey, setShowKey] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const bg = useColorModeValue("muted.50", "muted.900");
  const color = useColorModeValue("muted.900", "muted.50");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = await createSession(
        signingKey,
        state.defaultSessionDuration
      );
      setSigningKey("");
      toggleShow();
    } catch (err) {
      const msg = handleException(err);
      showToast("Error", msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={show}
      onClose={toggleShow}
      size="xl"
      _backdrop={{ opacity: 0.85 }}
      avoidKeyboard={true}
      closeOnOverlayClick={true}
    >
      <Modal.Content bg={bg}>
        <Modal.CloseButton />
        <Modal.Header bg={bg} borderBottomWidth={0} pt={5}>
          New Session
        </Modal.Header>
        <Modal.Body bg={bg} px={1} pt={1} pb={0} _scrollview={{ bg }}>
          <Input
            bg={bg}
            type={showKey ? "text" : "password"}
            textAlign="center"
            variant="filled"
            placeholder="Enter a signing key"
            value={signingKey}
            onChangeText={setSigningKey}
            InputRightElement={
              <IconButton
                icon={<Icon as={Feather} name={!showKey ? "eye-off" : "eye"} />}
                _icon={{ size: 4, color: color, mx: 2 }}
                onPress={() => setShowKey(!showKey)}
              />
            }
          />
        </Modal.Body>
        <Modal.Footer bg={bg} borderTopWidth={0} pb={6}>
          <Button
            w="full"
            bg="primary"
            py={4}
            px={4}
            rounded={6}
            _text={{ fontSize: 12 }}
            _pressed={{ opacity: 0.5 }}
            isLoading={loading}
            onPress={handleSubmit}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
