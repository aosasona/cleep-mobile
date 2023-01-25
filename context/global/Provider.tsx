import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from "react";
import globalReducer, {
  GlobalState,
  GlobalReducerAction,
  GlobalActionEnum,
  multiDispatch,
} from "./Reducer";

interface ProviderProps {
  children: ReactNode;
}

interface GlobalContextType {
  state: GlobalState;
  dispatch: Dispatch<GlobalReducerAction>;
}

const GlobalContext = createContext<GlobalContextType>(null);

function GlobalProvider({ children }: ProviderProps) {
  const initialState: GlobalState = {
    isLoadingSessions: true,
    sessions: [],
    colorMode: "light",
    hasBarCodePermission: false,
    defaultSessionDuration: 1,
  };

  const [state, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    multiDispatch(dispatch, [
      GlobalActionEnum.LOAD_COLOR_MODE,
      GlobalActionEnum.LOAD_DEFAULT_SESSION_DURATION,
      GlobalActionEnum.LOAD_BARCODE_PERMISSION,
      GlobalActionEnum.LOAD_SESSIONS,
    ]);
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
