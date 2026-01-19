import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api-service';
import { Observable } from 'rxjs';
import { Paginate } from '../../models/paginate';

@Injectable({
  providedIn: 'root',
})
export abstract class CrudService<T> {
  protected apiService = inject(ApiService);

  constructor(protected endpoint: string) {}
  read(id: number): Observable<T> {
    return this.apiService.get(`${this.endpoint}/${id}`);
  }

  list(): Observable<Array<T>> {
    return this.apiService.get(`${this.endpoint}`);
  }

  listPaginate(paginate: Paginate): Observable<Array<T>> {
    return this.apiService.paginate(this.endpoint, paginate);
  }

  save(data: T): Observable<T> {
    return this.apiService.post(this.endpoint, data);
  }

  update(data: T): Observable<T> {
    return this.apiService.put(this.endpoint, data);
  }

  delete(id: number): Observable<T> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }
}
