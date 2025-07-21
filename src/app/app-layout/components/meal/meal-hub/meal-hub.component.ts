import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddMealComponent } from '../add-meal/add-meal.component';
import { MealService } from '../meal.service';
import { Meal } from 'src/app/models/meal';
import { BehaviorSubject, filter, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-meal-hub',
  templateUrl: './meal-hub.component.html',
  styleUrls: ['./meal-hub.component.scss'],
  standalone: false,
})
export class MealHubComponent {
  HOME_FOR_LUNCH = 'Home for Lunch';
  PACKED_LUNCH = 'Packed Lunch';
  ABSENT = 'Absent';

  meals$!: Observable<any>;

  constructor(
    protected mealService: MealService,
    protected router: Router,
    protected dialog: MatDialog
  ) {
    this.mealService.setMeals();

    this.meals$ = this.mealService.meals$.pipe(
      map((meals: Meal[]) =>
        meals.filter(
          (meal: Meal) =>
            !this.checkHomeForLunch(meal) &&
            !this.checkPackedLunch(meal) &&
            !this.checkAbsence(meal)
        )
      )
    );
  }

  checkPackedLunch = (meal: Meal) => {
    return meal.name == this.PACKED_LUNCH;
  };

  checkHomeForLunch = (meal: Meal) => {
    return meal.name == this.HOME_FOR_LUNCH;
  };

  checkAbsence = (meal: Meal) => {
    return meal.name == this.ABSENT;
  };

  openMealDialog() {
    this.mealService.formGroup = this.mealService.setupFormGroup();
    this.dialog.open(AddMealComponent, {
      maxHeight: '100%',
    });
  }
}
