import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Meal } from 'src/app/models/meal';
import { BehaviorSubject, filter, map, Observable, tap } from 'rxjs';
import { MealService } from '../../meal/meal.service';
import { CreateMealPlanComponent } from '../create-meal-plan/create-meal-plan.component';
import { MealPlanService } from '../meal-plan-service';

@Component({
  selector: 'app-meal-plan-hub',
  templateUrl: './meal-plan-hub.component.html',
  styleUrls: ['./meal-plan-hub.component.scss'],
  standalone: false,
})
export class MealPlanHubComponent {
  constructor(
    protected mealPlanService: MealPlanService,
    protected router: Router,
    protected dialog: MatDialog
  ) {}

  openMealPlanCreateDialog() {
    this.mealPlanService.setupFormGroup();
    this.dialog.open(CreateMealPlanComponent, {
      maxHeight: '100%',
    });
  }
}
