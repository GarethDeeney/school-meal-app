import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ReportService } from '../reports.service';

@Component({
  selector: 'nutrition-report',
  template: ` <div style="width: 80%;">
    <canvas id="{{ chartId }}"> </canvas>
  </div>`,
  styleUrls: [],
  standalone: false,
})
export class NutritionReportComponent implements OnInit {
  constructor(protected reportService: ReportService) {}
  @Input() nutritionType: string = '';
  @Input() chartId: string = 'chartId';

  ngOnInit(): void {
    this.reportService.getNutritionReport$().subscribe((val) => {
      const data = [
        { month: 'Jan', count: val.january[this.nutritionType.toLowerCase()] },
        { month: 'Feb', count: val.february[this.nutritionType.toLowerCase()] },
        { month: 'Mar', count: val.march[this.nutritionType.toLowerCase()] },
        { month: 'Apr', count: val.april[this.nutritionType.toLowerCase()] },
        { month: 'May', count: val.may[this.nutritionType.toLowerCase()] },
        { month: 'June', count: val.june[this.nutritionType.toLowerCase()] },
        { month: 'July', count: val.july[this.nutritionType.toLowerCase()] },
        { month: 'Aug', count: val.august[this.nutritionType.toLowerCase()] },
        {
          month: 'Sept',
          count: val.september[this.nutritionType.toLowerCase()],
        },
        { month: 'Oct', count: val.october[this.nutritionType.toLowerCase()] },
        { month: 'Nov', count: val.november[this.nutritionType.toLowerCase()] },
        { month: 'Dec', count: val.december[this.nutritionType.toLowerCase()] },
      ];

      new Chart(this.chartId, {
        type: 'bar',
        data: {
          labels: data.map((row) => row.month),
          datasets: [
            {
              label: `Average intake of ${this.nutritionType}`,
              data: data.map((row) => row.count),
            },
          ],
        },
      });
    });
  }
}
