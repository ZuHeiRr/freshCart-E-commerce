import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandServiceService } from '../../core/services/barndService/brand-service.service';
import { IBrand } from '../../core/models/ibrand.interface';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-brands',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly brandService = inject(BrandServiceService);
  allBrands: WritableSignal <IBrand[]> = signal([]);
  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands() {
    this.brandService.getAllBrands().subscribe({
      next: (response) => {
        this.allBrands.set(response.data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
