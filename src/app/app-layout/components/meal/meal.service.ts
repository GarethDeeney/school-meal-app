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
  datasource$: BehaviorSubject<any[]> = new BehaviorSubject(<any>[]);
  api = '/api/meal/';
  constructor(
    protected http: HttpClient,
    protected ingredientService: IngredientService
  ) {}

  meals$ = new BehaviorSubject<Meal[]>([]);

  getMeals$() {
    return this.http.get<Meal[]>(`${this.api}`).subscribe((meals) => {
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

  formGroup = new FormGroup({
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

  // addFormGroup = () => {
  //   this.formGroup.controls['ingredients'].push(new FormGroup({}));
  // };

  // emptyformGroup = new FormGroup({
  //   ingredient: new FormControl(undefined),
  // });

  // getIngredientInfo$(ingredientId: string): Observable<Ingredient> {
  //   return this.http.get<Ingredient>(`${this.api}${ingredientId}`);
  // }

  addMeal$(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(`${this.api}`, meal);
  }

  // updateIngredient$(ingredient: Ingredient): Observable<Ingredient> {
  //   return this.http.put<Ingredient>(
  //     `${this.api}${ingredient._id}`,
  //     ingredient
  //   );
  // }

  // deleteIngredient$(id: string): Observable<any> {
  //   return this.http.delete(`${this.api}${id}`);
  // }
}

const meals = [
  {
    name: 'A new meal',
    ingredients: [
      {
        ingredient: {
          name: 'New Ingredient',
          allergens: [
            {
              name: 'Ingredient 2 Allergen',
              reaction: '',
              specialRequirements: '',
            },
            {
              name: 'Ingredient 1 Allergen',
              reaction: '',
              specialRequirements: '',
            },
          ],
          pricePerKG: 1.0,
          nutrition: {
            energy: 100,
            fat: 100,
            saturates: 100,
            sugars: 100,
            salt: 100,
          },
        },
        amount: 100,
      },
      {
        amount: 100,

        ingredient: {
          name: 'New Ingredient',
          allergens: [
            {
              name: 'Ingredient 1 Allergen',
              reaction: '',
              specialRequirements: '',
            },
          ],
          pricePerKG: 1.0,
          nutrition: {
            energy: 10,
            fat: 10,
            saturates: 10,
            sugars: 10,
            salt: 10,
          },
        },
      },
      {
        amount: 100,
        ingredient: {
          name: 'New Ingredient',
          allergens: [
            {
              name: 'Ingredient 3 Allergen',
              reaction: '',
              specialRequirements: '',
            },
            {
              name: 'Ingredient 2 Allergen',
              reaction: '',
              specialRequirements: '',
            },
            {
              name: 'Ingredient 1 Allergen',
              reaction: '',
              specialRequirements: '',
            },
          ],
          pricePerKG: 1.0,
          nutrition: {
            energy: 10,
            fat: 10,
            saturates: 10,
            sugars: 10,
            salt: 10,
          },
        },
      },
    ],
  },
];
