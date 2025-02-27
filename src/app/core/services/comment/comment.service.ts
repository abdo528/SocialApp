import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private _HttpClient: HttpClient) { }

  createComment(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/comments`, data)
  }
  getPostComment(id: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/posts/${id}/comments`)
  }
  updateComment(id: string, data: object): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/comments/${id}`, data)
  }
  deleteComment(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/comments/${id}`)
  }
}
