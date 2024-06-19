import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient.component';
const routes: Routes = [{
  path: '', component: PatientComponent,
  children: [
    {
      path: 'add-patient',
      loadChildren: () => import('./add-patient/add-patient.module').then((m) => m.AddPatientModule),
    },
  ]
}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
