import { createFeatureSelector, createSelector, props } from "@ngrx/store";
import { recordsType } from "../shared/location-pins";
import { LOAD_PINS_STATE } from "./load-pins.state";

export const LOAD_PINS_STATE_NAME = 'loadPins';

const getLoadAllPinsState = createFeatureSelector<LOAD_PINS_STATE>(LOAD_PINS_STATE_NAME);

export const getPins = createSelector(getLoadAllPinsState,(state)=>{
      return state.records;
});

export const getSelectedPinData = createSelector(getLoadAllPinsState,(state)=>{
      return state.selectedPinData;
});

export const getUpdatedPinData = createSelector(getLoadAllPinsState,(state)=>{
      return state.updatedPinData;
});

export const getToBeUpdatedData = createSelector(getLoadAllPinsState,(state)=>{
      return state.toBeUpatePinData;
});

export const getDeletedPinId = createSelector(getLoadAllPinsState,(state)=>{
      return state.deletePinId;
})