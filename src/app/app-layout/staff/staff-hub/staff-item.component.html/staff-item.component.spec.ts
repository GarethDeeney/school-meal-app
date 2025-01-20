import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaffItemComponent } from './staff-item.component';
import { Component } from '@angular/core';

@Component({
  selector: `host-component`,
  template: `<app-staff-item [staff]="mockStaff"></app-staff-item>`,
})
class TestHostComponent {
  mockStaff = {
    id: 'd0043f2b-a79e-4102-9699-113a1ae1e94b',
    forename: 'April',
    surname: 'Batham',
    role: 'Accountant',
    startDate: '09/11/2021',
    courses: [],
  };
}

describe('StaffHubComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffItemComponent, TestHostComponent],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
