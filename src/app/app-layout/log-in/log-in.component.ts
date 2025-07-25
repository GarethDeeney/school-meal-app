import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  standalone: false,
})
export class LogInComponent {
  constructor(private http: HttpService, private router: Router) {}
  fg = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  onSubmit = () => {
    this.router.navigateByUrl('/dashboard');
  };
}
