import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SearchLocationComponent } from './search-location/search-location.component';

const routes: Routes = [
      {path:'',component:SearchLocationComponent}
];

@NgModule({
      declarations:[
            SearchLocationComponent
      ],
      imports: [
            RouterModule.forChild(routes),
            ReactiveFormsModule,
            CommonModule,
            HttpClientModule
      ]
})
export class SearchModule { }
