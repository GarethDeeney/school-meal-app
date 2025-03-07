import { Component } from '@angular/core';
import { IngredientService } from '../ingredient.service';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Allergen } from 'src/app/models/allergen';
import { AddAllergenComponent } from '../../allergen/add-allergen/add-allergen.component';

@Component({
  selector: 'app-ingredient-hub',
  templateUrl: './ingredient-hub.component.html',
  styleUrls: ['./ingredient-hub.component.scss'],
  standalone: false,
})
export class IngredientHubComponent {
  displayedColumns: string[] = ['name', 'reaction', 'specialRequirements'];

  constructor(
    protected ingredientService: IngredientService,
    protected router: Router,
    public dialogRef: MatDialogRef<AddAllergenComponent>,
    protected dialog: MatDialog
  ) {
    this.ingredientService.getIngredient$();
  }

  openAddIngredientDialog() {
    this.dialog.open(AddAllergenComponent, {
      height: '325px',
      width: '500px',
    });
  }

  navigateByToAllergenDetails = (child: Allergen) => {
    this.router.navigateByUrl(`/allergen/${child._id}`);
  };
}
