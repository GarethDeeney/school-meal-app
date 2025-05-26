import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChildService } from '../../child-hub.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'child-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss'],
  standalone: false,
})
export class ChildAddMealComponent {
  constructor(
    protected childService: ChildService,
    protected dialog: MatDialog
  ) {}

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day == 1;
  };

  formGroup = new FormGroup({
    start: new FormControl(),
  });

  mealPlan$ = new BehaviorSubject({
    startDate: '19/05/2025',
    meals: []
  });

  mealPlanFormGroup = new FormGroup({
    monday: new FormControl(),
    tuesday: new FormControl(),
    wednesday: new FormControl(),
    thursday: new FormControl(),
    friday: new FormControl(),
  });

  setmealPlanValues = () => {
    this.mealPlanFormGroup
  }

  dateValue = () => {
    console.log(this.formGroup.controls['start'].value);
  };
  // need to find a way to get the menu when the date is changed?
  // call api to get the menu that is attached to that specific day?
  getMenu$ = () => {};
}
