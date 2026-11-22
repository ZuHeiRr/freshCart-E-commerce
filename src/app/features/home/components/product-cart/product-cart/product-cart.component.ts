
import { Component, inject, input, signal } from '@angular/core';
import { IProduct } from '../../../../../core/models/iproduct.interface';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../../../core/services/wishlist/wishlist.service';
import { TranslatePipe } from '../../../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-product-cart',
  imports: [TranslatePipe, NgClass, RouterLink],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.css',
})
export class ProductCartComponent {

  product = input<IProduct>({} as IProduct);

  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);

  readonly wishlistService = inject(WishlistService);

  wishlistLoading = signal(false);

  // Toggle Wishlist
 
toggleWishlist(productId: string): void {

  if (this.wishlistLoading()) return;

  this.wishlistLoading.set(true);

  const request = this.wishlistService.isInWishlist(productId)
    ? this.wishlistService.removeFromWishlist(productId)
    : this.wishlistService.addToWishlist(productId);

  request.subscribe({
    next: (res) => {
      this.toastr.info(res.message, 'Fresh Cart - Wishlist');
      this.wishlistLoading.set(false);
    },
    error: (err) => {
      console.log(err);
      this.toastr.error(
        err.error?.message || 'Something went wrong',
        'Fresh Cart - Wishlist'
      );
      this.wishlistLoading.set(false);
    }
  });
}


  // Add To Cart
  addToCart(id: string) {

    this.cartService.addToCart({ productId: id }).subscribe({
      next: (res) => {

        this.toastr.success(res.message, 'Fresh Cart - Cart');

        this.cartService.cartCounter.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

}
