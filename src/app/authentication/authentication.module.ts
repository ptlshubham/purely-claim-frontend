import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { OrganizationregisterComponent } from './organizationregister/organizationregister.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrganizationloginComponent } from './organizationlogin/organizationlogin.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [
    AuthenticationComponent,
    OrganizationregisterComponent,
    OrganizationloginComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatSelectModule

  ]
})
export class AuthenticationModule { }
