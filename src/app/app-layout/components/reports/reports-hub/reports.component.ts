import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-hub',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  standalone: false,
})
export class ReportsComponent {
  nutritionSlides = [
    { chartId: '1', nutritionType: 'Calories' },
    { chartId: '2', nutritionType: 'Energy' },
    { chartId: '3', nutritionType: 'Fat' },
    { chartId: '4', nutritionType: 'Saturates' },
    { chartId: '5', nutritionType: 'Salt' },
    { chartId: '6', nutritionType: 'Sugars' },
  ];

}
