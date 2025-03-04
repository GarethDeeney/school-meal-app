import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Allergen } from 'src/app/models/child';

@Injectable({ providedIn: 'root' })
export class AllergenService {
  datasource$: BehaviorSubject<any[]> = new BehaviorSubject(<any>[]);

  constructor(protected http: HttpClient) {}

  getAllergens$() {
    return this.http.get<Child[]>('/api/child').subscribe((children: Allergen[]) =>{
      this.datasource$.next([...children])
    });
  }

  getChildInfo$(childId: string): Observable<Allergen> {
    return this.http.get<Child>(`/api/child/${childId}`);
  }

  addChild$(child: Child): Observable<Child> {
    return this.http.post<Child>(`/api/child`, child);
  }
}
