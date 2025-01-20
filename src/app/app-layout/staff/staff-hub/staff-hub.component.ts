import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { HttpService } from 'src/app/services/http.service';
import { AddStaffMemberDialogComponent } from './add-staff-member-dialog/add-staff-member-dialog.component';

@Component({
  selector: 'app-staff-hub',
  templateUrl: './staff-hub.component.html',
  styleUrls: ['./staff-hub.component.scss'],
})
export class StaffHubComponent {
  apiRoot = '/api';
  staff$!: Observable<Employee[]>;
  staff!: Employee[];
  staffDetails$: Observable<Employee> | null = this.http.getStaffDetails(
    localStorage.getItem('id')
  );
  staffDetails!: Employee;
  permissions: boolean = false;

  constructor(private http: HttpService, private dialog: MatDialog) {
    this.getStaffList();
  }

  getStaff = (url: string): Observable<Employee[]> => {
    return this.http.getStaffDetails(url);
  };

  getStaffList = () => {
    this.staffDetails$?.subscribe((staff) => {
      this.staffDetails = staff;
      if (staff.role != 'HR Manager') {
        this.staff$ = this.getStaff(`?_id=${staff._id}`);
        this.staff$.subscribe((staff) => {
          this.staff = staff;
        });
      } else if (staff.role == 'HR Manager') {
        this.staff$ = this.getStaff('');
        this.staff$.subscribe((staff) => {
          this.staff = staff;
        });
        this.permissions = !this.permissions;
      }
    });
  };

  addStaffMember = () => {
    const matDialogRef = this.dialog.open(AddStaffMemberDialogComponent, {
      minWidth: '400px',
    });
    matDialogRef.afterClosed().subscribe((res: any) => {
      console.log(res);
      
      if (res == 'Confirm') {
        this.staff$ = this.getStaff('');
        this.staff$.subscribe((staff) => {
          this.staff = staff;
        });
      }
    });
  };
}
