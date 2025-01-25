import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuHubComponent } from './menu-hub.component';

describe('MenuHubComponent', () => {
  let component: MenuHubComponent;
  let fixture: ComponentFixture<MenuHubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuHubComponent]
    });
    fixture = TestBed.createComponent(MenuHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
