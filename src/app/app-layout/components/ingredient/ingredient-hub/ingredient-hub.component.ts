import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient';
import { AddIngredientComponent } from '../add-ingredient/add-ingredient.component';
import { IngredientService } from '../ingredient.service';

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
    this.ingredientService.setDataSource();
  }

  openIngredientDialog() {
    this.dialog.open(AddIngredientComponent, {
      maxHeight: '100%',
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
      nutrition: {
        energy: ingredient.nutrition.energy,
        fat: ingredient.nutrition.fat,
        sugars: ingredient.nutrition.sugars,
        saturates: ingredient.nutrition.saturates,
        salt: ingredient.nutrition.salt,
      },
    });

    this.openIngredientDialog();
  }

  deleteIngredient(id: string) {
    return this.ingredientService.deleteIngredient$(id).subscribe({
      complete: () => this.ingredientService.setDataSource(),
      error: (err) => console.log(err),
    });
  }
}
