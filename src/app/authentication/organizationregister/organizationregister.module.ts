import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { ReactiveFormsModule } from '@angular/forms';
import { OrganizationregisterRoutingModule } from './organizationregister-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OrganizationregisterRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class OrganizationregisterModule { }
