import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddClinicRoutingModule } from './add-clinic-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddClinicComponent } from './add-clinic.component';

@NgModule({
  declarations: [
    AddClinicComponent
  ],
  imports: [
    CommonModule,
    AddClinicRoutingModule,
    SharedModule,
    ReactiveFormsModule,


  ]
})
export class AddClinicModule { }
