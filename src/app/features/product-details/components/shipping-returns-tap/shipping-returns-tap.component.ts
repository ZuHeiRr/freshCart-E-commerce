import { Component } from '@angular/core';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-shipping-returns-tap',
  imports: [TranslatePipe, ],
  templateUrl: './shipping-returns-tap.component.html',
  styleUrl: './shipping-returns-tap.component.css',
})
export class ShippingReturnsTapComponent {}
