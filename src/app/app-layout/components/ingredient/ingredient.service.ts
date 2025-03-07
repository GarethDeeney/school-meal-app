import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient';

@Injectable({ providedIn: 'root' })
export class IngredientService {
  datasource$: BehaviorSubject<any[]> = new BehaviorSubject(<any>[]);

  constructor(protected http: HttpClient) {}

  getIngredient$() {
    return this.http
      .get<Ingredient[]>('/api/ingredient')
      .subscribe((ingredients: Ingredient[]) => {
        this.datasource$.next([...ingredients]);
      });
  }

  getIngredientInfo$(ingredientId: string): Observable<Ingredient> {
    return this.http.get<Ingredient>(`/api/ingredient${ingredientId}`);
  }

  addIngredient$(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(`/api/ingredient`, ingredient);
  }
}
