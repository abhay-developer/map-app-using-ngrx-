import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { LoadPinsEffect } from "../pin-state/load-pins.effects";
import { loadPinsReducer } from "../pin-state/load-pins.reducers";
import { LOAD_PINS_STATE_NAME } from "../pin-state/load-pins.selectors";
import { UpdateAndDeletePinsComponent } from "./update-and-delete-pins/update-and-delete-pins.component";
import { UpdatePinComponent } from './update-pin/update-pin.component';

const routes:Routes=[
      {path:'', component:UpdateAndDeletePinsComponent,children:[
            {path:'update/:id',component:UpdatePinComponent}
      ]}
]

@NgModule({
      declarations:[
            UpdateAndDeletePinsComponent,
            UpdatePinComponent
      ],
      imports:[
            CommonModule,
            RouterModule.forChild(routes),
            StoreModule.forFeature(LOAD_PINS_STATE_NAME,loadPinsReducer),
            EffectsModule.forFeature([LoadPinsEffect]),
            ReactiveFormsModule
      ]
})
export class UpdateDeleteModule{}