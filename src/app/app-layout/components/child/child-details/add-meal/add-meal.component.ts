import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChildService } from '../../child-hub.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ValidateFn } from 'mongoose';

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

  dateValue = () => {
    console.log(this.formGroup.controls['start'].value);
  };
  // need to find a way to get the menu when the date is changed?
  // call api to get the menu that is attached to that specific day?
  getMenu$ = () => {};
}
