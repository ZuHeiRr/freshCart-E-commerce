import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../core/models/icategory.interface';
import { CategoryCartComponent } from '../home/components/category-cart/category-cart/category-cart.component';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-categories',
  imports: [TranslatePipe, CategoryCartComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);

  allCategories: WritableSignal<ICategory[]> = signal([]);
  ngOnInit(): void {
    this.getAllCategories();
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
}
