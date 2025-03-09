import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { Allergen } from 'src/app/models/allergen';
import { Ingredient } from 'src/app/models/ingredient';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-add-ingredient-details',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.scss'],
  standalone: false,
})
export class AddIngredientComponent {
  constructor(
    protected ingredientService: IngredientService,
    public dialogRef: MatDialogRef<AddIngredientComponent>
  ) {}

  allergens$: Observable<Allergen[]> = this.ingredientService.allergies$;

  getIngredientValues(fg: FormGroup) {
    return {
      _id: fg.controls['_id'].value,
      name: fg.controls['name'].value,
      allergens: fg.controls['allergens'].value,
      nutritionalInformation: fg.controls['nutritionalInformation'].value,
      pricePerKG: fg.controls['pricePerKG'].value,
    };
  }
  formGroup = this.ingredientService.formGroup;

  close() {
    this.dialogRef.close();
  }

  submit() {
    const ingredient = this.getIngredientValues(this.formGroup);
    this.dialogRef.close();
    return ingredient._id
      ? this.editIngredient(ingredient)
      : this.addIngredient(ingredient);
  }

  addIngredient(ingredient: Ingredient) {
    return this.ingredientService.addIngredient$(ingredient).subscribe({
      complete: () => this.ingredientService.getIngredients$(),
      error: (err) => console.log(err),
    });
  }

  editIngredient(ingredient: Ingredient) {
    return this.ingredientService.updateIngredient$(ingredient).subscribe({
      complete: () => this.ingredientService.getIngredients$(),
      error: (err) => console.log(err),
    });
  }
}
