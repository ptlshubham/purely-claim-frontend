import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { SpecialityRoutingModule } from './speciality-routing.module';
import { SpecialityComponent } from './speciality.component';


@NgModule({
  declarations: [
    SpecialityComponent
  ],
  imports: [
    CommonModule,
    SpecialityRoutingModule,
    SharedModule
  ]
})
export class SpecialityModule { }
