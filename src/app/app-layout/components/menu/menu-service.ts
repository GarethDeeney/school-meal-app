import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Menu } from 'src/app/models/menu';
import { IngredientService } from '../ingredient/ingredient.service';
import { meals } from '../meal/meal.service';

@Injectable({ providedIn: 'root' })
export class MenuService {
  api = '/api/menu/';
  constructor(
    protected http: HttpClient,
    protected ingredientService: IngredientService
  ) {}

  menus$ = new BehaviorSubject<Menu[]>([]);

  getMenus$() {
    return this.http.get<Menu[]>(`${this.api}`);
  }

  setMenus() {
    this.getMenus$().subscribe((menus: Menu[]) => {
      console.log(menus);
      this.menus$.next([...menus]);
    });
  }

  addMenu$(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(`${this.api}`, menu);
  }

  editMenu$(menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this.api}${menu._id}`, menu);
  }

  deleteMenu$(id: string) {
    return this.http.delete(`${this.api}${id}`);
  }

  setupFormGroup = () => {
    return new FormGroup({
      _id: new FormControl<string | undefined>(undefined),
      name: new FormControl<string | undefined>(undefined, Validators.required),
      meals: new FormArray<FormGroup>(
        [
          new FormGroup({
            meal: new FormControl(),
          }),
        ],
        Validators.required
      ),
    });
  };

  formGroup = this.setupFormGroup();

  get meals() {
    return this.formGroup.controls['meals'];
  }

  addMeal = () => {
    const mealFormGroup = new FormGroup({
      meal: new FormControl(),
    });
    this.meals.push(mealFormGroup);
  };

  removeMeal = (index: number) => {
    this.meals.removeAt(index);
  };
}

const menu = [{ name: 'Menu 1', meals: [...meals, ...meals] }];
