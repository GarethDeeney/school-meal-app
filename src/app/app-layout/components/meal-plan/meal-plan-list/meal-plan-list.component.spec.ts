import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngredientHubComponent } from '../../ingredient/ingredient-hub/ingredient-hub.component';


describe('IngredientHubComponent', () => {
  let component: IngredientHubComponent;
  let fixture: ComponentFixture<IngredientHubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientHubComponent]
    });
    fixture = TestBed.createComponent(IngredientHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
