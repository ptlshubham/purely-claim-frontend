import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddFacilitiesRoutingModule } from './add-facilities-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddFacilitiesComponent } from './add-facilities.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddFacilitiesComponent,
  ],
  imports: [
    CommonModule,
    AddFacilitiesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AddFacilitiesModule { }
