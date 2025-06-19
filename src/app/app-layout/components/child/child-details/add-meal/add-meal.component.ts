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
import { MealPlanService } from '../../../meal-plan/meal-plan-service';
import { MealService } from '../../../meal/meal.service';
import { ChildService } from '../../child-hub.service';
import { MealPlan } from 'src/app/models/mealPlan';
import { SnackbarService } from '../../../snackbar-service';
import { Ingredient } from 'src/app/models/ingredient';

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
    protected mealService: MealService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ChildAddMealComponent>,
    protected snackbarService: SnackbarService
  ) {
    this.childAllergens = this.data.allergens.map(
      (allergen: Allergen) => allergen._id
    );

    this.addNotSchoolLunchMeals$().subscribe((val) => {
      this.otherOpt$.next(val);
    });
  }

  close() {
    this.dialogRef.close();
  }

  HOME_FOR_LUNCH = 'Home for Lunch';
  PACKED_LUNCH = 'Packed Lunch';
  ABSENT = 'Absent';

  noMealsOnDate$ = new BehaviorSubject<boolean>(false);

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day == 1;
  };

  mealPlan$: BehaviorSubject<any> = new BehaviorSubject([]);
  otherOpt$: BehaviorSubject<any> = new BehaviorSubject([]);

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

  compareMeals = (a: any, b: any) => a._id == b._id;

  getMealPlanByDate(date: Date) {
    const isoDate = DateTime.fromISO(date.toISOString())
      .toUTC()
      .startOf('day')
      .plus({ days: 1 });
    return this.mealPlanService
      .getMealPlanByDate$(isoDate)
      .subscribe((mealPlan: any) => {
        !!!mealPlan.length
          ? this.noMealsOnDate$.next(true)
          : this.noMealsOnDate$.next(false);

        this.mealPlan$.next(mealPlan);
      });
  }

  allMeals$(mealPlan$: BehaviorSubject<any>, otherMeals: Observable<Meal[]>) {
    combineLatest([mealPlan$, otherMeals]).subscribe(console.log);
  }

  getMealsLessAllergens(meals: Meal[], otherOpt: Meal[]) {
    return this.childAllergens.length > 0
      ? this.combineMealOptions(this.removeMealsWithAllergen(meals), otherOpt)
      : this.combineMealOptions(meals, otherOpt);
  }

  isAllergenInArray(allergen: Allergen) {
    return this.childAllergens.includes(allergen._id!);
  }

  removeMealsWithAllergen(meals: Meal[]) {
    return meals.filter((meal) => {
      const allergens = meal.ingredients
        .flat()
        .map((ingredients) => ingredients.ingredient)
        .map((ingredient) => ingredient.allergens)
        .flat();

      return (
        !!!allergens.length ||
        !!!allergens.find((allergen) => this.isAllergenInArray(allergen))
      );
    });
  }

  combineMealOptions(dayMeals: Meal[], otherOpt: Meal[]) {
    return [...dayMeals, ...otherOpt];
  }

  addNotSchoolLunchMeals$(): Observable<Meal[]> {
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
      meal: meal,
      date: date,
    };
  }

  setMealPlanEntity(mealPlan: any) {
    const date = this.formGroup.controls['start'].value;
    const startDate: DateTime = DateTime.fromISO(date.toISOString())
      .toUTC()
      .startOf('day')
      .plus({ days: 1 });

    const meals = [
      { ...mealPlan.monday, date: startDate },
      { ...mealPlan.tuesday, date: startDate.plus({ days: 1 }) },
      { ...mealPlan.wednesday, date: startDate.plus({ days: 2 }) },
      { ...mealPlan.thursday, date: startDate.plus({ days: 3 }) },
      { ...mealPlan.friday, date: startDate.plus({ days: 4 }) },
    ];

    return meals;
  }

  submit() {
    const mealObj = this.setMealPlanEntity(this.mealPlanFormGroup.value);

    return this.childService.addMeal$(this.data.id, mealObj).subscribe({
      complete: () => {
        this.childService.getChildren$();
        this.snackbarService.openSnackBar('Meal Selection added Successfully');
        this.dialogRef.close();
      },
      error: (err) => console.log(err),
    });
  }
}
