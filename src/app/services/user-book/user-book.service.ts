import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import IUserBookRecordResponse from '../../interfaces/user-book/user-book-record-response.interface';
import IUserBookListResponse from '../../interfaces/user-book/user-book-list-response.interface';
import IUserBook from '../../interfaces/user-book/user-book.interface';

@Injectable({
  providedIn: 'root',
})
export class UserBookService {
  constructor(private httpClient: HttpClient) {}
  private apiUrl: string = `${environment.apiUrl}/collections/user-books/records`;

  public find(userBookId: string): Observable<IUserBookRecordResponse> {
    return this.httpClient.get<IUserBookRecordResponse>(`${this.apiUrl}/${userBookId}`);
  }

  public get(params?: { limit: number; page: number }): Observable<IUserBookListResponse> {
    return this.httpClient.get<IUserBookListResponse>(this.apiUrl, { params });
  }

  public create(userBook: IUserBook): Observable<IUserBookRecordResponse> {
    return this.httpClient.post<IUserBookRecordResponse>(this.apiUrl, userBook);
  }

  public update(userBookId: string, userBook: IUserBook): Observable<IUserBookRecordResponse> {
    return this.httpClient.post<IUserBookRecordResponse>(`${this.apiUrl}/${userBookId}`, userBook);
  }

  public delete(userBookId: string): Observable<IUserBookRecordResponse> {
    return this.httpClient.delete<IUserBookRecordResponse>(`${this.apiUrl}/${userBookId}`);
  }
}
