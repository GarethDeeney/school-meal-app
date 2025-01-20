import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient, HttpHandler } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material-module';
import { ComponentModule } from '../../components/components.module';
import { StaffHubComponent } from './staff-hub.component';

describe('StaffHubComponent', () => {
  let component: StaffHubComponent;
  let fixture: ComponentFixture<StaffHubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffHubComponent],
      providers: [HttpClient, HttpHandler, Router],
      imports: [
        MaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ComponentModule,
      ],
    });
    fixture = TestBed.createComponent(StaffHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
