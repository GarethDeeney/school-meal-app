import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Course } from '../models/course';
import { Employee } from '../models/employee';
import { HttpService } from './http.service';
import { testCourses, testStaff } from './test-data';

describe('HttpService', () => {
  let service: HttpService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const mockStaff: Employee[] = testStaff;
  const mockCourses: Course[] = testCourses;
  const singleCourse = testCourses[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HttpService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getCourseDetails', () => {
    service.getCourseDetails(singleCourse._id!).subscribe((course) => {
      expect(course).toBeTruthy();
      expect(course.name).toEqual('General Course 1');
      expect(mockRequest.request.method).toEqual('GET');
    });
    const mockRequest = httpTestingController.expectOne(
      `/api/course/481f43d3-6893-4c9d-bdfb-5b3bb89d99fe`
    );
    mockRequest.flush(singleCourse);
  });

  it('should getCourses', () => {
    service.getCourses().subscribe((courses) => {
      expect(courses).toBeTruthy();
      expect(courses.length).toBe(2);
      expect(courses[0].name).toEqual('General Course 1');
      expect(mockRequest.request.method).toEqual('GET');
    });

    const mockRequest = httpTestingController.expectOne(`/api/course`);
    mockRequest.flush(mockCourses);
  });

  it('should getCourses with params', () => {
    service.getCourses(`role=General`).subscribe((courses) => {
      expect(courses).toBeTruthy();
      expect(courses.length).toBe(2);
      expect(courses[0].name).toEqual('General Course 1');
      expect(mockRequest.request.method).toEqual('GET');
    });

    const mockRequest = httpTestingController.expectOne(
      `/api/course?role=General`
    );
    mockRequest.flush(mockCourses);
  });

  it('should getStaffDetails with id', () => {
    service
      .getStaffDetails(`d0043f2b-a79e-4102-9699-113a1ae1e94b`)
      .subscribe((staff) => {
        expect(staff).toBeTruthy();
        expect(staff.name).toBe('April Batham');
        expect(mockRequest.request.method).toEqual('GET');
      });

    const mockRequest = httpTestingController.expectOne(
      `/api/staff/d0043f2b-a79e-4102-9699-113a1ae1e94b`
    );
    mockRequest.flush(mockStaff[0]);
  });

  it('should getStaffDetails', () => {
    service.getStaffDetails().subscribe((staff) => {
      expect(staff).toBeTruthy();
      expect(staff.length).toBe(2);
      expect(staff[0].name).toBe('April Batham');
      expect(mockRequest.request.method).toEqual('GET');
    });

    const mockRequest = httpTestingController.expectOne(`/api/staff`);
    mockRequest.flush(mockStaff);
  });

  it('should getStaffDetailsByName', () => {
    service.getStaffDetailsbyName('aprilbatham').subscribe((staff) => {
      expect(staff).toBeTruthy();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
      expect(staff.name).toBe('April Batham');
      expect(mockRequest.request.method).toEqual('GET');
    });

    const mockRequest = httpTestingController.expectOne(
      `/api/staff?username=aprilbatham`
    );
    mockRequest.flush(mockStaff[0]);
  });

  it('should updateStaffCourses', () => {
    service.updateStaffCourses(mockStaff[0]).subscribe((staff) => {
      expect(staff).toBeTruthy();
      expect(mockRequest.request.method).toEqual('PUT');
    });

    const mockRequest = httpTestingController.expectOne(
      `/api/staff/${mockStaff[0].id}`
    );
    mockRequest.flush(mockStaff[0]);
  });

  it('should postNewCourse', () => {
    service.postNewCourse(mockCourses[0]).subscribe((course) => {
      expect(course).toBeTruthy();
      expect(mockRequest.request.method).toEqual('POST');
    });

    const mockRequest = httpTestingController.expectOne(`/api/course`);
    mockRequest.flush(mockCourses[0]);
  });

  it('should deleteCourse', () => {
    service.deleteCourse(mockCourses[0]._id!).subscribe((course) => {
      expect(course).toBeTruthy();
      expect(mockRequest.request.method).toEqual('DELETE');
    });

    const mockRequest = httpTestingController.expectOne(
      `/api/course/${mockCourses[0]._id}`
    );
    mockRequest.flush(mockStaff[0]);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
