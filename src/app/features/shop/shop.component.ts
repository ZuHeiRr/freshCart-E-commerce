import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../core/models/iproduct.interface';
import { ProductCartComponent } from '../home/components/product-cart/product-cart/product-cart.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-shop',
  imports: [TranslatePipe, ProductCartComponent, RouterLink,NgxPaginationModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  pageSize=signal(0)
  currentPage=signal(0)
  totalItems=signal(0)

  allProducts: WritableSignal<IProduct[]> = signal([]);
  loadingSpinner: WritableSignal<boolean> = signal(true);
    private readonly route = inject(ActivatedRoute);

   brandId: string | null = null;
   categoryId: string | null = null;
   keyword: string | null = null;

  ngOnInit(): void {
 this.route.queryParamMap.subscribe(params => {

      this.brandId = params.get('brand');
      this.categoryId = params.get('category');
      this.keyword = params.get('keyword');

     
      this.getAllProducts(1);

    });  }

  getAllProducts(pageNumber:number=1) {
    this.productsService.getAllProducts(pageNumber,this.brandId,this.categoryId, this.keyword).subscribe({
      next: (response) => {
        console.log(response);
        this.allProducts.set(response.data);
        this.pageSize.set(response.metadata.limit)
        this.currentPage.set(response.metadata.currentPage)
        this.totalItems.set(response.results)
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.loadingSpinner.set(false);
      },
    });
  }
  pageChanged(e:any){
    this.getAllProducts(e)
    console.log(e);
    
    
  }
}
