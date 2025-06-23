import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Child } from 'src/app/models/child';
import { ChildService } from '../child-hub.service';

@Component({
  selector: 'app-child-details',
  templateUrl: './child-details.component.html',
  styleUrls: ['./child-details.component.scss'],
  standalone: false,
})
export class ChildDetailsComponent implements OnInit {
  idParam!: string;
  child$!: Observable<Child>;
  nutrition$!: Observable<any>;

  constructor(
    protected childService: ChildService,
    protected activatedRoute: ActivatedRoute,
    protected http: HttpClient
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.idParam = params['_id'];
    });
  }

  setRecommendedCalories(child: Child): number {
    return Number(child.year) > 6 ? 800 : 550;
  }

  setRecommendedSugar(child: Child): number {
    let recommended = 0;
    if (Number(child.year) <= 3) {
      recommended = 19;
    } else if (Number(child.year) > 3 && Number(child.year) <= 6) {
      recommended = 24;
    } else {
      recommended = 30;
    }
    return recommended;
  }

  setRecommendedSaturates(child: Child): number {
    let recommended = 0;
    if (Number(child.year) <= 2) {
      recommended = 18;
    } else if (Number(child.year) > 2 && Number(child.year) <= 6) {
      recommended = 22;
    } else {
      recommended = 28;
    }
    return recommended;
  }

  setRecommendedFat(child: Child): number {
    let recommended = 0;
    if (Number(child.year) == 1) {
      recommended = 15;
    } else if (Number(child.year) > 2 && Number(child.year) <= 5) {
      recommended = 21;
    } else {
      recommended = 25;
    }
    return recommended;
  }

  ngOnInit(): void {
    this.child$ = this.childService.getChildInfo$(this.idParam);
    this.nutrition$ = this.childService.getChildNutritionInfo$(this.idParam);
  }
}
