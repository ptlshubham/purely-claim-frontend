import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';

const routes: Routes = [{ path: '', component: CompanyComponent,
  children:[
    {
      path:'add-facilities',
      loadChildren: () => import('./add-facilities/add-facilities.module').then((m) => m.AddFacilitiesModule),
    },
    {
      path:'facility-type',
      loadChildren: () => import('./facility-type/facility-type.module').then((m) => m.FacilityTypeModule),
    },
    {
      path:'speciality',
      loadChildren: () => import('./speciality/speciality.module').then((m) => m.SpecialityModule),
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
