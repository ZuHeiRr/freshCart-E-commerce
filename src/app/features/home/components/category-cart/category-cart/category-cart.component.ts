import { Component, inject, input, InputSignal } from '@angular/core';
import { ICategory } from '../../../../../core/models/icategory.interface';
import { CategoriesService } from '../../../../../core/services/categories/categories.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-category-cart',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './category-cart.component.html',
  styleUrl: './category-cart.component.css',
})
export class CategoryCartComponent {
  private readonly categoriesService = inject(CategoriesService);

  cate: InputSignal<ICategory> = input({} as ICategory);
}
