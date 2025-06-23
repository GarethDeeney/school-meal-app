import { Component, OnInit } from '@angular/core';
import { ReportService } from '../reports.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'nutrition-report',
  template: ` <div style="width: 80%;">
    <canvas id="nutrition"> </canvas>
  </div>`,
  styleUrls: [],
  standalone: false,
})
export class NutritionReportComponent implements OnInit {
  constructor(protected reportService: ReportService) {
    this.reportService.getNutritionReport$().subscribe(console.log);
  }

  ngOnInit(): void {
    this.reportService.getNutritionReport$().subscribe((val) => {
      console.log(val);

      const data = [
        { nutritionType: 'Fat', count: val.fat },
        { nutritionType: 'Sugars', count: val.sugars },
        { nutritionType: 'Saturates', count: val.saturates },
      ];

      new Chart('nutrition', {
        type: 'bar',
        data: {
          labels: data.map((row) => row.nutritionType),
          datasets: [
            {
              label: 'Acquisitions by nutritionType',
              data: data.map((row) => row.count),
            },
          ],
        },
      });
    });
  }
}
