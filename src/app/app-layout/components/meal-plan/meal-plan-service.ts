import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { DateTime } from 'luxon';
import { BehaviorSubject, Observable } from 'rxjs';
import { MealPlan, MealPlanDay } from 'src/app/models/mealPlan';
import { IngredientService } from '../ingredient/ingredient.service';

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

  getMealPlanByDate$(date: DateTime) {
    return this.http.get<MealPlan>(`${this.api}/date/${date}`);
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
      startDate: new FormControl<Date | undefined>(
        mealPlan?.startDate
      ),
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
