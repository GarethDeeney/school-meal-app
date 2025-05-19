import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildAddMealComponent } from './add-meal.component';

describe('ChildAddMealComponent', () => {
  let component: ChildAddMealComponent;
  let fixture: ComponentFixture<ChildAddMealComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildAddMealComponent],
    });
    fixture = TestBed.createComponent(ChildAddMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
