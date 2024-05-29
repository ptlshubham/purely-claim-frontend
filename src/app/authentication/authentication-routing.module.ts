import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { OrganizationloginComponent } from './organizationlogin/organizationlogin.component';
//import { OrganizationLoginComponent } from './organizationlogin/organizationlogin.component';
import { OrganizationregisterComponent} from './organizationregister/organizationregister.component';
const routes: Routes = [
  { path: '', component: AuthenticationComponent,
  children: [
    {
      path: '',
      redirectTo:'login',
      pathMatch:'full'
    },    
    {
      path: 'login',
      loadChildren: () =>
        import('./login/login.module').then((m) => m.LoginModule),
    },
    {
      path: 'forgot-password',
      loadChildren: () =>
        import('./forgot-password/forgot-password.module').then(
          (m) => m.ForgotPasswordModule
        ),
    },
    {
      path: 'change-password2',
      loadChildren: () =>
        import('./change-password2/change-password2.module').then(
          (m) => m.ChangePassword2Module
        ),
    },
    {
      path: 'lock-screen',
      loadChildren: () =>
        import('./lock-screen/lock-screen.module').then(
          (m) => m.LockScreenModule
        ),
    },
  ],
},


{
  path: 'register',
  component: OrganizationregisterComponent
},

{
  path: 'organization-login',
  component: OrganizationloginComponent
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
