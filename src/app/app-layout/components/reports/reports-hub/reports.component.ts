import { Component, OnInit } from '@angular/core';
import { ReportService } from '../reports.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-menu-hub',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  standalone: false,
})
export class ReportsComponent implements OnInit {
  constructor(protected reportService: ReportService) {
    this.reportService.getNutritionReport$().subscribe(console.log);
  }

  ngOnInit(): void {
    const data = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ];

    new Chart('acquisitions', {
      type: 'bar',
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map((row) => row.count),
          },
        ],
      },
    });
  }
}
