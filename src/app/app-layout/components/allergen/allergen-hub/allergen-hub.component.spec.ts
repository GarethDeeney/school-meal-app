import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergenHubComponent } from './allergen-hub.component';

describe('AllergenHubComponent', () => {
  let component: AllergenHubComponent;
  let fixture: ComponentFixture<AllergenHubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllergenHubComponent]
    });
    fixture = TestBed.createComponent(AllergenHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
