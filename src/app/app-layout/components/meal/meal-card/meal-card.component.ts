import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Ingredient } from 'src/app/models/ingredient';
import { Meal } from 'src/app/models/meal';
import { SnackbarService } from '../../snackbar-service';
import { AddMealComponent } from '../add-meal/add-meal.component';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss'],
  standalone: false,
})
export class MealCardComponent {
  constructor(
    protected dialog: MatDialog,
    protected mealService: MealService,
    private snackbarService: SnackbarService
  ) {}

  @Input() meal!: Meal;

  editMeal = () => {
    this.dialog.open(AddMealComponent, {
      maxHeight: '100%',
    });
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
      complete: () => {
        this.mealService.setMeals();
        this.snackbarService.openSnackBar('Meal Deleted Successfully');
      },
      error: (err) => console.log(err),
    });
  }
}
