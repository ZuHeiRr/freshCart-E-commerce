import { CartService } from './../../core/services/cart/cart.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../core/models/iproduct.interface';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-product-details',
  imports: [TranslatePipe, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
    private readonly cartService =inject(CartService)


  singleProduct = signal<IProduct | null>({} as IProduct);

  mainImage = signal('');
  previousImage = signal<string | null>(null);

  slideDirection = signal<'next' | 'prev'>('next');

  productId = signal('');

  private slideTimer: ReturnType<typeof setTimeout> | undefined;

  ngOnInit(): void {
    this.readDataFromUrl();
  }

  readDataFromUrl() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.productId.set(params.get('id') || '');
      this.getSingleProduct();
    });
  }

  getSingleProduct() {
    this.productsService.getSingleProduct(this.productId()).subscribe({
      next: (response) => {
        console.log(response);
        
        this.singleProduct.set(response.data);
        this.mainImage.set(response.data.imageCover);
        this.previousImage.set(null);
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      },
    });
  }

  changeMainImg(url: string) {
    const currentImage = this.mainImage() || this.singleProduct()?.imageCover || '';

    if (url === currentImage) return;

    const images = this.singleProduct()?.images ?? [];

    const currentIndex = images.indexOf(currentImage);
    const nextIndex = images.indexOf(url);

    this.slideDirection.set(nextIndex > currentIndex ? 'next' : 'prev');

    this.previousImage.set(currentImage);
    this.mainImage.set(url);

    clearTimeout(this.slideTimer);

    this.slideTimer = setTimeout(() => {
      this.previousImage.set(null);
    }, 400);
  }
  
 
  private readonly CartService =inject(CartService)
  private readonly toastr =inject(ToastrService)

  addToCart(id:string){
    
    this.cartService.addToCart({"productId":id}).subscribe({
      next:(res)=>{
        console.log(res);
          this.toastr.success(res.message, 'Fresh Cart - Cart');
          this.cartService.cartCounter.set(res.numOfCartItems)
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
