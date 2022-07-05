import { recordsType } from "src/app/shared/location-pins";

export interface LOAD_PINS_STATE{
      records:recordsType[],
      selectedPinData:recordsType|undefined,
      updatedPinData:recordsType|undefined,
      toBeUpatePinData:recordsType|undefined,
      deletePinId:number|undefined
}

export const pinsInitialState:LOAD_PINS_STATE={
      records:[],
      selectedPinData:undefined,
      updatedPinData:undefined,
      toBeUpatePinData:undefined,
      deletePinId:undefined
}