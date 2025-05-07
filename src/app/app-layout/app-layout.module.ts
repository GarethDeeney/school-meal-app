import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material-module';
import { ComponentModule } from './components/components.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogInComponent } from './log-in/log-in.component';

@NgModule({
  declarations: [DashboardComponent, LogInComponent],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
  imports: [
    ComponentModule,
    BrowserModule,
    CommonModule,
    ComponentModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [DashboardComponent],
})
export class AppLayoutModule {}
