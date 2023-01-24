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
    colorMode: "light",
  };

  const [state, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    dispatch({ type: GlobalActionEnum.LOAD_COLOR_MODE, payload: {} });
    dispatch({ type: GlobalActionEnum.LOAD_BARCODE_PERMISSION, payload: {} });
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
