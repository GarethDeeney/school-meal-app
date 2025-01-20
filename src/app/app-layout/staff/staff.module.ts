import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/material-module';
import { ComponentModule } from '../components/components.module';
import { AddStaffMemberDialogComponent } from './staff-hub/add-staff-member-dialog/add-staff-member-dialog.component';
import { StaffHubComponent } from './staff-hub/staff-hub.component';
import { StaffItemComponent } from './staff-hub/staff-item.component.html/staff-item.component';
import { StaffRecordComponent } from './staff-record/staff-record.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    StaffHubComponent,
    StaffItemComponent,
    StaffRecordComponent,
    AddStaffMemberDialogComponent,
  ],
  imports: [
    ComponentModule,
    MaterialModule,
    BrowserModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
  ],
  exports: [
    StaffHubComponent,
    StaffItemComponent,
    StaffRecordComponent,
    AddStaffMemberDialogComponent,
  ],
})
export class StaffModule {}
