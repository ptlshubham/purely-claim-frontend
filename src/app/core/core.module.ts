import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { HeaderComponent } from '../common-component/header/header.component';
import { SidebarComponent } from '../common-component/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeeComponent } from './employee/employee.component';
//import { EmployeeListComponent } from './employee-list/employee-list.component';
//import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent,
    SidebarComponent,
    EmployeeComponent,
    
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ],
})
export class CoreModule { }
