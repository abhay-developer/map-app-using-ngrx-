import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { loadPinsReducer } from "../pin-state/load-pins.reducers";
import { LOAD_PINS_STATE_NAME } from "../pin-state/load-pins.selectors";
import { LOAD_PINS_STATE } from "../pin-state/load-pins.state";

export interface AppState{
      [LOAD_PINS_STATE_NAME]:LOAD_PINS_STATE,
      router:RouterReducerState
}

export const appReducer={
      [LOAD_PINS_STATE_NAME]:loadPinsReducer,
      router:routerReducer
}