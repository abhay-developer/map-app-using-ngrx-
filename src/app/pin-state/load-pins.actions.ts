import { createAction, props } from "@ngrx/store";
import { recordsType } from "src/app/shared/location-pins";

export const LOAD_PINS_ACTION = '[load pins page] load all pins';
export const LOAD_PINS_SUCCESS = '[load pins page] load all pins success';
export const ZOOM_SPECIFIC_PIN = '[spicific pin page] zoom specific pin';
export const ZOOM_SPECIFIC_PIN_SUCCESS = '[spicific pin page] zoom specific pin success';
export const NAVIGATE_TO_SPECIFIC_PIN = '[load pins page] navigate to specific pin';
export const NAVIGATE_TO_LOAD_PINS = '[load pins page] navigate to load pins';
export const NAVIGATE_TO_UPDATE_PIN = '[update-delete load pins page] navigate to update pins';
export const UPDATE_PIN_ACTION = '[update pin page] update pin';
export const UPDATE_PIN_SUCCESS = '[update pin page] update pin success';
export const MAKE_UPDATE_PIN_NULL = '[update pin page] update pin null'
export const TO_BE_UPDATED_PIN_DATA = '[update pin page] set update data'
export const DELETE_PIN_ACTION = '[update pin page] delete pin';
export const DELETE_PIN_SUCCESS = '[update pin page] delete pin success';

export const loadAllPins = createAction(LOAD_PINS_ACTION);
export const loadAllPinsSuccess = createAction(LOAD_PINS_SUCCESS,props<{records:recordsType[]}>());

export const zoomSpecificPin = createAction(ZOOM_SPECIFIC_PIN,props<{id:number}>());
export const zoomSpecificPinSuccess = createAction(ZOOM_SPECIFIC_PIN_SUCCESS,props<{selectedPinData:recordsType|undefined}>());

export const navigateToSpecificPin = createAction(NAVIGATE_TO_SPECIFIC_PIN,props<{pinId:number}>());
export const navigateToLoadPins = createAction(NAVIGATE_TO_LOAD_PINS);
export const navigateToUpdatePin = createAction(NAVIGATE_TO_UPDATE_PIN,props<{pinId:number}>());

export const updatePin = createAction(UPDATE_PIN_ACTION,props<{lng:string,lat:string,pinId:number|undefined,fav:boolean}>());
export const updatePinSuccess = createAction(UPDATE_PIN_SUCCESS,props<{record:recordsType|undefined}>());
export const makeUpdatePinNull = createAction(MAKE_UPDATE_PIN_NULL);

export const toBeUpdatePinData = createAction(TO_BE_UPDATED_PIN_DATA,props<{record:recordsType}>());

export const deletePin = createAction(DELETE_PIN_ACTION,props<{id:number}>());
export const deletePinSuccess = createAction(DELETE_PIN_SUCCESS,props<{id:number}>());

export const dummyAction = createAction('dummyAction');