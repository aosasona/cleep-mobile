import { ColorMode } from "native-base";
import Keys from "../../constants/keys";
import storage from "../../lib/storage/default";

export interface GlobalState {
  colorMode?: ColorMode;
  hasBarCodePermission?: boolean;
}

export enum GlobalActionEnum {
  LOAD_COLOR_MODE,
  LOAD_BARCODE_PERMISSION,
  TOGGLE_COLOR_MODE,
  TOGGLE_BARCODE_PERMISSION,
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

    default:
      return state;
  }
}
