import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildHubComponent } from './child-hub.component';

describe('ChildHubComponent', () => {
  let component: ChildHubComponent;
  let fixture: ComponentFixture<ChildHubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildHubComponent]
    });
    fixture = TestBed.createComponent(ChildHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
