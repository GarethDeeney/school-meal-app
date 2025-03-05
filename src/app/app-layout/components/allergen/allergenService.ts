import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Allergen } from 'src/app/models/allergen';

@Injectable({ providedIn: 'root' })
export class AllergenService {
  datasource$: BehaviorSubject<any[]> = new BehaviorSubject(<any>[]);

  constructor(protected http: HttpClient) {}

  getAllergens$() {
    return this.http
      .get<Allergen[]>('/api/allergen')
      .subscribe((allergens: Allergen[]) => {
        this.datasource$.next([...allergens]);
      });
  }

  getAllergenInfo$(allergenId: string): Observable<Allergen> {
    return this.http.get<Allergen>(`/api/allergen/${allergenId}`);
  }

  addAllergen$(allergen: Allergen): Observable<Allergen> {
    return this.http.post<Allergen>(`/api/ allergen`, allergen);
  }
}
