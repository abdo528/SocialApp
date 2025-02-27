import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environement';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _HttpClient: HttpClient) { }

  signUp(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/users/signup`, data)
  }
  signIn(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/users/signin`, data)
  }
  changePassword(data: object): Observable<any> {
    return this._HttpClient.patch(`${environment.baseUrl}/users/change-password`, data)
  }
  uploadProfilPhoto(data: object): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/users/upload-photo`, data)
  }
  getLoggedUserData(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/users/profile-data`)
  }
}
