import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ICategory } from '../../../../core/models/icategory.interface';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-single-category',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './single-category.component.html',
  styleUrl: './single-category.component.css',
})
export class SingleCategoryComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly activatedRoute = inject(ActivatedRoute);

  id = signal('');
  subcategoriesList: WritableSignal<ICategory[]> = signal([]);
  singleCategory: WritableSignal<ICategory | null> = signal(null);

  ngOnInit(): void {
    this.readDataFromUrl();
    this.getSingleCategory();
  }
  readDataFromUrl() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id.set(params.get('id') || '');
      this.getAllSubcategoriesOnCategory();
    });
  }
  getAllSubcategoriesOnCategory() {
    this.categoriesService.getAllSubcategoriesOnCategory(this.id()).subscribe({
      next: (response) => {
        console.log(response);
        this.subcategoriesList.set(response.data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  getSingleCategory() {
    this.categoriesService.getSingleCategory(this.id()).subscribe({
      next: (response) => {
        console.log(response);
        this.singleCategory.set(response.data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
