import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DateTime } from 'luxon';
import { BehaviorSubject, Observable } from 'rxjs';
import { Allergen } from 'src/app/models/allergen';
import { Meal } from 'src/app/models/meal';
import { MealPlan, MealPlanDay } from 'src/app/models/mealPlan';
import { MealPlanService } from '../../../meal-plan/meal-plan-service';
import { ChildService } from '../../child-hub.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AllergenHubComponent } from '../../../allergen/allergen-hub/allergen-hub.component';

@Component({
  selector: 'child-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss'],
  standalone: false,
})
export class ChildAddMealComponent {
  constructor(
    protected childService: ChildService,
    protected dialog: MatDialog,
    protected mealPlanService: MealPlanService,
    protected route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.childAllergens = this.data.allergens.map(
      (allergen: Allergen) => allergen._id
    );
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day == 1;
  };

  mealPlan$: BehaviorSubject<any> = new BehaviorSubject(null);
  childAllergens!: string[];

  formGroup = new FormGroup({
    start: new FormControl(),
  });

  mealPlanFormGroup = new FormGroup({
    monday: new FormControl(),
    tuesday: new FormControl(),
    wednesday: new FormControl(),
    thursday: new FormControl(),
    friday: new FormControl(),
  });

  setmealPlanValues = () => {
    this.mealPlanFormGroup;
  };

  compareMeals = (a: any, b: any) => a.id == b.id;

  getMealPlanByDate(date: Date) {
    const isoDate = DateTime.fromISO(date.toISOString())
      .toUTC()
      .startOf('day')
      .plus({ days: 1 });
    return this.mealPlanService
      .getMealPlanByDate$(isoDate)
      .subscribe((mealPlan: any) => {
        if (mealPlan.length != 0) this.mealPlan$.next(mealPlan);
      });
  }

  getMealsLessAllergens(meals: Meal[]) {
    return this.childAllergens.length > 0
      ? this.removeMealsWithAllergen(meals)
      : this.removeMealsWithAllergen(meals);
  }

  isAllergenInArray(allergen: Allergen) {
    return this.childAllergens.includes(allergen._id!);
  }

  removeMealsWithAllergen(meals: Meal[]) {
    const newMeals = meals.filter((meal: Meal) => {
      return meal.ingredients.some(
        (ingredients) =>
          !ingredients.ingredient.allergens.find((allergen) =>
            this.isAllergenInArray(allergen)
          )
      );
    });
    return newMeals;
  }
}
