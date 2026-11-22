import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient);

 getAllProducts(pageNumber: number = 1, brandId?: string | null,categoryId?: string | null,keyword?: string | null): Observable<any> {

  let params = new HttpParams().set('page', pageNumber);

  if (brandId && brandId !== 'null') {
    params = params.set('brand', brandId);
  }
  if (categoryId && categoryId !== 'null') {
    params = params.set('category[in]', categoryId);
  }
   if (keyword) {
    params = params.set('keyword', keyword);
  }

  return this.httpClient.get(
    `${environment.baseUrl}/api/v1/products`,
    { params }
  );
}
  getSingleProduct(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products/${id}`);
  }
}
