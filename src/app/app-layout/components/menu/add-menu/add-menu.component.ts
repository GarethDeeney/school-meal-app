import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/models/menu';
import { MealService } from '../../meal/meal.service';
import { MenuService } from '../menu-service';
import { Meal } from 'src/app/models/meal';
import { SnackbarService } from '../../snackbar-service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss'],
  standalone: false,
})
export class AddMenuComponent {
  @Input() menu!: Menu;

  constructor(
    protected service: MenuService,
    protected mealService: MealService,
    public dialogRef: MatDialogRef<AddMenuComponent>,
    protected snackbarService: SnackbarService
  ) {}
  meals$: Observable<Meal[]> = this.mealService.getMeals$();

  hasId(fg: FormGroup){
    return !!fg.controls['_id'].value;
  }

  getMealValues(fg: FormGroup) {
    return {
      _id: fg.controls['_id'].value,
      name: fg.controls['name'].value,
      meals: fg.controls['meals'].value.map((meal: any) => {
        return { ...meal.meal };
      }),
    };
  }

  compareMeals = (a: any, b: any) => a._id == b._id;

  close() {
    this.dialogRef.close();
  }

  submit() {
    const menu = this.getMealValues(this.service.formGroup);
    return menu._id ? this.editMenu(menu) : this.addMenu(menu);
  }

  addMenu(menu: Menu) {
    return this.service.addMenu$(menu).subscribe({
      complete: () => {
        this.dialogRef.close();
        this.service.getMenus$().subscribe((menus) => {
          this.service.menus$.next(menus);
        });
        this.snackbarService.openSnackBar('Menu Create Successful');
      },
      error: (err) => console.log(err),
    });
  }

  editMenu(menu: Menu) {
    return this.service.editMenu$(menu).subscribe({
      complete: () => {
        this.dialogRef.close();
        this.service.getMenus$().subscribe((menus) => {
          this.service.menus$.next(menus);
        });
        this.snackbarService.openSnackBar('Menu Updated Successfully');
      },
      error: (err) => console.log(err),
    });
  }
}
