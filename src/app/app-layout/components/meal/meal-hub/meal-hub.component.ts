import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddMealComponent } from '../add-meal/add-meal.component';
import { MealService } from '../meal.service';
import { Meal } from 'src/app/models/meal';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-meal-hub',
  templateUrl: './meal-hub.component.html',
  styleUrls: ['./meal-hub.component.scss'],
  standalone: false,
})
export class MealHubComponent {
  meals!: Meal[];
  constructor(
    protected mealService: MealService,
    protected router: Router,
    // public dialogRef: MatDialogRef<AddIngredientComponent>,
    protected dialog: MatDialog
  ) {
    this.mealService.getMeals$();
  }

  openMealDialog() {
    this.dialog.open(AddMealComponent, {
      maxHeight: '100%',
    });
  }
}
