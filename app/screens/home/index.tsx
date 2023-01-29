import {AntDesign} from "@expo/vector-icons";
import {Box, Button, Divider, Fab, Heading, Icon, ScrollView, Spinner, VStack} from "native-base";
import {useContext, useEffect, useState} from "react";
import {RefreshControl} from "react-native";
import CreateModal from "../../../components/sessions/CreateSessionModal";
import NoSessions from "../../../components/sessions/NoSessions";
import SessionCard from "../../../components/sessions/SessionCard";
import {GlobalContext} from "../../../context/global/Provider";
import {GlobalActionEnum} from "../../../context/global/Reducer";
import {showToast} from "../../../lib/toast";
import {ScreenProps} from "../../../lib/types";

export default function Home({navigation}: ScreenProps) {
	const {state, dispatch} = useContext(GlobalContext);

	const [refreshing, setRefreshing] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [selected, setSelected] = useState<number[]>([]);
	const [signingKey, setSigningKey] = useState("");

	const onRefresh = () => {
		try {
			setRefreshing(true);
			dispatch({type: GlobalActionEnum.LOAD_SESSIONS, payload: {}});
		}
		catch (error) {
			showToast("Error", "Failed to refresh", "error");
		}
		finally {
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

	const handleMultipleSelect = (select: boolean) => {
		if (!select) return setSelected([]);

		const sel = [];
		for (let idx = 0; idx < state.sessions.length; idx++) {
			sel.push(idx);
		}
		return setSelected(sel);
	};

	const handleSessionCardSelect = (idx: number) => {
		if (selected.includes(idx)) {
			const filtered = selected.filter((val) => val != idx);
			setSelected(filtered);
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
				_text={{fontSize: 18, fontWeight: 400, color: "primary"}}
				_pressed={{opacity: 0.5}}
				onPress={toggleEditing}
			  >
				  {isEditing ? "Cancel" : "Edit"}
			  </Button>
			),
			headerLeft: () =>
			  isEditing && (
				<Button
				  _text={{fontSize: 18, fontWeight: 400, color: "primary"}}
				  _pressed={{opacity: 0.5}}
				  onPress={() =>
					handleMultipleSelect(state.sessions.length != selected.length)
				  }
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
			px={0}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
			}
		  >
			  <Heading fontSize={40} px={3}>
				  Sessions
			  </Heading>

			  {state.isLoadingSessions ? (
				<Box height={100} justifyContent="center">
					<Spinner color="primary"/>
				</Box>
			  ) : state.sessions?.length > 0 ? (
				<VStack divider={<Divider opacity={0.3}/>} mt={2}>
					{state.sessions.map((session, idx) => (
					  <SessionCard
						key={idx}
						idx={idx}
						selected={selected}
						session={session}
						isEditing={isEditing}
						handleSelect={handleSessionCardSelect}
						navigation={navigation}
					  />
					))}
				</VStack>
			  ) : (
				<NoSessions/>
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
			icon={<Icon color="muted.50" as={AntDesign} name="plus" size="2xl"/>}
			onPress={toggleCreateModal}
		  />
	  </>
	);
}