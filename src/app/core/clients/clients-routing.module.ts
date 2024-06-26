import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';

const routes: Routes = [{
  path: '', component: ClientsComponent,
  children: [
    {
      path: 'client-approval-request',
      loadChildren: () => import('./client-approval-request/client-approval-request.module').then((m) => m.ClientApprovalRequestModule),
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
