import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
    const mealPlanEntity = {
      _id: mealPlanFormGroup.controls['_id'].value,
      name: mealPlanFormGroup.controls['name'].value,
      startDate: date,
      monday: {
        date: this.setDate(date, 0),
        meals: mealPlanFormGroup.controls['monday'].value.meals,
      },
      tuesday: {
        date: this.setDate(date, 1),
        meals: mealPlanFormGroup.controls['tuesday'].value.meals,
      },
      wednesday: {
        date: this.setDate(date, 2),
        meals: mealPlanFormGroup.controls['wednesday'].value.meals,
      },
      thursday: {
        date: this.setDate(date, 3),
        meals: mealPlanFormGroup.controls['thursday'].value.meals,
      },
      friday: {
        date: this.setDate(date, 4),
        meals: mealPlanFormGroup.controls['friday'].value.meals,
      },
    };

    return mealPlanEntity;
  }

  addMeal(mealPlan: MealPlan) {
    return this.mealPlanService.createMealPlan$(mealPlan).subscribe({
      complete: () => {
        this.dialogRef.close();
        this.mealPlanService.setMealsPlans();
        this.snackbarService.openSnackBar('Meal Created Successfully');
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

  compareMeals = (a: any, b: any) => a.id == b.id;

  editMeal(mealPlan: MealPlan) {
    return this.mealPlanService.editMealPlan$(mealPlan).subscribe({
      complete: () => {
        this.dialogRef.close();
        this.mealPlanService.setMealsPlans();
        this.snackbarService.openSnackBar('Meal Updated Successfully');
      },
      error: (err) => console.log(err),
    });
  }
}
