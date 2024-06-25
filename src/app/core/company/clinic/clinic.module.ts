import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClinicRoutingModule } from './clinic-routing.module';
import { ClinicComponent } from './clinic.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    ClinicComponent
  ],
  imports: [
    CommonModule,
    ClinicRoutingModule,
    SharedModule,
    MatAutocompleteModule
  ]
})
export class ClinicModule { }
