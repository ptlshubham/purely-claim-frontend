import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
//import { EmployeelistComponent } from './employeelist/employeelist.component';
import { EmployeeComponent } from './employee.component';
//import { EmployeeListComponent } from './employee-list/employee-list.component';
import { FormGroup,FormControl, Validators, ReactiveFormsModule,FormBuilder } from '@angular/forms';

@NgModule({
  declarations: [
    
    
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule
    
  ]
})
export class EmployeeModule { 
//   employeeForm: FormGroup;

//   constructor(private fb: FormBuilder) {
//     this.employeeForm = this.fb.group({
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
      
//     });
// }
}

