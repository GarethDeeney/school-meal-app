import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChildService } from '../../child-hub.service';

@Component({
  selector: 'nutrition-group',
  templateUrl: './nutrition-group.component.html',
  styleUrls: ['./nutrition-group.component.scss'],
  standalone: false,
})
export class NutritionGroupComponent {
  @Input() nutrition: any;
  @Input() nutritionType!: string;
  @Input() unit!: string;
  @Input() recommended!: number;

  constructor(
    protected childService: ChildService,
    protected activatedRoute: ActivatedRoute,
    protected http: HttpClient
  ) {}

  setNutritionColour(nutrtionType: string): string {
    if (nutrtionType == 'energy') {
      return 'green';
    }

    const percentage = (this.nutrition / this.recommended) * 100;
    let colour;
    if (percentage > 70) {
      colour = 'green';
    } else if (percentage < 70 && percentage > 50) {
      colour = 'yellow';
    } else {
      colour = 'red';
    }
    return colour;
  }
}
