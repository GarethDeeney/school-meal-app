import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildEditMealComponent } from './edit-meal.component';


describe('ChildEditMealComponent', () => {
  let component: ChildEditMealComponent;
  let fixture: ComponentFixture<ChildEditMealComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildEditMealComponent],
    });
    fixture = TestBed.createComponent(ChildEditMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
