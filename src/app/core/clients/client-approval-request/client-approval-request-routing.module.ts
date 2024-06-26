import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientApprovalRequestComponent } from './client-approval-request.component';

const routes: Routes = [{ path: '', component: ClientApprovalRequestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientApprovalRequestRoutingModule { }
