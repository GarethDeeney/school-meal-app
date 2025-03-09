import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient';
import { AddIngredientComponent } from '../add-meal/add-ingredient.component';
import { IngredientService } from '../meal.service';

@Component({
  selector: 'app-ingredient-hub',
  templateUrl: './ingredient-hub.component.html',
  styleUrls: ['./ingredient-hub.component.scss'],
  standalone: false,
})
export class IngredientHubComponent {
  displayedColumns: string[] = ['name', 'pricePerKG', 'actions'];

  constructor(
    protected ingredientService: IngredientService,
    protected router: Router,
    public dialogRef: MatDialogRef<AddIngredientComponent>,
    protected dialog: MatDialog
  ) {
    this.ingredientService.getIngredients$();
  }

  openAddIngredientDialog() {
    this.dialog.open(AddIngredientComponent, {
      height: '325px',
      width: '500px',
    });
  }

  navigateByToIngredientDetails = (child: Ingredient) => {
    this.router.navigateByUrl(`/allergen/${child._id}`);
  };

  openEditDialog(ingredient: Ingredient) {
    this.ingredientService.formGroup.setValue({
      _id: ingredient._id,
      name: ingredient.name,
      allergens: ingredient.allergens,
      pricePerKG: ingredient.pricePerKG,
      nutritionalInformation: ingredient.nutritionalInformation,
    });

    this.dialog.open(AddIngredientComponent, {
      height: '325px',
      width: '500px',
    });
  }

  deleteAllergen(id: string) {
    return this.ingredientService.deleteIngredient$(id).subscribe({
      complete: () => this.ingredientService.getIngredients$(),
      error: (err) => {
        console.log(err);
      },
    });
  }
}
