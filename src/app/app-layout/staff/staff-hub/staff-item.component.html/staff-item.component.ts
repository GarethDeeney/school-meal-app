import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../../../models/employee';

@Component({
  selector: 'app-staff-item',
  templateUrl: './staff-item.component.html',
  styleUrls: ['./staff-item.component.scss'],
})
export class StaffItemComponent {
  constructor(private router: Router) {}

@Input() staff!: Employee;

  navigate = (url: string) => {
    this.router.navigateByUrl(`/staff-hub/${url}`);
  };
}
