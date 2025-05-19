import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildMealTableComponent } from './child-meal-table.component';

describe('ChildMealTableComponent', () => {
  let component: ChildMealTableComponent;
  let fixture: ComponentFixture<ChildMealTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildMealTableComponent],
    });
    fixture = TestBed.createComponent(ChildMealTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
