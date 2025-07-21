import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MealPlanService } from '../meal-plan-service';
import { Ingredient } from 'src/app/models/ingredient';

@Component({
  selector: 'app-meal-plan-meals',
  templateUrl: './meal-plan-meals.component.html',
  styleUrls: ['./meal-plan-meals.component.scss'],
  standalone: false,
})
export class MealPlanMealsComponent {
  @Input() header: string = 'Day of Week';
  @Input() date: string = '';
  @Input() meals: any[] = [];

  constructor(
    protected mealPlanService: MealPlanService,
    protected router: Router,
    protected dialog: MatDialog
  ) {}

  listAllergens(ingredients: { amount: number; ingredient: Ingredient }[]) {
    const allergenArr = ingredients
      .map((ingredient) =>
        ingredient.ingredient.allergens.map((allergen) => allergen.name)
      )
      .flat();

    return [...new Set(allergenArr)];
  }

  setDateString(date: string) {
    return date.substring(0, 10);
  }
}
