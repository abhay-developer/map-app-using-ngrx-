import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { exhaustMap, map, of, switchMap, withLatestFrom } from "rxjs";
import { AppState } from "src/app/app-state/app.state";
import { PinsService } from "src/app/services/pins.service";
import { deletePin, deletePinSuccess, dummyAction, loadAllPins, loadAllPinsSuccess, navigateToLoadPins, navigateToSpecificPin, navigateToUpdatePin, updatePin, updatePinSuccess, zoomSpecificPin, zoomSpecificPinSuccess } from "./load-pins.actions";
import { getPins } from "./load-pins.selectors";

@Injectable()
export class LoadPinsEffect{
      constructor(private action$:Actions,private pinsService:PinsService,private router:Router,private store:Store<AppState>){}

      loadPins$ = createEffect(()=>{
            return this.action$.pipe(ofType(loadAllPins),
            withLatestFrom(this.store.select(getPins)),
            switchMap(([action,records])=>{
                  if(!records.length){
                        return this.pinsService.getAllPins().pipe(map((records)=>{
                              return loadAllPinsSuccess({records})
                        }))
                  }else{
                        return of(dummyAction())
                  }
            }))
      });

      navigateToSpecificPin$ = createEffect(()=>{
            return this.action$.pipe(ofType(navigateToSpecificPin),map((action)=>{
                  this.router.navigate(['load-pins/'+action.pinId])
            }))
      },{dispatch:false});

      navigateToLoadPins$ = createEffect(()=>{
            return this.action$.pipe(ofType(navigateToLoadPins),map((action)=>{
                  this.router.navigate(['/load-pins'])
            }))
      },{dispatch:false})

      zoomSpecificPin$ = createEffect(()=>{
            return this.action$.pipe(ofType(zoomSpecificPin),exhaustMap((action)=>{
                  return this.pinsService.getSpecifcPinData(action.id).pipe(map(record=>{
                        return zoomSpecificPinSuccess({selectedPinData:record});
                  }))
            }))
      });

      navigateToUpdatePin$ = createEffect(()=>{
            return this.action$.pipe(ofType(navigateToUpdatePin),map((action)=>{
                  this.router.navigate(['/update-delete/update/'+action.pinId]);
            }))
      },{dispatch:false});

      updatePin$ = createEffect(()=>{
            return this.action$.pipe(ofType(updatePin),exhaustMap((action)=>{
                  return this.pinsService.updateRecord(action.pinId,action.lng,action.lat,action.fav).pipe(map((record)=>{
                        return updatePinSuccess({record})
                  }))
            }))
      });

      updatePinSuccess$ = createEffect(()=>{
            return this.action$.pipe(ofType(updatePinSuccess),map((action)=>{
                  this.router.navigate(['/update-delete']);
            }))
      },{dispatch:false});

      deletePin$ = createEffect(()=>{
            return this.action$.pipe(ofType(deletePin),map((action)=>{
                  return deletePinSuccess({id:action.id});
            }))
      })
}