import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ReportService } from '../reports.service';
import { NutritionReportComponent } from './nutrition-report.component';

describe('NutritionReportComponent', () => {
  let component: NutritionReportComponent;
  let fixture: ComponentFixture<NutritionReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutritionReportComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        ReportService,
      ],
    });
    fixture = TestBed.createComponent(NutritionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create recommended data for each month of the year', () => {
    expect(component.createRecommendedData(100)).toEqual([
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
    ]);

    expect(component.createRecommendedData(5)).toEqual([
      5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    ]);
  });

  it('should create data for each month of the year', () => {
    const data = {
      january: {
        calories: '0.00',
        energy: '0.00',
        fat: '0.00',
        salt: '0.00',
        saturates: '0.00',
        sugars: '0.00',
      },
      february: {
        calories: '0.00',
        energy: '0.00',
        fat: '0.00',
        salt: '0.00',
        saturates: '0.00',
        sugars: '0.00',
      },
      march: {
        calories: '0.00',
        energy: '0.00',
        fat: '0.00',
        salt: '0.00',
        saturates: '0.00',
        sugars: '0.00',
      },
      april: {
        calories: '0.00',
        energy: '0.00',
        fat: '0.00',
        salt: '0.00',
        saturates: '0.00',
        sugars: '0.00',
      },
      may: {
        calories: '0.00',
        energy: '0.00',
        fat: '0.00',
        salt: '0.00',
        saturates: '0.00',
        sugars: '0.00',
      },
      june: {
        calories: '0.00',
        energy: '0.00',
        fat: '0.00',
        salt: '0.00',
        saturates: '0.00',
        sugars: '0.00',
      },
      july: {
        calories: '0.00',
        energy: '0.00',
        fat: '0.00',
        salt: '0.00',
        saturates: '0.00',
        sugars: '0.00',
      },
      august: {
        calories: '210.74',
        energy: '881.88',
        fat: '14.23',
        salt: '0.20',
        saturates: '2.88',
        sugars: '1.52',
      },
      september: {
        calories: '0.00',
        energy: '0.00',
        fat: '0.00',
        salt: '0.00',
        saturates: '0.00',
        sugars: '0.00',
      },
      october: {
        calories: '0.00',
        energy: '0.00',
        fat: '0.00',
        salt: '0.00',
        saturates: '0.00',
        sugars: '0.00',
      },
      november: {
        calories: '0.00',
        energy: '0.00',
        fat: '0.00',
        salt: '0.00',
        saturates: '0.00',
        sugars: '0.00',
      },
      december: {
        calories: '0.00',
        energy: '0.00',
        fat: '0.00',
        salt: '0.00',
        saturates: '0.00',
        sugars: '0.00',
      },
    };
    const calorieData = component.createData(data, 'calories');
    const fatData = component.createData(data, 'fat');
    const saturatesData = component.createData(data, 'saturates');

    expect(calorieData[7].count).toEqual('210.74');
    expect(fatData[7].count).toEqual('14.23');
    expect(saturatesData[7].count).toEqual('2.88');
  });

  it('should set label type', () => {
    expect(component.setLabelType('Calories')).toEqual('kcal');
    expect(component.setLabelType('Fat')).toEqual('g');
  });
});
