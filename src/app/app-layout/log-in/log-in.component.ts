import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  constructor(private http: HttpService, private router: Router) {}
  fg = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  user!: Employee[];

  getStaffDetailsbyName = (username: string): Observable<any> | null => {
    return this.http.getStaffDetailsbyName(username);
  };

  checkLoginCredentials = (
    username: FormControl,
    enteredPassword: FormControl
  ): boolean => {
    this.getStaffDetailsbyName(username.value)?.subscribe((res) => {
      this.user = res;
      if (this.user[0]._id !== undefined) {
        localStorage.setItem('id', this.user[0]._id);
      }
    });

    if (username.value == null || enteredPassword.value == null) {
      enteredPassword.setErrors({
        notMatch: 'Password entered does not match',
      });
      return false;
    } else {
      return enteredPassword.value == this.user[0].password;
    }
  };

  onSubmit = () => {
    const username = this.fg.controls.username;
    const password = this.fg.controls.password;

    password.setErrors({ notMatch: null });
    password.updateValueAndValidity();

    setTimeout(() => {
      this.checkLoginCredentials(username, password)
        ? this.router.navigateByUrl('/dashboard')
        : password.setErrors({ notMatch: 'Password entered does not match' });
    }, 500);
  };
}
