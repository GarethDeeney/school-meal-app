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
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss'],
  standalone: false,
})
export class MealCardComponent {
  constructor(
    protected dialog: MatDialog,
    protected mealService: MealService
  ) {}

  @Input() meal!: Meal;

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

  deleteMeal(mealId: string) {
    return this.mealService.deleteMeal$(mealId).subscribe({
      complete: () => this.mealService.setMeals(),
      error: (err) => console.log(err),
    });
  }
}
