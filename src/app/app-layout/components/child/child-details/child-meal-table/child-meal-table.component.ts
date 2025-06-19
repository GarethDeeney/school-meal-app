import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import { Child } from 'src/app/models/child';
import { Ingredient } from 'src/app/models/ingredient';
import { ChildService } from '../../child-hub.service';
import { ChildAddMealComponent } from '../add-meal/add-meal.component';
import { ChildEditMealComponent } from '../edit-meal/edit-meal.component';

@Component({
  selector: 'app-child-meal-table',
  templateUrl: './child-meal-table.component.html',
  styleUrls: ['./child-meal-table.component.scss'],
  standalone: false,
})
export class ChildMealTableComponent implements OnInit {
  idParam!: string;
  nutrition$!: Observable<any>;
  @Input() child!: Child;
  displayedColumns: string[] = ['meal', 'date', 'nutrition', 'actions'];

  constructor(
    protected childService: ChildService,
    protected activatedRoute: ActivatedRoute,
    protected http: HttpClient,
    protected dialog: MatDialog
  ) {}

  openAddChildDialog() {
    this.childService.formGroup.reset();

    this.dialog.open(ChildAddMealComponent, {
      height: '575px',
      width: '400px',
      data: {
        id: this.child._id,
        allergens: this.child.allergens,
      },
    });
  }

  openEditDialog(element: any) {
    this.dialog.open(ChildEditMealComponent, {
      height: '235px',
      width: '400px',
      data: {
        date: DateTime.fromISO(element.date),
        meal: {
          _id: element._id,
          name: element.name,
          ingredients: element.ingredients,
        },
        allergens: this.child.allergens,
        id: this.child._id,
      },
    });
  }

  ngOnInit(): void {
    this.childService.getChildMeals$(this.child._id!);
  }

  getNutrtionalVal = (ingredients: any[], prop: string): number => {
    // map through meal array to get nutritional info
    return (
      ingredients
        .map((ingredient: { ingredient: Ingredient; amount: number }) => {
          // cast as any to use dynamic property value and mitigate unneccessary repetition
          return (ingredient.ingredient.nutrition as any)[prop];
        })
        // add values up to get full value of nutrition
        .reduce((previousVal, currentVal) => {
          return previousVal + currentVal;
        })
    );
  };
}
