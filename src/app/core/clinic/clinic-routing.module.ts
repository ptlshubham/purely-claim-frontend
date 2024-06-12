import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicComponent } from './clinic.component';

const routes: Routes = [{
  path: '', component: ClinicComponent,
  children: [
    {
      path: 'add-clinic',
      loadChildren: () => import('./add-clinic/add-clinic.module').then((m) => m.AddClinicModule),
    },

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicRoutingModule { }
