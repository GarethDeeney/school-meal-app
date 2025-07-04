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
          <canvas id="energyChart"> </canvas>
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

  setDataAndChart(obj: any, nutritionType: string, chartId: string) {
    const data = [
      { month: 'Jan', count: obj.january[nutritionType.toLowerCase()] },
      { month: 'Feb', count: obj.february[nutritionType.toLowerCase()] },
      { month: 'Mar', count: obj.march[nutritionType.toLowerCase()] },
      { month: 'Apr', count: obj.april[nutritionType.toLowerCase()] },
      { month: 'May', count: obj.may[nutritionType.toLowerCase()] },
      { month: 'June', count: obj.june[nutritionType.toLowerCase()] },
      { month: 'July', count: obj.july[nutritionType.toLowerCase()] },
      { month: 'Aug', count: obj.august[nutritionType.toLowerCase()] },
      { month: 'Sept', count: obj.september[nutritionType.toLowerCase()] },
      { month: 'Oct', count: obj.october[nutritionType.toLowerCase()] },
      { month: 'Nov', count: obj.november[nutritionType.toLowerCase()] },
      { month: 'Dec', count: obj.december[nutritionType.toLowerCase()] },
    ];

    let labelType;

    if (nutritionType == 'Calories') {
      labelType = 'kcal';
    } else if (nutritionType == 'Energy') {
      labelType = 'kj';
    } else {
      labelType = 'g';
    }

    return new Chart(chartId, {
      type: 'bar',
      data: {
        labels: data.map((row) => row.month),
        datasets: [
          {
            label: `Average intake of ${nutritionType} (${labelType})`,
            data: data.map((row) => row.count),
          },
        ],
      },
    });
  }

  ngOnInit(): void {
    this.reportService.getNutritionReport$().subscribe((val) => {
      this.setDataAndChart(val, 'Calories', 'caloriesChart');
      this.setDataAndChart(val, 'Energy', 'energyChart');
      this.setDataAndChart(val, 'Fat', 'fatChart');
      this.setDataAndChart(val, 'Saturates', 'saturatesChart');
      this.setDataAndChart(val, 'Salt', 'saltChart');
      this.setDataAndChart(val, 'Sugars', 'sugarChart');
    });
  }
}
