import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacilityTypeComponent } from './facility-type.component';

const routes: Routes = [{ path:'', component:FacilityTypeComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacilityTypeRoutingModule { }
