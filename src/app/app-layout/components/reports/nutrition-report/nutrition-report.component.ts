import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ReportService } from '../reports.service';
import { NutritionGroupComponent } from '../../child/child-details/nutrition-group/nutrition-group.component';

@Component({
  selector: 'nutrition-report',
  template: `
    <div class="nutrition-reports">
      <h2>Nutrition Reports</h2>

      <div class="chart-row">
        <div class="chart-box">
          <canvas id="caloriesChart"> </canvas>
        </div>

        <div class="chart-box">
          <canvas id="fatChart"> </canvas>
        </div>
      </div>

      <div class="chart-row">
        <div class="chart-box">
          <canvas id="saturatesChart"> </canvas>
        </div>

        <div class="chart-box">
          <canvas id="saltChart"> </canvas>
        </div>

        <div class="chart-box">
          <canvas id="sugarChart"> </canvas>
        </div>
      </div>
    </div>
  `,
  styles: `

 .nutrition-reports {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   margin-top: 1rem;
   width: 98%;
   gap: 0.25rem;
 }

 .chart-row {
   display: flex;
   gap: 1rem;
   width: 100%;
   justify-content: center;
 }

 .chart-box {
   width: 30%;
   border: 1px solid lightgray;
   border-radius: 15px;
   padding: 0.5rem;
 }
  `,
  standalone: false,
})
export class NutritionReportComponent implements OnInit {
  constructor(protected reportService: ReportService) {}

  setDataAndChart(
    obj: any,
    nutritionType: string,
    chartId: string,
    recommendedAmount: number
  ) {
    const data = this.createData(obj, nutritionType);
    const labelType = this.setLabelType(nutritionType);

    return new Chart(chartId, {
      type: 'bar',
      data: {
        labels: data.map((row) => row.month),
        datasets: [
          {
            label: `Average (${nutritionType} (${labelType}))`,
            data: data.map((row) => row.count),
          },
          {
            type: 'line',
            label: `Recommended intake (${nutritionType} (${labelType}))`,
            data: this.createRecommendedData(recommendedAmount),
          },
        ],
      },
    });
  }

  createRecommendedData = (recommended: number) => {
    return Array(12).fill(recommended);
  };

  createData = (data: any, nutritionType: string) => {
    return [
      { month: 'Jan', count: data.january[nutritionType.toLowerCase()] },
      { month: 'Feb', count: data.february[nutritionType.toLowerCase()] },
      { month: 'Mar', count: data.march[nutritionType.toLowerCase()] },
      { month: 'Apr', count: data.april[nutritionType.toLowerCase()] },
      { month: 'May', count: data.may[nutritionType.toLowerCase()] },
      { month: 'June', count: data.june[nutritionType.toLowerCase()] },
      { month: 'July', count: data.july[nutritionType.toLowerCase()] },
      { month: 'Aug', count: data.august[nutritionType.toLowerCase()] },
      { month: 'Sept', count: data.september[nutritionType.toLowerCase()] },
      { month: 'Oct', count: data.october[nutritionType.toLowerCase()] },
      { month: 'Nov', count: data.november[nutritionType.toLowerCase()] },
      { month: 'Dec', count: data.december[nutritionType.toLowerCase()] },
    ];
  };

  setLabelType = (nutritionType: string) =>
    nutritionType == 'Calories' ? 'kcal' : 'g';

  ngOnInit(): void {
    this.reportService.getNutritionReport$().subscribe((val) => {
      this.setDataAndChart(val, 'Calories', 'caloriesChart', 400);
      this.setDataAndChart(val, 'Fat', 'fatChart', 17);
      this.setDataAndChart(val, 'Saturates', 'saturatesChart', 22);
      this.setDataAndChart(val, 'Salt', 'saltChart', 1);
      this.setDataAndChart(val, 'Sugars', 'sugarChart', 8);
    });
  }
}
