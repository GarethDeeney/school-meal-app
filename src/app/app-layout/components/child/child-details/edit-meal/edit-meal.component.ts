import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DateTime } from 'luxon';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Allergen } from 'src/app/models/allergen';
import { Meal } from 'src/app/models/meal';
import { MealPlan } from 'src/app/models/mealPlan';
import { MealPlanService } from '../../../meal-plan/meal-plan-service';
import { MealService } from '../../../meal/meal.service';
import { SnackbarService } from '../../../snackbar-service';
import { ChildService } from '../../child-hub.service';

@Component({
  selector: 'child-edit-meal',
  templateUrl: './edit-meal.component.html',
  styleUrls: ['./edit-meal.component.scss'],
  standalone: false,
})
export class ChildEditMealComponent {
  constructor(
    protected childService: ChildService,
    protected dialog: MatDialog,
    protected mealPlanService: MealPlanService,
    protected route: ActivatedRoute,
    protected mealService: MealService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ChildEditMealComponent>,
    protected snackbarService: SnackbarService
  ) {
    this.mealList$().subscribe((val) => this.meals$.next(val));
    this.setupFormGroup({ date: this.data.date, meal: this.data.meal });
  }

  meals$ = new BehaviorSubject<any>([]);

  mealList$() {
    return combineLatest([
      this.getMealPlanByDate$(this.data.date),
      this.getNotSchoolLunchMeals$(),
    ]).pipe(
      map((arr: Meal[][]) =>
        !!this.data.allergens.length
          ? [...this.removeMealsWithAllergen(arr[0]), ...arr[1]]
          : arr.flat()
      )
    );
  }

  close() {
    this.dialogRef.close();
  }

  HOME_FOR_LUNCH = 'Home for Lunch';
  PACKED_LUNCH = 'Packed Lunch';

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day == 1;
  };

  formGroup = new FormGroup({
    date: new FormControl(),
    meal: new FormControl(),
  });

  setupFormGroup(entity: { date: DateTime; meal: Meal }) {
    return this.formGroup.reset(entity);
  }

  compareMeals = (a: any, b: any) => a.id == b.id;

  getMealPlanByDate$(date: DateTime) {
    const dayOfWeek = date.weekdayLong!.toLowerCase();
    const startDate = date
      .startOf('week')
      .toUTC()
      .startOf('day')
      .plus({ days: 1 });

    return this.mealPlanService
      .getMealPlanByDate$(startDate)
      .pipe(
        map((mealPlan: any) => mealPlan[0][dayOfWeek as keyof MealPlan].meals)
      );
  }

  isAllergenInArray(allergen: Allergen) {
    return this.data.allergens.includes(allergen._id!);
  }

  removeMealsWithAllergen(meals: Meal[]) {
    const newMeals = meals.filter((meal: Meal) => {
      return meal.ingredients.some((ingredients) => {
        if (!!ingredients)
          !ingredients.ingredient.allergens.find((allergen) =>
            this.isAllergenInArray(allergen)
          );
      });
    });
    return newMeals;
  }

  getNotSchoolLunchMeals$(): Observable<Meal[]> {
    return this.mealService.getMeals$().pipe(
      map((meals: Meal[]) => {
        return meals.filter(
          (meal) =>
            meal.name.includes(this.HOME_FOR_LUNCH) ||
            meal.name.includes(this.PACKED_LUNCH)
        );
      })
    );
  }

  setMealObject(meal: any, date: DateTime) {
    return {
      _id: meal._id,
      name: meal.name,
      ingredients: meal.ingredients,
      date: date.toUTC(),
    };
  }

  submit() {
    const mealSelection = this.setMealObject(
      this.formGroup.controls['meal'].value,
      this.formGroup.controls['date'].value
    );
    return this.childService
      .editMealSelection$(this.data.id, mealSelection)
      .subscribe({
        complete: () => {
          this.childService.getChildMeals$(this.data.id);
          this.snackbarService.openSnackBar(
            'Meal Selection updated Successfully'
          );
          this.dialogRef.close();
        },
        error: (err) => console.log(err),
      });
  }
}
