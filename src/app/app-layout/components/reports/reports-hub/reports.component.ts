import { Component, OnInit } from '@angular/core';
import { ReportService } from '../reports.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-menu-hub',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  standalone: false,
})
export class ReportsComponent {
  constructor(protected reportService: ReportService) {
    this.reportService.getNutritionReport$().subscribe(console.log);
  }
}
