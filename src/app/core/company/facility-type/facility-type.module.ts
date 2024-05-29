import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacilityTypeRoutingModule } from './facility-type-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FacilityTypeComponent } from './facility-type.component';

@NgModule({
  declarations: [
    FacilityTypeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FacilityTypeRoutingModule
  ]
})
export class FacilityTypeModule { }
