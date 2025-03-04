import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
