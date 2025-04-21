import { Component, Input, input, signal } from '@angular/core';
import { Allergen } from 'src/app/models/allergen';
import { Ingredient } from 'src/app/models/ingredient';
import { Meal } from 'src/app/models/meal';
import { Nutrition } from 'src/app/models/Nutrition';

@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss'],
  standalone: false,
})
export class MealCardComponent {
  @Input() meal!: Meal;

  getMealAllergens = (ingredients: any[]) => {
    // map through ingredients to get array of allergen names
    const arr = ingredients
      .map((ingredient: { ingredient: Ingredient; amount: number }) => {
        return ingredient.ingredient.allergens;
      })
      // use flat to reduce from array of arrays
      .flat()
      // only interested in the name
      .map((allergen: Allergen) => {
        return allergen.name;
      });
    // pass as new Set to remove duplicate values
    return [...new Set(arr)];
  };

  getNutrtionalVal = (ingredients: any[], prop: string): number => {
    // map through ingredient array to get nutritional info
    return (
      ingredients
        .map((ingredient: { ingredient: Ingredient; amount: number }) => {
          // cast as any to use dynamic property value and mitigate unneccessary repetition
          return (ingredient.ingredient.nutrition as any)[prop];
        })
        // add values up to get full value of nutrition
        .reduce((previousVal, currentVal) => {
          return previousVal + currentVal;
        })
    );
  };
}
