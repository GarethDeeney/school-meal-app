import { Component } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { Allergen } from 'src/app/models/allergen';
import { Ingredient } from 'src/app/models/ingredient';
import { IngredientService } from '../ingredient.service';
import { SnackbarService } from '../../snackbar-service';

@Component({
  selector: 'app-add-ingredient-details',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.scss'],
  standalone: false,
})
export class AddIngredientComponent {
  constructor(
    protected ingredientService: IngredientService,
    public dialogRef: MatDialogRef<AddIngredientComponent>,
    private snackbarService: SnackbarService
  ) {}

  allergens$: Observable<Allergen[]> = this.ingredientService.allergies$;

  getIngredientValues(fg: FormGroup) {
    const nutrition = fg.controls['nutrition'] as FormGroup;
    return {
      _id: fg.controls['_id'].value,
      name: fg.controls['name'].value,
      allergens: fg.controls['allergens'].value,
      nutrition: {
        calories: nutrition.controls['calories'].value,
        energy: nutrition.controls['energy'].value,
        fat: nutrition.controls['fat'].value,
        saturates: nutrition.controls['saturates'].value,
        salt: nutrition.controls['salt'].value,
        sugars: nutrition.controls['sugars'].value,
      },
      pricePerKG: fg.controls['pricePerKG'].value,
    };
  }
  formGroup = this.ingredientService.formGroup;

  close() {
    this.dialogRef.close();
  }

  compareAllergens = (a: any, b: any) => a._id == b._id;

  submit() {
    const ingredient = this.getIngredientValues(this.formGroup);
    this.close();
    return ingredient._id
      ? this.editIngredient(ingredient)
      : this.addIngredient(ingredient);
  }

  addIngredient(ingredient: Ingredient) {
    return this.ingredientService.addIngredient$(ingredient).subscribe({
      complete: () => {
        this.ingredientService.getIngredients$();
        this.snackbarService.openSnackBar('Ingredient Created Successfully');
      },
      error: (err) => console.log(err),
    });
  }

  editIngredient(ingredient: Ingredient) {
    return this.ingredientService.updateIngredient$(ingredient).subscribe({
      complete: () => {
        this.ingredientService.getIngredients$();
        this.snackbarService.openSnackBar('Ingredient Updated Successfully');
      },
      error: (err) => console.log(err),
    });
  }
}
