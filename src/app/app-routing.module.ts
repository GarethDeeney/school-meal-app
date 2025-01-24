import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './app-layout/dashboard/dashboard.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
