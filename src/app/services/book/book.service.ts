import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import IBookRecordResponse from '../../interfaces/book/book-record-response.interface';
import IBookListResponse from '../../interfaces/book/book-list-response.interface';
import IBook from '../../interfaces/book/book.interface';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private httpClient: HttpClient) {}
  private apiUrl: string = `${environment.apiUrl}/collections/books/records`;

  public find(userId: string): Observable<IBookRecordResponse> {
    return this.httpClient.get<IBookRecordResponse>(`${this.apiUrl}/${userId}`);
  }

  public get(params?: { limit: number; page: number }): Observable<IBookListResponse> {
    return this.httpClient.get<IBookListResponse>(this.apiUrl, { params });
  }

  public create(book: IBook): Observable<IBookRecordResponse> {
    return this.httpClient.post<IBookRecordResponse>(this.apiUrl, { data: book });
  }

  public update(bookId: string, book: IBook): Observable<IBookRecordResponse> {
    return this.httpClient.put<IBookRecordResponse>(`${this.apiUrl}/${bookId}`, { data: book });
  }

  public delete(bookId: string): Observable<IBookRecordResponse> {
    return this.httpClient.delete<IBookRecordResponse>(`${this.apiUrl}/${bookId}`);
  }
}
