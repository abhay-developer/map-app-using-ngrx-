import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { LoadAllPinsComponent } from "./load-all-pins/load-all-pins.component";
import { LoadPinsEffect } from "../pin-state/load-pins.effects";
import { loadPinsReducer } from "../pin-state/load-pins.reducers";
import { LOAD_PINS_STATE_NAME } from "../pin-state/load-pins.selectors";
import { SpecificPinComponent } from './specific-pin/specific-pin.component';

const routes:Routes=[
      {path:'',children:[
            {path:'',redirectTo:'load-pins',pathMatch:'full'},
            {path:'load-pins',component:LoadAllPinsComponent},
            {path:'load-pins/:id',component:SpecificPinComponent}
      ]}
]

@NgModule({
      declarations:[
            LoadAllPinsComponent,
            SpecificPinComponent
      ],
      imports:[
            CommonModule,
            RouterModule.forChild(routes),
            StoreModule.forFeature(LOAD_PINS_STATE_NAME,loadPinsReducer),
            EffectsModule.forFeature([LoadPinsEffect])
      ]
})
export class LoadPinsModule{}