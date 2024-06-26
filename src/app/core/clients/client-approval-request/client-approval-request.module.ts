import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientApprovalRequestRoutingModule } from './client-approval-request-routing.module';
import { ClientApprovalRequestComponent } from './client-approval-request.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ClientApprovalRequestComponent
  ],
  imports: [
    CommonModule,
    ClientApprovalRequestRoutingModule,
    SharedModule,

  ]
})
export class ClientApprovalRequestModule { }
