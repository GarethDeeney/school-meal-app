import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MealService } from '../meal.service';
import { IngredientService } from '../../ingredient/ingredient.service';
import { Ingredient } from 'src/app/models/ingredient';
import { Observable } from 'rxjs';
import { Meal } from 'src/app/models/meal';
import { SnackbarService } from '../../snackbar-service';

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
    protected ingredientService: IngredientService,
    private snackbarService: SnackbarService
  ) {}

  ingredients$: Observable<Ingredient[]> =
    this.ingredientService.getIngredients$();

  getMealValues(fg: FormGroup) {
    return {
      _id: fg.controls['_id'].value,
      name: fg.controls['name'].value,
      ingredients: fg.controls['ingredients'].value,
      vegetarian: fg.controls['vegetarian'].value,
      vegan: fg.controls['vegan'].value,

    };
  }

  compareIngredients = (a: any, b: any) => a._id == b._id;

  close() {
    this.dialogRef.close();
  }
  submit() {
    const meal = this.getMealValues(this.service.formGroup);
    return meal._id ? this.editMeal(meal) : this.addMeal(meal);
  }

  addMeal(meal: Meal) {
    return this.service.addMeal$(meal).subscribe({
      complete: () => {
        this.dialogRef.close();
        this.service.setMeals();
        this.snackbarService.openSnackBar('Meal Created Successfully');
      },
      error: (err) => console.log(err),
    });
  }

  editMeal(meal: Meal) {
    return this.service.editMeal$(meal).subscribe({
      complete: () => {
        this.dialogRef.close();
        this.service.setMeals();
        this.snackbarService.openSnackBar('Meal Updated Successfully');
      },
      error: (err) => console.log(err),
    });
  }
}
