import { Component } from '@angular/core';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-reviews-tap',
  imports: [TranslatePipe, ],
  templateUrl: './reviews-tap.component.html',
  styleUrl: './reviews-tap.component.css',
})
export class ReviewsTapComponent {}
