import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseRecordComponent } from './app-layout/course-components/course-record/course-record.component';
import { CourseListComponent } from './app-layout/course-list/course-list.component';
import { DashboardComponent } from './app-layout/dashboard/dashboard.component';
import { StaffHubComponent } from './app-layout/staff/staff-hub/staff-hub.component';
import { StaffRecordComponent } from './app-layout/staff/staff-record/staff-record.component';
import { LogInComponent } from './app-layout/log-in/log-in.component';

const routes: Routes = [
  {
    path: '',
    component: LogInComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
  },
  {
    path: 'courses-hub',
    component: CourseListComponent,
  },
  {
    path: 'courses-hub/:id',
    component: CourseRecordComponent,
  },
  {
    path: 'staff-hub',
    component: StaffHubComponent,
  },
  {
    path: 'staff-hub/:id',
    component: StaffRecordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
