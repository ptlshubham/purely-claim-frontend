import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClinicComponent } from './add-clinic.component';

const routes: Routes = [{ path: '', component: AddClinicComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddClinicRoutingModule { }
