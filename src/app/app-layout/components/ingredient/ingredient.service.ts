import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient';
import { Nutrition } from 'src/app/models/Nutrition';
import { AllergenService } from '../allergen/allergenService';
import { Allergen } from 'src/app/models/allergen';

@Injectable({ providedIn: 'root' })
export class IngredientService {
  datasource$: BehaviorSubject<any[]> = new BehaviorSubject(<any>[]);
  api = '/api/ingredient/';
  constructor(
    protected http: HttpClient,
    protected allergenService: AllergenService
  ) {}

  allergies$ = this.allergenService.getAllergens$();

  getIngredients$(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.api}`);
  }

  setDataSource() {
    this.getIngredients$().subscribe((ingredients: Ingredient[]) => {
      this.datasource$.next([...ingredients]);
    });
  }

  formGroup = new FormGroup({
    _id: new FormControl<string | undefined>(undefined),
    name: new FormControl<string | undefined>(undefined, Validators.required),
    allergens: new FormControl<any[] | undefined>(
      undefined,
      Validators.required
    ),
    nutrition: new FormGroup({
      calories: new FormControl<number | undefined>(undefined),
      energy: new FormControl<number | undefined>(undefined),
      fat: new FormControl<number | undefined>(undefined),
      saturates: new FormControl<number | undefined>(undefined),
      sugars: new FormControl<number | undefined>(undefined),
      salt: new FormControl<number | undefined>(undefined),
    }),
    pricePerKG: new FormControl<number | undefined>(undefined),
  });

  getIngredientInfo$(ingredientId: string): Observable<Ingredient> {
    return this.http.get<Ingredient>(`${this.api}${ingredientId}`);
  }

  addIngredient$(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(`${this.api}`, ingredient);
  }

  updateIngredient$(ingredient: Ingredient): Observable<Ingredient> {
    console.log(ingredient);
    return this.http.put<Ingredient>(
      `${this.api}${ingredient._id}`,
      ingredient
    );
  }

  deleteIngredient$(id: string): Observable<any> {
    return this.http.delete(`${this.api}${id}`);
  }
}
