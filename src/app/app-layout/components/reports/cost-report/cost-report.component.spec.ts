import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportService } from '../reports.service';
import { CostReportComponent } from './cost-report.component';

describe('CostReportComponent', () => {
  let component: CostReportComponent;
  let fixture: ComponentFixture<CostReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostReportComponent],
      providers: [ReportService]
    });
    fixture = TestBed.createComponent(CostReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
