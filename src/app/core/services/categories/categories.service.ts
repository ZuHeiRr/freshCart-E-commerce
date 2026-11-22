import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ICategory } from '../../models/icategory.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly httpClient = inject(HttpClient);


getAllCategories(): Observable<any> {
  return this.httpClient.get(`${environment.baseUrl}/api/v1/categories`)
}
  getSingleCategory(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`);
  }
  getAllSubcategoriesOnCategory(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories/${id}/subcategories`);
  }
}
