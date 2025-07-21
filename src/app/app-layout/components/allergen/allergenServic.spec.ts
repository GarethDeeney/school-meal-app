import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AllergenService } from './allergenService';
import { of } from 'rxjs';

fdescribe('AllergenService', () => {
  let service: AllergenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllergenService, provideHttpClient(withInterceptorsFromDi())],
    });
    service = TestBed.inject(AllergenService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should set the datasource when fetching allergens', () => {
    spyOn(service, 'getAllergens$').and.returnValue(
      of([
        {
          _id: '1',
          name: 'allergen 1',
          specialRequirements: 'none',
          reaction: 'none',
        },
        {
          _id: '2',
          name: 'allergen 2',
          specialRequirements: 'none',
          reaction: 'none',
        },
        {
          _id: '3',
          name: 'allergen 3',
          specialRequirements: 'none',
          reaction: 'none',
        },
        {
          _id: '4',
          name: 'allergen 4',
          specialRequirements: 'none',
          reaction: 'none',
        },
      ])
    );
    service.setDataSource();

    service.datasource$.subscribe((ds) => {
      expect(ds.map((allergen) => allergen.name)).toEqual([
        'allergen 1',
        'allergen 2',
        'allergen 3',
        'allergen 4',
      ]);
    });
  });
});
