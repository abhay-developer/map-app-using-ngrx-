import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',loadChildren:()=>{
    return import('./load-pins/load-pins.module').then((m)=>{
      return m.LoadPinsModule;
    })
  }},
  {path:'update-delete',loadChildren:()=>{
    return import('./update-remove-pins/update-delete.module').then((m)=>{
      return m.UpdateDeleteModule
    })
  }},
  {path:'search-location',loadChildren:()=>{
    return import('./search/search.module').then((m)=>{
      return m.SearchModule
    })
  }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
