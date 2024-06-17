import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFacilityComponent } from './employee-facility.component';

const routes: Routes = [{ path: '', component: EmployeeFacilityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeFacilityRoutingModule { }
