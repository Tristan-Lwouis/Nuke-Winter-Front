import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Paginate } from '../../models/paginate';

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient = inject(HttpClient);

  get(endpoint: string): Observable<any> {
    return this.httpClient.get(`${API_URL}/${endpoint}`).pipe(catchError(this.handleError));
  }

  getAll(endpoint: string): Observable<any> {
    return this.httpClient.get(`${API_URL}s/${endpoint}`).pipe(catchError(this.handleError));
  }

  paginate(endpoint: string, paginate: Paginate): Observable<any> {
    return this.httpClient
      .get(`${API_URL}/${endpoint}s?page=${paginate.page}&offset=${paginate.offset}`)
      .pipe(catchError(this.handleError));
  }

  post(endpoint: string, data: any): Observable<any> {
    return this.httpClient.post(`${API_URL}/${endpoint}`, data).pipe(catchError(this.handleError));
  }

  put(endpoint: string, data: any): Observable<any> {
    return this.httpClient.put(`${API_URL}/${endpoint}`, data).pipe(catchError(this.handleError));
  }

  patch(endpoint: string, data: any): Observable<any> {
    return this.httpClient.patch(`${API_URL}/${endpoint}`, data).pipe(catchError(this.handleError));
  }

  delete(endpoint: string): Observable<any> {
    return this.httpClient.delete(`${API_URL}/${endpoint}`).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    let message = '';

    if (error.error instanceof ErrorEvent) {
      message = error.error.message;
    } else {
      message = `Error : ${error.status} \nMessage : ${error.message}`;
    }

    return throwError(() => message);
  }
}
