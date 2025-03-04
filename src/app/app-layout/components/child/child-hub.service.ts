import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Child } from 'src/app/models/child';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Injectable({ providedIn: 'root' })
export class ChildService {
  datasource$: BehaviorSubject<any[]> = new BehaviorSubject(<any>[]);

  constructor(protected http: HttpClient) {}

  getChildren$() {
    return this.http.get<Child[]>('/api/child').subscribe((children: Child[]) =>{
      this.datasource$.next([...children])
    });
  }

  getChildInfo$(childId: string): Observable<Child> {
    return this.http.get<Child>(`/api/child/${childId}`);
  }

  addChild$(child: Child): Observable<Child> {
    return this.http.post<Child>(`/api/child`, child);
  }
}
