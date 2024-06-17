// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class EmployeeRoutingModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent,
  children: [
    {
      path: 'employee-list',
      loadChildren: () =>
        import('./employee-list/employee-list.module').then((m) => m.EmployeeListModule),
    },
    {
      path: 'employee-facility',
      loadChildren: () =>
        import('./employee-facility/employee-facility.module').then((m) => m.EmployeeFacilityModule),
    },
    // {
    //   path: 'employee-profile',
    //   loadChildren: () =>
    //     import('./employee-profile/employee-profile.module').then(
    //       (m) => m.EmployeeProfileModule
    //     ),
    // },
    // {
    //   path: 'employee-leave',
    //   loadChildren: () =>
    //     import('./employee-leave/employee-leave.module').then(
    //       (m) => m.EmployeeLeaveModule
    //     ),
    // },
    // {
    //   path: 'employee-holiday',
    //   loadChildren: () =>
    //     import('./employee-holiday/employee-holiday.module').then(
    //       (m) => m.EmployeeHolidayModule
    //     ),
    // },
    // {
    //   path: 'employee-attendance',
    //   loadChildren: () =>
    //     import('./employee-attendance/employee-attendance.module').then(
    //       (m) => m.EmployeeAttendanceModule
    //     ),
    // },
    // {
    //   path: 'add-employee',
    //   loadChildren: () =>
    //     import('./add-employee/add-employee.module').then((m) => m.AddEmployeeModule),
    // },
    // {
    //   path: 'edit-leave',
    //   loadChildren: () =>
    //     import('./edit-leave/edit-leave.module').then((m) => m.EditLeaveModule),
    // },
    // {
    //   path: 'edit-employee',
    //   loadChildren: () =>
    //     import('./edit-employee/edit-employee.module').then((m) => m.EditEmployeeModule),
    // },
    // {
    //   path: 'add-leave',
    //   loadChildren: () =>
    //     import('./add-leave/add-leave.module').then((m) => m.AddLeaveModule),
    // },
    // {
    //   path: 'employee-setting',
    //   loadChildren: () =>
    //     import('./employee-setting/employee-setting.module').then(
    //       (m) => m.EmployeeSettingModule
    //     ),
    // },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
