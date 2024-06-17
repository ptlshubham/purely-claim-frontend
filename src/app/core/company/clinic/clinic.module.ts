import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClinicRoutingModule } from './clinic-routing.module';
import { ClinicComponent } from './clinic.component';

@NgModule({
  declarations: [
    ClinicComponent
  ],
  imports: [
    CommonModule,
    ClinicRoutingModule,
    SharedModule
  ]
})
export class ClinicModule { }
