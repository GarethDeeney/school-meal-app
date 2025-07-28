import { Component } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MealPlan } from 'src/app/models/mealPlan';
import { MealService } from '../../meal/meal.service';
import { MenuService } from '../../menu/menu-service';
import { SnackbarService } from '../../snackbar-service';
import { MealPlanService } from '../meal-plan-service';

@Component({
  selector: 'app-create-meal-plan',
  templateUrl: './create-meal-plan.component.html',
  styleUrls: ['./create-meal-plan.component.scss'],
  standalone: false,
})
export class CreateMealPlanComponent {
  constructor(
    protected mealService: MealService,
    public dialogRef: MatDialogRef<CreateMealPlanComponent>,
    protected mealPlanService: MealPlanService,
    private snackbarService: SnackbarService,
    protected menuService: MenuService
  ) {}

  menus$ = this.menuService.getMenus$();

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day == 1;
  };

  close() {
    this.dialogRef.close();
  }

  submit() {
    const mealPlanEntity = this.setMealPlanEntity(
      this.mealPlanService.formGroup
    );
    return mealPlanEntity._id
      ? this.editMeal(mealPlanEntity)
      : this.addMeal(mealPlanEntity);
  }

  setMealPlanEntity(mealPlanFormGroup: FormGroup): MealPlan {
    const date = new Date(mealPlanFormGroup.controls['startDate'].value);
    date.setHours(1);
    const mealPlanEntity = {
      _id: mealPlanFormGroup.controls['_id'].value,
      name: mealPlanFormGroup.controls['name'].value,
      startDate: date,
      monday: {
        date: this.setDate(date, 0),
        menu: this.setMealDayValue(mealPlanFormGroup.controls['monday']),
      },
      tuesday: {
        date: this.setDate(date, 1),
        menu: this.setMealDayValue(mealPlanFormGroup.controls['tuesday']),
      },
      wednesday: {
        date: this.setDate(date, 2),
        menu: this.setMealDayValue(mealPlanFormGroup.controls['wednesday']),
      },
      thursday: {
        date: this.setDate(date, 3),
        menu: this.setMealDayValue(mealPlanFormGroup.controls['thursday']),
      },
      friday: {
        date: this.setDate(date, 4),
        menu: this.setMealDayValue(mealPlanFormGroup.controls['friday']),
      },
    };

    return mealPlanEntity;
  }

  setMealDayValue(dayControl: AbstractControl) {
    return dayControl.value.menu ?? dayControl.value;
  }

  addMeal(mealPlan: MealPlan) {
    return this.mealPlanService.createMealPlan$(mealPlan).subscribe({
      complete: () => {
        this.dialogRef.close();
        this.mealPlanService.setMealsPlans();
        this.snackbarService.openSnackBar('Meal Plan Created Successfully');
      },
      error: (err) => console.log(err),
    });
  }

  setDate(date: Date, multiplier: number) {
    const newDate = new Date(new Date().setDate(date.getDate() + multiplier));
    newDate.setHours(1);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);

    return newDate;
  }

  compareMenus = (a: any, b: any) => {
    return a._id == b.menu._id;
  };

  editMeal(mealPlan: MealPlan) {
    return this.mealPlanService.editMealPlan$(mealPlan).subscribe({
      complete: () => {
        this.dialogRef.close();
        this.mealPlanService.setMealsPlans();
        this.snackbarService.openSnackBar('Meal Plan Updated Successfully');
      },
      error: (err) => console.log(err),
    });
  }
}
