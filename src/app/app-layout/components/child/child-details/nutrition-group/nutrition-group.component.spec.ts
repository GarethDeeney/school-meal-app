import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NutritionGroupComponent } from './nutrition-group.component';

describe('NutritionGroupComponent', () => {
  let component: NutritionGroupComponent;
  let fixture: ComponentFixture<NutritionGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutritionGroupComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
      ],
      imports: [RouterTestingModule],
    });
    fixture = TestBed.createComponent(NutritionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set nutrition colour', () => {
    expect(component.setNutritionColour('energy')).toEqual('green');

    component.recommended = 100;
    component.nutrition = 75;
    expect(component.setNutritionColour('')).toEqual('green');

    component.nutrition = 52;
    fixture.detectChanges();
    expect(component.setNutritionColour('fat')).toEqual('yellow');

    component.nutrition = 30;
    fixture.detectChanges();
    expect(component.setNutritionColour('fat')).toEqual('red');
  });
});
