import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Employee } from 'src/app/models/employee';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-staff-record',
  templateUrl: './staff-record.component.html',
  styleUrls: ['./staff-record.component.scss'],
})
export class StaffRecordComponent {
  staff!: Employee;
  staffMember$!: Observable<any> | null;
  staffId!: string;

  constructor(private http: HttpService, private router: Router) {
    const routeArray = this.router.url.split('/');
    this.staffId = routeArray[routeArray.length - 1];
    this.staffMember$ = this.http.getStaffDetails(this.staffId);
    this.staffMember$
      ? this.staffMember$.subscribe((staff: any) => {
          this.staff = staff;
        })
      : '';
  }

  recordAchievement = (courseId: string | undefined) => {
    if (courseId) {
      this.staff.courses.find((course) => course._id === courseId)!.achieved =
        true;
      this.http.updateStaffCourses(this.staff).subscribe((res) => {});
    }
  };
}
