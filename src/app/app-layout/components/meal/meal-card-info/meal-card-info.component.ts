import { Component, Input, input, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Allergen } from 'src/app/models/allergen';
import { Meal } from 'src/app/models/meal';
import { Nutrition } from 'src/app/models/Nutrition';
import { AddMealComponent } from '../add-meal/add-meal.component';
import { MealService } from '../meal.service';
import { Ingredient } from 'src/app/models/ingredient';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-meal-card-info',
  templateUrl: './meal-card-info.component.html',
  styleUrls: ['./meal-card-info.component.scss'],
  standalone: false,
})
export class MealCardInfoComponent {
  constructor(
    protected dialog: MatDialog,
    protected mealService: MealService
  ) {}

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
    // map through meal array to get nutritional info
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

  editMeal = () => {
    this.dialog.open(AddMealComponent, {
      maxHeight: '100%',
    });
    console.log('clicked');
    // open edit dialog
    // after closed save the updated meal.
  };

  createIngredientForm(ingredient: {
    ingredient: Ingredient;
    amount: number;
  }): FormGroup {
    return new FormGroup({
      amount: new FormControl(ingredient.amount),
      ingredient: new FormControl(ingredient.ingredient),
    });
  }

  openEditDialog(meal: Meal) {
    // reset formgroup for new values
    this.mealService.formGroup = this.mealService.setupFormGroup();

    // add id and name to form group
    this.mealService.formGroup.patchValue({
      _id: meal._id,
      name: meal.name,
    });

    const formArr: FormArray<FormGroup> =
      this.mealService.formGroup.controls['ingredients'];

    // ca't add as part of patch value, add formgroup for each ingredient to form array separately
    meal.ingredients.forEach((ingredient) => {
      const fg: FormGroup<any> = this.createIngredientForm(ingredient);
      formArr.push(fg);
    });

    // remove initial empty value of form array
    formArr.removeAt(0);

    // open dialog with updated form group
    this.dialog.open(AddMealComponent, {
      maxHeight: '100%',
    });
  }
}
