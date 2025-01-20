import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material-module';
import { ComponentModule } from './components/components.module';
import { CourseComponentModule } from './course-components/course-components.module';
import { CourseListComponent } from './course-list/course-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogInComponent } from './log-in/log-in.component';
import { StaffModule } from './staff/staff.module';

@NgModule({
  declarations: [DashboardComponent, CourseListComponent, LogInComponent],
  imports: [
    ComponentModule,
    MaterialModule,
    CourseComponentModule,
    BrowserModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    StaffModule,
  ],
  exports: [DashboardComponent, CourseComponentModule, CourseListComponent],
})
export class AppLayoutModule {}
