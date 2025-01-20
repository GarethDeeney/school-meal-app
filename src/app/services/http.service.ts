import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { Employee } from '../models/employee';
import { CourseProvider } from '../models/course-provider';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}
  staffApi = '/api/staff';
  courseApi = '/api/course';
  courseProviderApi = '/api/courseprovider';

  getCourseDetails = (id: string): Observable<Course> => {
    return this.http.get<Course>(`${this.courseApi}/${id}`);
  };

  getCourses = (params?: string): Observable<Course[]> => {
    return params
      ? this.http.get<Course[]>(`${this.courseApi}?${params}`)
      : this.http.get<Course[]>(`${this.courseApi}`);
  };

  postNewCourse = (course: Course) => {
    return this.http.post(`${this.courseApi}`, course);
  };

  deleteCourse = (courseId: string) => {
    return this.http.delete(`${this.courseApi}/${courseId}`);
  };

  getCourseProviders = () => {
    return this.http.get<CourseProvider>('/api/courseprovider');
  };

  addCourseProvider = (courseProvider: CourseProvider): Observable<any> => {
    return this.http.post(`${this.courseProviderApi}`, courseProvider);
  };

  updateCourseProvider = (courseProvider: CourseProvider) => {
    return this.http.put(
      `${this.courseProviderApi}/${courseProvider._id}`,
      courseProvider
    );
  };

  getStaffDetails = (id?: string | undefined | null): Observable<any> => {
    return id
      ? this.http.get(`${this.staffApi}/${id}`)
      : this.http.get(`${this.staffApi}`);
  };

  getStaffDetailsbyName = (username: string): Observable<any> => {
    return this.http.get(`${this.staffApi}?username=${username}`);
  };

  addStaff = (staff: Employee) => {
    return this.http.post(`${this.staffApi}`, staff);
  };

  updateStaffCourses = (staff: Employee) => {
    return this.http.put(`${this.staffApi}/${staff._id}`, staff);
  };
}
