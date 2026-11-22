
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IProduct } from '../../models/iproduct.interface';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {

  private readonly httpClient = inject(HttpClient);

  wishlistProducts = signal<IProduct[]>([]);

  // Add To Wishlist
  addToWishlist(id: string): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/wishlist`,
      { productId: id }
    ).pipe(
      tap(() => {
        this.getLoggedUserWishlist().subscribe();
      })
    );
  }

  // Remove From Wishlist
  removeFromWishlist(id: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}/api/v1/wishlist/${id}`
    ).pipe(
      tap(() => {
        this.wishlistProducts.update(products =>
          products.filter(product => product._id !== id)
        );
      })
    );
  }

  // Get Wishlist
  getLoggedUserWishlist(): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/v1/wishlist`
    ).pipe(
      tap((response: any) => {
        this.wishlistProducts.set(response.data);
      })
    );
  }

  // Check Product
  isInWishlist(productId: string): boolean {
    return this.wishlistProducts().some(
      product => product._id === productId
    );
  }

}
