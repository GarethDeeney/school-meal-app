import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ReportService } from '../reports.service';

@Component({
  selector: 'cost-report',
  template: ` <div style="width: 80%;">
    <canvas id="{{ chartId }}"> </canvas>
  </div>`,
  styleUrls: [],
  standalone: false,
})
export class CostReportComponent implements OnInit {
  constructor(protected reportService: ReportService) {}
  @Input() chartId: string = 'chartId';

  ngOnInit(): void {
    this.reportService.getCostReport$().subscribe((val) => {
      const data = [
        { month: 'Jan', count: val.january },
        { month: 'Feb', count: val.february },
        { month: 'Mar', count: val.march },
        { month: 'Apr', count: val.april },
        { month: 'May', count: val.may },
        { month: 'June', count: val.june },
        { month: 'July', count: val.july },
        { month: 'Aug', count: val.august },
        { month: 'Sept', count: val.september },
        { month: 'Oct', count: val.october },
        { month: 'Nov', count: val.november },
        { month: 'Dec', count: val.december },
      ];

      new Chart(this.chartId, {
        type: 'bar',
        data: {
          labels: data.map((row) => row.month),
          datasets: [
            {
              label: `Total Cost per Month`,
              data: data.map((row) => row.count),
            },
          ],
        },
      });
    });
  }
}
