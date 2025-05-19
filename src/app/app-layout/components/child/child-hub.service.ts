import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Child } from 'src/app/models/child';

@Injectable({ providedIn: 'root' })
export class ChildService {
  datasource$: BehaviorSubject<any[]> = new BehaviorSubject(<any>[]);

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

  getMenu$(id: string, date: any) {
    return this.http.get<any>(`${this.api}/id/menu`);
  }
}
