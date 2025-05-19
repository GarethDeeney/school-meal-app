import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Child } from 'src/app/models/child';
import { ChildService } from '../../child-hub.service';
import { ChildAddMealComponent } from '../add-meal/add-meal.component';

@Component({
  selector: 'app-child-meal-table',
  templateUrl: './child-meal-table.component.html',
  styleUrls: ['./child-meal-table.component.scss'],
  standalone: false,
})
export class ChildMealTableComponent implements OnInit {
  idParam!: string;
  child$!: Observable<Child>;
  nutrition$!: Observable<any>;
  datasource$ = new BehaviorSubject([]);
  @Input() meals!: [];

  displayedColumns: string[] = ['meal', 'date', 'nutrition'];

  constructor(
    protected childService: ChildService,
    protected activatedRoute: ActivatedRoute,
    protected http: HttpClient,
    protected dialog: MatDialog
  ) {}

  openAddChildDialog() {
    this.childService.formGroup.reset();

    this.dialog.open(ChildAddMealComponent, {
      height: '325px',
      width: '500px',
    });
  }

  ngOnInit(): void {
    this.datasource$.next(this.meals);
    this.datasource$.subscribe(console.log);
    // add meal to child option
    // should you be able to add meal to child from list?
    // should there be class lists? - or could be a furture enahncement to incorporate it into the attendance register if required???
    // first need to get list of meals
    // then add meals to child on particular date
    // need to get menus for the date
    //  if no menus added for a date need to say no menus available?
    // can make the dialog more than drop downs perhaps?
    // it should only show meals available to the child due to allergens? filter out any that have a cross contamination?
  }
}
