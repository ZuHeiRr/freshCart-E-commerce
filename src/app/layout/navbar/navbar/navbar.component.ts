import { Component, computed, HostListener, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { AuthServiceService } from '../../../core/auth/services/authService/auth-service.service';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { ICategory } from '../../../core/models/icategory.interface';
import { LanguageService } from '../../../core/i18n/language.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-navbar',
  imports: [TranslatePipe, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly cartService=inject(CartService)
  readonly wishlistService = inject(WishlistService);
  private readonly authServiceService=inject(AuthServiceService)
  private readonly router=inject(Router)
  private readonly platformId=inject(PLATFORM_ID)
  readonly categoriesService = inject(CategoriesService);
  readonly languageService = inject(LanguageService);


  numOfCartItems=computed(()=>this.cartService.cartCounter())
  // properties
  numOfWishListItems=signal(0)
  allCategories: WritableSignal<ICategory[]> = signal([]);

  
  isSidebarOpen = signal<boolean>(false);
  isMenuOpen = signal(false);
  // isProfileMenuOpen = signal<boolean>(false);
  islogged=computed(()=>this.authServiceService.islogged())
  
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      if (localStorage.getItem("ecommToken")) {
        this.authServiceService.islogged.set(true)
        this.getLoggedUserCart()
      }
    }
this.getAllCategories()
   
  }
  getLoggedUserCart(){
     this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
       console.log(res);
         this.cartService.cartCounter.set(res.numOfCartItems)

       
      },
      error: (err) => {
       console.log(err);
       
      },
    });
  }
  logOut(){
    localStorage.removeItem("ecommToken")
    localStorage.removeItem("ecommUser")
    this.router.navigate(['/login'])
    this.authServiceService.islogged.set(false)
  }
   getAllCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.allCategories.set(response.data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

search(keyword: string) {
  console.log('Search:', keyword);
  this.router.navigate(['/shop'], {

    queryParams: {
      keyword: keyword.trim() || null
    }
  });
}
  
 

  



toggleMenu() {
  this.isMenuOpen.update(value => !value);
}

@HostListener('document:click', ['$event'])
closeMenu(event: MouseEvent) {
  const target = event.target as HTMLElement;

  if (!target.closest('.menu-container')) {
    this.isMenuOpen.set(false);
  }
}
}
