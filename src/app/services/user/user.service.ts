import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import IUserRecordResponse from '../../interfaces/user/user-record-response.interface';
import IUserListResponse from '../../interfaces/user/user-list-response.interface';
import IUser from '../../interfaces/user/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  private apiUrl: string = `${environment.apiUrl}/collections/users/records`;

  public find(userId: string): Observable<IUserRecordResponse> {
    const headers = new HttpHeaders({ 'x-api-key': environment.apiKey });
    return this.httpClient.get<IUserRecordResponse>(`${this.apiUrl}/${userId}`, { headers });
  }

  public get(): Observable<IUserListResponse> {
    return this.httpClient.get<IUserListResponse>(this.apiUrl);
  }

  public create(user: IUser): Observable<IUserRecordResponse> {
    return this.httpClient.post<IUserRecordResponse>(`${this.apiUrl}`, user);
  }

  public update(userId: string, user: IUser): Observable<IUserRecordResponse> {
    return this.httpClient.patch<IUserRecordResponse>(`${this.apiUrl}/${userId}`, user);
  }

  public delete(userId: string): Observable<IUserRecordResponse> {
    return this.httpClient.delete<IUserRecordResponse>(`${this.apiUrl}/${userId}`);
  }


} 
