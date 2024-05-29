import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetsComponent } from './assets.component';

const routes: Routes = [{ path: '', component: AssetsComponent,
  children: [
    {
      path: 'add-asset',
      loadChildren: () =>
        import('./add-asset/add-asset.module').then((m) => m.AddAssetModule),
    },
    {
      path: 'assets-list',
      loadChildren: () =>
        import('./assets-list/assets-list.module').then((m) => m.AssetsListModule),
    }
  ]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsRoutingModule { }
