import { createReducer, on } from "@ngrx/store"
import { recordsType } from "../shared/location-pins"
import { deletePin, deletePinSuccess, loadAllPinsSuccess, makeUpdatePinNull, toBeUpdatePinData, updatePin, updatePinSuccess, zoomSpecificPin, zoomSpecificPinSuccess } from "./load-pins.actions"
import { pinsInitialState } from "./load-pins.state"

const _loadPinsReducer = createReducer(pinsInitialState,
      on(loadAllPinsSuccess,(state,action)=>{
            return{
                  ...state,
                  records:action.records
            }
      }),
      on(zoomSpecificPinSuccess,(state,action)=>{
            return{
                  ...state,
                  selectedPinData:action.selectedPinData
            }
      }),
      on(updatePinSuccess,(state,action)=>{
            let updateRecord:recordsType[]=[]
            if(action.record){
                  updateRecord=state.records.map((val)=>{
                        if(val.propertyID==action.record?.propertyID){
                              return action.record;
                        }else{
                              return val;
                        }
                  });
            }else{
                  updateRecord=state.records;
            }
            return{
                  ...state,
                  records:updateRecord,
                  updatedPinData:action.record,
                  updatePinId:action.record?.propertyID
            }
      }),
      on(makeUpdatePinNull,(state)=>{
            return{
                  ...state,
                  updatedPinData:undefined,
            }
      }),
      on(toBeUpdatePinData,(state,action)=>{
            return{
                  ...state,
                  toBeUpatePinData:action.record
            }
      }),
      on(deletePin,(state,action)=>{
            const reocrds = state.records.filter((record)=>{
                  return record.propertyID!=action.id
            });

            return{
                  ...state,
                  records:reocrds
            }
      }),
      on(deletePinSuccess,(state,action)=>{
            return{
                  ...state,
                  deletePinId:action.id
            }
      })
)

export function loadPinsReducer(state:any,action:any){
      return _loadPinsReducer(state,action)
}