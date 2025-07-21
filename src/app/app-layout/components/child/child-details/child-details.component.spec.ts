import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Child } from 'src/app/models/child';
import { SideNavComponent } from '../../side-nav/side-nav.component';
import { ChildDetailsComponent } from './child-details.component';

describe('ChildDetailsComponent', () => {
  let component: ChildDetailsComponent;
  let fixture: ComponentFixture<ChildDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildDetailsComponent, SideNavComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        provideAnimations(),
        provideNativeDateAdapter(),
      ],
      imports: [
        MatInputModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule,
        MatDatepickerModule,
        RouterTestingModule,
        MatSidenavModule,
        MatIconModule,
      ],
    });
    fixture = TestBed.createComponent(ChildDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set recommended calories by year', () => {
    let child: Child = {
      _id: '1',
      name: 'name',
      allergens: [],
      meals: [],
      year: '1',
    };
    expect(component.setRecommendedCalories(child)).toEqual(550);

    child = { ...child, year: '7' };
    expect(component.setRecommendedCalories(child)).toEqual(800);
  });

  it('should set recommended sugar by year', () => {
    let child: Child = {
      _id: '1',
      name: 'name',
      allergens: [],
      meals: [],
      year: '1',
    };

    expect(component.setRecommendedSugar(child)).toEqual(19);

    child = { ...child, year: '4' };
    expect(component.setRecommendedSugar(child)).toEqual(24);

    child = { ...child, year: '7' };
    expect(component.setRecommendedSugar(child)).toEqual(30);
  });

  it('should set recommended saturates by year', () => {
    let child: Child = {
      _id: '1',
      name: 'name',
      allergens: [],
      meals: [],
      year: '1',
    };

    expect(component.setRecommendedSaturates(child)).toEqual(18);

    child = { ...child, year: '3' };
    expect(component.setRecommendedSaturates(child)).toEqual(22);

    child = { ...child, year: '7' };
    expect(component.setRecommendedSaturates(child)).toEqual(28);
  });

  it('should set recommended fat by year', () => {
    let child: Child = {
      _id: '1',
      name: 'name',
      allergens: [],
      meals: [],
      year: '1',
    };

    expect(component.setRecommendedFat(child)).toEqual(15);

    child = { ...child, year: '3' };
    expect(component.setRecommendedFat(child)).toEqual(21);

    child = { ...child, year: '7' };
    expect(component.setRecommendedFat(child)).toEqual(25);
  });
});
