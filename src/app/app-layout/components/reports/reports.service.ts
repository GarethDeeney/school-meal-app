import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from 'src/app/models/menu';
import { Nutrition } from 'src/app/models/Nutrition';

@Injectable({ providedIn: 'root' })
export class ReportService {
  api = '/api/reports';
  constructor(protected http: HttpClient) {}

  getNutritionReport$() {
    return this.http.get<any>(`${this.api}/nutritionReport`);
  }
}
