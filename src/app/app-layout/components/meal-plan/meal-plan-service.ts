import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { MealPlan, MealPlanDay } from 'src/app/models/mealPlan';
import { IngredientService } from '../ingredient/ingredient.service';
import { Meal } from 'src/app/models/meal';

@Injectable({ providedIn: 'root' })
export class MealPlanService {
  api = '/api/mealplan/';
  constructor(
    protected http: HttpClient,
    protected ingredientService: IngredientService
  ) {}

  mealPlans$ = new BehaviorSubject<any[]>([]);
  formGroup!: FormGroup;

  getMealPlans$() {
    return this.http.get<MealPlan[]>(`${this.api}`);
  }

  setMealsPlans() {
    this.getMealPlans$().subscribe((mealPlans) => {
      this.mealPlans$.next(mealPlans);
    });
  }

  createMealPlan$(mealPlan: MealPlan): Observable<MealPlan> {
    return this.http.post<MealPlan>(`${this.api}`, mealPlan);
  }

  editMealPlan$(mealPlan: MealPlan): Observable<MealPlan> {
    return this.http.put<MealPlan>(`${this.api}${mealPlan._id}`, mealPlan);
  }

  deleteMealPlan$(id: string): Observable<any> {
    return this.http.delete(`${this.api}${id}`);
  }

  setupFormGroup = (mealPlan?: MealPlan) => {
    this.formGroup = new FormGroup({
      _id: new FormControl<string | undefined>(mealPlan?._id),
      startDate: new FormControl<Date | undefined>(mealPlan?.monday.date),
      name: new FormControl<string | undefined>(
        mealPlan?.name,
        Validators.required
      ),
      monday: new FormControl<MealPlanDay | undefined>(
        mealPlan?.monday,
        Validators.required
      ),
      tuesday: new FormControl<MealPlanDay | undefined>(
        mealPlan?.tuesday,
        Validators.required
      ),
      wednesday: new FormControl<MealPlanDay | undefined>(
        mealPlan?.wednesday,
        Validators.required
      ),
      thursday: new FormControl<MealPlanDay | undefined>(
        mealPlan?.thursday,
        Validators.required
      ),
      friday: new FormControl<MealPlanDay | undefined>(
        mealPlan?.friday,
        Validators.required
      ),
    });
  };
}
const mealPlans = [
  {
    startDate: '2025-06-01',
    name: 'Week 1',
    monday: [
      {
        _id: '68065e9ec1eb88d02cd6a5a4',
        name: 'new meal',
        ingredients: [
          {
            amount: '12134',
            ingredient: {
              nutrition: {
                energy: '100',
                fat: '10',
                saturates: '19',
                salt: '3',
                sugars: '22',
              },
              _id: '6806349a8b585cb69af9b331',
              name: 'new ingredient',
              allergens: [
                {
                  _id: '67cafdd7768a744b3238d557',
                  name: 'Allergen 1',
                  reaction: 'something else',
                  specialRequirements: 'something',
                },
              ],
              pricePerKG: '1',
            },
          },
          {
            amount: '12134',
            ingredient: {
              nutrition: {
                energy: '100',
                fat: '10',
                saturates: '19',
                salt: '3',
                sugars: '22',
              },
              _id: '6806349a8b585cb69af9b331',
              name: 'new ingredient',
              allergens: [
                {
                  _id: '67cafdd7768a744b3238d557',
                  name: 'Allergen 1',
                  reaction: 'something else',
                  specialRequirements: 'something',
                },
              ],
              pricePerKG: '1',
            },
          },
          {
            amount: '12134',
            ingredient: {
              nutrition: {
                energy: '100',
                fat: '10',
                saturates: '19',
                salt: '3',
                sugars: '22',
              },
              _id: '6806349a8b585cb69af9b331',
              name: 'new ingredient',
              allergens: [
                {
                  _id: '67cafdd7768a744b3238d557',
                  name: 'Allergen 2',
                  reaction: 'something else',
                  specialRequirements: 'something',
                },
              ],
              pricePerKG: '1',
            },
          },
        ],
      },
    ],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  },
];
