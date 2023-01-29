import { AntDesign } from "@expo/vector-icons";
import { Stack, useNavigation } from "expo-router";
import {
  ScrollView,
  Heading,
  HStack,
  IconButton,
  Icon,
  Box,
  Spinner,
  VStack,
  Fab,
  Button,
} from "native-base";
import { Fragment, useContext, useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import CustomSafeAreaView from "../../components/custom/CustomSafeAreaView";
import { GlobalContext } from "../../context/global/Provider";
import { GlobalActionEnum } from "../../context/global/Reducer";
import { showToast } from "../../lib/toast";
import NoSessions from "../../components/sessions/NoSessions";
import CreateModal from "../../components/sessions/CreateSessionModal";
import SessionCard from "../../components/sessions/SessionCard";

export default function Home() {
  const { state, dispatch } = useContext(GlobalContext);
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [signingKey, setSigningKey] = useState("");

  const onRefresh = () => {
    try {
      setRefreshing(true);
      dispatch({ type: GlobalActionEnum.LOAD_SESSIONS, payload: {} });
    } catch (error) {
      showToast("Error", "Failed to refresh", "error");
    } finally {
      setRefreshing(false);
    }
  };

  const toggleEditing = () => {
    if (isEditing) {
      setSelected([]);
    }
    setIsEditing(!isEditing);
  };

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  const selectAll = () => {
    state.sessions.forEach((_, idx) => {
      handleSessionCardSelect(idx, state.sessions.length != selected.length);
    });
  };

  const handleSessionCardSelect = (idx: number, select: boolean) => {
    if (!select) {
      if (selected.includes(idx)) {
        const filtered = selected.filter((val) => val != idx);
        setSelected(filtered);
      }
      return;
    }
    setSelected((prev) => [...prev, idx]);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "",
      headerRight: () => (
        <Button
          _text={{ fontSize: 18, fontWeight: 400, color: "primary" }}
          _pressed={{ opacity: 0.5 }}
          onPress={toggleEditing}
        >
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      ),
      headerLeft: () =>
        isEditing && (
          <Button
            _text={{ fontSize: 18, fontWeight: 400, color: "primary" }}
            _pressed={{ opacity: 0.5 }}
            onPress={selectAll}
          >
            {state.sessions.length == selected.length
              ? "Deselect All"
              : "Select all"}
          </Button>
        ),
    });
  }, [state.sessions, selected, isEditing]);

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Stack.Screen options={{ headerShown: false }} />

        {state.isLoadingSessions ? (
          <Box height={100} justifyContent="center">
            <Spinner color="primary" />
          </Box>
        ) : state.sessions?.length > 0 ? (
          <VStack>
            {state.sessions.map((session, idx) => (
              <SessionCard
                key={idx}
                idx={idx}
                selected={selected}
                session={session}
                isEditing={isEditing}
                handleSelect={handleSessionCardSelect}
              />
            ))}
          </VStack>
        ) : (
          <NoSessions />
        )}
      </ScrollView>
      <CreateModal
        show={showCreateModal}
        signingKey={signingKey}
        toggleShow={toggleCreateModal}
        setSigningKey={setSigningKey}
      />
      <Fab
        renderInPortal={false}
        shadow={3}
        bottom={6}
        right={6}
        bg="primary"
        icon={<Icon color="muted.50" as={AntDesign} name="plus" size="2xl" />}
        onPress={toggleCreateModal}
      />
    </>
  );
}
