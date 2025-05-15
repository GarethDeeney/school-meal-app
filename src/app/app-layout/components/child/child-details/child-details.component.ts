import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.child$ = this.childService.getChildInfo$(this.idParam);
    this.nutrition$ = this.childService.getChildNutritionInfo$(this.idParam);

    this.nutrition$.subscribe((val) => {
      console.log('inside observable');
      console.log(val);
    });
  }
}
