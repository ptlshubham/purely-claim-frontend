import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFacilityRoutingModule } from './employee-facility-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmployeeFacilityRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    
  ]
})
export class EmployeeFacilityModule { }
