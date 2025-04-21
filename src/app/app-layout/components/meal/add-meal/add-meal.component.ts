import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MealService } from '../meal.service';
import { IngredientService } from '../../ingredient/ingredient.service';
import { Ingredient } from 'src/app/models/ingredient';
import { Observable } from 'rxjs';
import { Meal } from 'src/app/models/meal';

@Component({
  selector: 'app-add-meal-details',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss'],
  standalone: false,
})
export class AddMealComponent {
  constructor(
    protected mealService: MealService,
    public dialogRef: MatDialogRef<AddMealComponent>,
    protected service: MealService,
    protected ingredientService: IngredientService
  ) {}

  ingredients$: Observable<Ingredient[]> =
    this.ingredientService.getIngredients$();

  getMealValues(fg: FormGroup) {
    return {
      _id: fg.controls['_id'].value,
      name: fg.controls['name'].value,
      ingredients: fg.controls['ingredients'].value,
    };
  }

  close() {
    this.dialogRef.close();
  }
  submit() {
    const meal = this.getMealValues(this.service.formGroup);
    this.addMeal(meal);
  }

  addMeal(meal: Meal) {
    return this.service.addMeal$(meal).subscribe({
      complete: () => {
        this.dialogRef.close();
        this.service.getMeals$();
      },
      error: (err) => console.log(err),
    });
  }
}

// submit() {
//   const ingredient = this.getIngredientValues(this.formGroup);
//   this.dialogRef.close();
//   return ingredient._id
//     ? this.editIngredient(ingredient)
//     : this.addIngredient(ingredient);
// }
