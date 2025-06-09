import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import { BehaviorSubject, EMPTY, map, Observable } from 'rxjs';
import { Child } from 'src/app/models/child';
import { Meal } from 'src/app/models/meal';

@Injectable({ providedIn: 'root' })
export class ChildService {
  datasource$: BehaviorSubject<any> = new BehaviorSubject([]);
  mealsDatasource$: BehaviorSubject<any> = new BehaviorSubject([]);
  constructor(protected http: HttpClient) {}

  api = '/api/child/';

  formGroup = new FormGroup({
    _id: new FormControl<string | undefined>(undefined),
    name: new FormControl<string | undefined>(undefined, Validators.required),
    allergens: new FormControl<any[] | undefined>(
      undefined,
      Validators.required
    ),
    year: new FormControl<string | undefined>(undefined),
  });

  getChildren$() {
    return this.http
      .get<Child[]>('/api/child')
      .subscribe((children: Child[]) => {
        this.datasource$.next([...children]);
      });
  }

  getChildInfo$(childId: string): Observable<Child> {
    return this.http.get<Child>(`${this.api}${childId}`);
  }

  getChildMeals$(id: string) {
    return this.getChildInfo$(id)
      .pipe(map((child) => child.meals))
      .subscribe((meals) => this.mealsDatasource$.next(meals));
  }

  getChildNutritionInfo$(childId: string): Observable<Child> {
    return this.http.get<Child>(`${this.api}${childId}/nutrition`);
  }

  addChild$(child: Child): Observable<Child> {
    return this.http.post<Child>(`${this.api}`, child);
  }

  updateChild$(child: Child): Observable<Child> {
    return this.http.put<Child>(`${this.api}${child._id}`, child);
  }

  deleteChild$(id: string): Observable<any> {
    return this.http.delete(`${this.api}${id}`);
  }

  addMeal$(id: string, meals: { date: DateTime; meal: any }[]) {
    return this.http.post(`${this.api}${id}/meal`, meals);
  }

  editMealSelection$(id: string, meal: any) {
    return this.http.put<any>(`${this.api}${id}/meal`, meal);
  }

  formatDate(date: DateTime) {
    const dateStr = date
      .toString()
      .substring(0, 10)
      .split('-')
      .reverse()
      .join('-');

    return dateStr;
  }
}
