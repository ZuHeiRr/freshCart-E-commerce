import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../core/models/icategory.interface';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../core/models/iproduct.interface';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CategoryCartComponent } from './components/category-cart/category-cart/category-cart.component';
import { ProductCartComponent } from './components/product-cart/product-cart/product-cart.component';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-home',
  imports: [TranslatePipe, NgClass, CategoryCartComponent, ProductCartComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly productsService = inject(ProductsService);
  private readonly router = inject(Router);

  categoriesList: WritableSignal<ICategory[]> = signal([]);
  productsList: WritableSignal<IProduct[]> = signal([]);
  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();
  }
  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (response) => {
        this.categoriesList.set(response.data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        this.productsList.set(response.data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
