// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { EmployeeListRoutingModule } from './employee-list-routing.module';


// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule,
//     EmployeeListRoutingModule
//   ]
// })
// export class EmployeeListModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeListRoutingModule } from './employee-list-routing.module';
import { EmployeeListComponent } from './employee-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    EmployeeListRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EmployeeListModule { }
