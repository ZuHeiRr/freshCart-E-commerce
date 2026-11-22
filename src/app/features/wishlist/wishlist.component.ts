import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-wishlist',
  imports: [TranslatePipe, ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {

  readonly wishlistService = inject(WishlistService);

  ngOnInit(): void {
    this.getLoggedUserWishlist();
  }

  getLoggedUserWishlist() {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeFromWishlist(id: string) {
    this.wishlistService.removeFromWishlist(id).subscribe({
      next: (res) => {
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}