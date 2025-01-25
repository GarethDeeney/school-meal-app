import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergenDetailsComponent } from './allergen-details.component';

describe('AllergenDetailsComponent', () => {
  let component: AllergenDetailsComponent;
  let fixture: ComponentFixture<AllergenDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllergenDetailsComponent]
    });
    fixture = TestBed.createComponent(AllergenDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
