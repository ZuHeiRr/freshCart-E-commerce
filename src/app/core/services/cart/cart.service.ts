import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient =inject(HttpClient)

  cartCounter=signal(0)

  addToCart(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v2/cart`,data)
  }
  getLoggedUserCart():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v2/cart`)
  }
  updateItemQuntity(id:string,data:any):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v2/cart/${id}`,data)
  }
  removeProduct(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v2/cart/${id}`)
  }
  clearUserCart():Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v2/cart`)
  }
  creatrCashOrder(id:string,data:any):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/${id}`,data)
  }
  creatrVisaOrder(id:string,data:any):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${environment.url}`,data)
  }


}
