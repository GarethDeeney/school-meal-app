import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient';
import { Nutrition } from 'src/app/models/Nutrition';
import { AllergenService } from '../allergen/allergenService';
import { Meal } from 'src/app/models/meal';
import { IngredientService } from '../ingredient/ingredient.service';

@Injectable({ providedIn: 'root' })
export class MealService {
  api = '/api/meal/';
  constructor(
    protected http: HttpClient,
    protected ingredientService: IngredientService
  ) {}

  meals$ = new BehaviorSubject<Meal[]>([]);

  getMeals$() {
    return this.http.get<Meal[]>(`${this.api}`);
  }

  setMeals() {
    this.getMeals$().subscribe((meals) => {
      this.meals$.next(meals);
    });
  }

  get ingredients() {
    return this.formGroup.controls['ingredients'];
  }

  addIngredient = () => {
    const ingredientFg = new FormGroup({
      ingredient: new FormControl(),
      amount: new FormControl(),
    });
    this.ingredients.push(ingredientFg);
  };

  removeIngredient = (index: number) => {
    this.ingredients.removeAt(index);
  };

  addMeal$(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(`${this.api}`, meal);
  }

  editMeal$(meal: Meal): Observable<Meal> {
    return this.http.put<Meal>(`${this.api}${meal._id}`, meal);
  }

  deleteMeal$(id: string): Observable<any> {
    return this.http.delete(`${this.api}${id}`);
  }

  setupFormGroup = () => {
    return new FormGroup({
      _id: new FormControl<string | undefined>(undefined),
      name: new FormControl<string | undefined>(undefined, Validators.required),
      ingredients: new FormArray<FormGroup>(
        [
          new FormGroup({
            ingredient: new FormControl(),
            amount: new FormControl(),
          }),
        ],
        Validators.required
      ),
    });
  };

  formGroup = this.setupFormGroup();
}
