import { ColorMode } from "native-base";
import { Dispatch } from "react";
import Keys from "../../constants/keys";
import { getSessions } from "../../lib/db/session";
import { Session } from "../../lib/db/database";
import storage from "../../lib/storage/default";

export interface GlobalState {
  isLoadingSessions?: boolean;
  sessions?: Session[];
  colorMode?: ColorMode;
  defaultSessionDuration?: number;
  hasBarCodePermission?: boolean;
}

export enum GlobalActionEnum {
  LOAD_SESSIONS,
  LOAD_COLOR_MODE,
  LOAD_DEFAULT_SESSION_DURATION,
  LOAD_BARCODE_PERMISSION,
  TOGGLE_COLOR_MODE,
  TOGGLE_BARCODE_PERMISSION,
  CHANGE_DEFAULT_SESSION_DURATION,
}

export interface GlobalReducerAction {
  type: GlobalActionEnum;
  payload: GlobalState;
}

export default function globalReducer(
  state: GlobalState,
  action: GlobalReducerAction
): GlobalState {
  switch (action.type) {
    case GlobalActionEnum.LOAD_SESSIONS:
      const sessions = getSessions();
      return {
        ...state,
        sessions,
        isLoadingSessions: false,
      };

    case GlobalActionEnum.LOAD_COLOR_MODE:
      const colorMode = (storage.getString(Keys.COLOR_MODE) ||
        "light") as ColorMode;
      return {
        ...state,
        colorMode,
      };

    case GlobalActionEnum.LOAD_BARCODE_PERMISSION:
      const hasBarCodePermission =
        storage.getBoolean(Keys.BARCODE_PERMISSION) || false;
      return {
        ...state,
        hasBarCodePermission,
      };

    case GlobalActionEnum.LOAD_DEFAULT_SESSION_DURATION:
      const defaultSessionDuration =
        storage.getNumber(Keys.DEFAULT_SESSION_DURATION) || 1;
      return {
        ...state,
        defaultSessionDuration,
      };

    case GlobalActionEnum.TOGGLE_COLOR_MODE:
      return {
        ...state,
        colorMode: action.payload.colorMode,
      };

    case GlobalActionEnum.TOGGLE_BARCODE_PERMISSION:
      storage.set(Keys.BARCODE_PERMISSION, action.payload.hasBarCodePermission);
      return {
        ...state,
        hasBarCodePermission: action.payload.hasBarCodePermission,
      };

    case GlobalActionEnum.CHANGE_DEFAULT_SESSION_DURATION:
      storage.set(
        Keys.DEFAULT_SESSION_DURATION,
        action.payload.defaultSessionDuration
      );
      return {
        ...state,
        defaultSessionDuration: action.payload.defaultSessionDuration,
      };

    default:
      return state;
  }
}

export function multiDispatch(
  dispatch: Dispatch<GlobalReducerAction>,
  keys: GlobalActionEnum[]
) {
  for (const key of keys) {
    dispatch({ type: key, payload: {} });
  }
}
