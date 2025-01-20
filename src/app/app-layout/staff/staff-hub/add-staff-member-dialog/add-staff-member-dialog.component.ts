import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { Employee } from 'src/app/models/employee';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-staff-dialog',
  templateUrl: './add-staff-member-dialog.component.html',
  styleUrls: ['./add-staff-member-dialog.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic',
      },
    },
  ],
})
export class AddStaffMemberDialogComponent {
  constructor(
    private http: HttpService,
    public dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  confirm: string = 'Confirm';

  roles = [
    'General',
    'Accountant',
    'IT',
    'HR Assistant',
  ];

  closeDialog = () => {
    this.dialogRef.closeAll();
  };

  formGroup: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    name: new FormControl(),
    startDate: new FormControl(),
    role: new FormControl(),
    courses: new FormControl(),
  });

  onSubmit() {
    const newStaff: Employee = {
      username: this.formGroup.get('username')!.value!,
      password: this.formGroup.get('password')!.value!,
      name: this.formGroup.get('name')!.value!,
      startDate: this.formGroup.get('startDate')!.value!,
      role: this.formGroup.get('role')!.value!,
      courses: [],
    };

    this.http.addStaff(newStaff).subscribe((res) => {});
  }
}

interface DialogData {}
