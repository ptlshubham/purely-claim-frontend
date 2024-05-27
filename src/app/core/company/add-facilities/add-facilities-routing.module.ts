import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFacilitiesComponent } from './add-facilities.component';

const routes: Routes = [{ path:'', component:AddFacilitiesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddFacilitiesRoutingModule { }
