import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ReportService } from '../reports.service';
import { CostReportComponent } from './cost-report.component';

describe('CostReportComponent', () => {
  let component: CostReportComponent;
  let fixture: ComponentFixture<CostReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostReportComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        ReportService,
      ],
    });
    fixture = TestBed.createComponent(CostReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
