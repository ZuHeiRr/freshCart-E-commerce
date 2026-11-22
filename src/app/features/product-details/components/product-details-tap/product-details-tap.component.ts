import { Component } from '@angular/core';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-product-details-tap',
  imports: [TranslatePipe, ],
  templateUrl: './product-details-tap.component.html',
  styleUrl: './product-details-tap.component.css',
})
export class ProductDetailsTapComponent {}
