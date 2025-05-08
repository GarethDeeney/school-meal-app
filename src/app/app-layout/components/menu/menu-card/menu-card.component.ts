import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Ingredient } from 'src/app/models/ingredient';
import { Meal } from 'src/app/models/meal';
import { Menu } from 'src/app/models/menu';
import { AddMenuComponent } from '../add-menu/add-menu.component';
import { MenuService } from '../menu-service';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../snackbar-service';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
  standalone: false,
})
export class MenuCardComponent {
  @Input() menu!: any;
  constructor(
    protected service: MenuService,
    protected dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  setIngredientList(ingredients: Ingredient[]) {
    return ingredients.map((i: any) => i.ingredient.name).join(', ');
  }

  setAllergenList(ingredients: Ingredient[]) {
    const allergenArr =
      ingredients
        .map((ingredient: any) => ingredient.ingredient.allergens)
        .flat()
        .map((allergen) => allergen.name) ?? [];

    return [...new Set(allergenArr)].join(', ');
  }

  createMenuForm(meal: Meal) {
    return new FormGroup({
      meal: new FormControl(meal),
    });
  }

  openEditDialog(menu: Menu) {
    // reset formgroup for new values
    this.service.formGroup = this.service.setupFormGroup();

    // add id and name to form group
    this.service.formGroup.patchValue({
      _id: menu._id,
      name: menu.name,
    });

    const formArr: FormArray<FormGroup> =
      this.service.formGroup.controls['meals'];

    // ca't add as part of patch value, add formgroup for each ingredient to form array separately
    menu.meals.forEach((meal) => {
      const fg: FormGroup<any> = this.createMenuForm(meal);
      formArr.push(fg);
    });

    // remove initial empty value of form array
    formArr.removeAt(0);

    // open dialog with updated form group
    this.dialog.open(AddMenuComponent, {
      maxHeight: '100%',
      width: '300px',
    });
  }

  deleteMenu(menuId: string) {
    return this.service.deleteMenu$(menuId).subscribe({
      complete: () => {
        this.service.getMenus$().subscribe((menus) => {
          this.service.menus$.next(menus);
        });
        this.snackbarService.openSnackBar('Menu Deleted Successfully');
      },
      error: (err: any) => console.log(err),
    });
  }
}
