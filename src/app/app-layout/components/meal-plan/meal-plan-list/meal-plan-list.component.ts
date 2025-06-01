import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MealPlan } from 'src/app/models/mealPlan';
import { SnackbarService } from '../../snackbar-service';
import { CreateMealPlanComponent } from '../create-meal-plan/create-meal-plan.component';
import { MealPlanService } from '../meal-plan-service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-meal-plan-list',
  templateUrl: './meal-plan-list.component.html',
  styleUrls: ['./meal-plan-list.component.scss'],
  standalone: false,
})
export class MealPlanListComponent {
  constructor(
    protected mealPlanService: MealPlanService,
    protected router: Router,
    protected dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {
    this.mealPlanService.setMealsPlans();
  }

  setDateRange(startDate: string) {
    const endDate = new Date(
      new Date().setDate(new Date(startDate).getDate() + 4)
    )
      .toISOString()
      .substring(0, 10);
    const startStr = new Date(startDate).toISOString().substring(0, 10);
    return `${this.convertDigitIn(startStr)} - ${this.convertDigitIn(endDate)}`;
  }

  convertDigitIn(str: string) {
    return str.split('-').reverse().join('-');
  }

  openMealPlanEditDialog(mealPlan: MealPlan) {
    this.mealPlanService.setupFormGroup(mealPlan);
    this.dialog.open(CreateMealPlanComponent, {
      maxHeight: '100%',
    });
  }

  // need to add validation to ensure they cannot delete old meal plans or within 3 weeks of meal plan date
  deleteMealPlan(mealPlan: MealPlan) {
    return this.mealPlanService.deleteMealPlan$(mealPlan._id!).subscribe({
      complete: () => {
        this.mealPlanService.setMealsPlans();
        this.snackbarService.openSnackBar('Meal Plan Deleted Successfully');
      },
      error: (err) => console.log(err),
    });
  }
}
