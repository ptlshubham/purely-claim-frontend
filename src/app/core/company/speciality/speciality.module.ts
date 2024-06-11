import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { SpecialityRoutingModule } from './speciality-routing.module';
import { SpecialityComponent } from './speciality.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    SpecialityComponent
  ],
  imports: [
    CommonModule,
    SpecialityRoutingModule,
    SharedModule,
    NgSelectModule,
    ToastrModule

  ]
})
export class SpecialityModule { }
