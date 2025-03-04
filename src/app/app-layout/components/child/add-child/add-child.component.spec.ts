import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddChildDetailsComponent } from './add-child.component';

describe('AddChildDetailsComponent', () => {
  let component: AddChildDetailsComponent;
  let fixture: ComponentFixture<AddChildDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddChildDetailsComponent],
    });
    fixture = TestBed.createComponent(AddChildDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
