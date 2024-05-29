import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialityComponent } from './speciality.component';

const routes: Routes = [{path:'', component:SpecialityComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialityRoutingModule { }
