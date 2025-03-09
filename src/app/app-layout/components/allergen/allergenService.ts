import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Allergen } from 'src/app/models/allergen';

@Injectable({ providedIn: 'root' })
export class AllergenService {
  datasource$: BehaviorSubject<any[]> = new BehaviorSubject(<any>[]);
  api = `/api/allergen/`;
  constructor(protected http: HttpClient) {}

  formGroup = new FormGroup({
    _id: new FormControl<string | undefined>(undefined),
    name: new FormControl<string | undefined>(undefined, Validators.required),
    reaction: new FormControl<string | undefined>(
      undefined,
      Validators.required
    ),
    specialRequirements: new FormControl<string | undefined>(undefined),
  });

  getAllergens$(): Observable<Allergen[]> {
    return this.http.get<Allergen[]>(`${this.api}`);
  }

  setDataSource() {
    this.getAllergens$().subscribe((allergens: Allergen[]) => {
      this.datasource$.next([...allergens]);
    });
  }

  getAllergenInfo$(allergenId: string): Observable<Allergen> {
    return this.http.get<Allergen>(`${this.api}${allergenId}`);
  }

  addAllergen$(allergen: Allergen): Observable<Allergen> {
    return this.http.post<Allergen>(`${this.api}`, allergen);
  }

  updateAllergen$(allergen: Allergen): Observable<Allergen> {
    return this.http.put<Allergen>(`${this.api}${allergen._id}`, allergen);
  }

  deleteAllergen$(id: string): Observable<any> {
    return this.http.delete(`${this.api}${id}`);
  }
}
