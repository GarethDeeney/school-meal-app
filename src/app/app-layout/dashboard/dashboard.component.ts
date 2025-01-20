import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  staff$!: Observable<any>;
  staffDetails!: Employee;
  coursesCompleted = 0;
  coursesEnrolled = 0;
  constructor(private router: Router, private http: HttpService) {
    setTimeout(() => {
      this.getStaffDetails();
    }, 300);
  }

  getLocalStorage = (): string | null => {
    return localStorage.getItem('id');
  };

  getStaffDetails = () => {
    if (this.getLocalStorage()) {
      this.staff$ = this.http.getStaffDetails(this.getLocalStorage());

      this.staff$.subscribe((staff) => {
        this.staffDetails = staff;

        this.staffDetails.courses.forEach((course) => {
          if (course.achieved) {
            this.coursesCompleted++;
          } else {
            this.coursesEnrolled++;
          }
        });
      });
    }
  };

  navigate = (url: string) => {
    this.router.navigateByUrl(url);
  };
}
