import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  childApi = 'api/child'

  // endpoints for child - maybe move to their own state services later down the line.
  getChildren$(){
    return this.http.get(`${this.childApi}`)
  }

  // getStaffDetails = (id?: string | undefined | null): Observable<any> => {
  //   return id
  //     ? this.http.get(`${this.staffApi}/${id}`)
  //     : this.http.get(`${this.staffApi}`);
  // };
  getChildDetails$(){};
  ;
}
