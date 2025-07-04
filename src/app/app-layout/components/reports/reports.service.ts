import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ReportService {
  api = '/api/reports';
  constructor(protected http: HttpClient) {}

  getNutritionReport$() {
    return this.http.get<any>(`${this.api}/nutrition-report`);
  }

    getCostReport$() {
    return this.http.get<any>(`${this.api}/cost-report`);
  }
}
