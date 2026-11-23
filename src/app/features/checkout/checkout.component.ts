import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../core/models/icart.interface';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-checkout',
  imports: [TranslatePipe, ɵInternalFormsSharedModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  cartData : WritableSignal<Icart>=signal({} as Icart)
  


  payMethod = signal('');

  ngOnInit(): void {
   
    this.getLoggedUserCart()
  }

  checkoutForm: FormGroup = this.fb.group({
    details: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  });

   getLoggedUserCart(){
     this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
       this.cartData.set(res.data)
       
      },
      error: (err) => {
       console.log(err);
       
      },
    });
  }

  submitOrder() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    if (this.payMethod() === 'cash') {
      this.submitCash();
    } else {
      this.submitVisa();
    }
  }
  submitCash() {
    let payLoad = {
      shippingAddress: this.checkoutForm.value,
    };
    this.cartService.creatrCashOrder(this.cartData()._id, payLoad).subscribe({
      next: (res) => {
        this.router.navigate(['/allorders'])
      },
      error: (err) => {
        console.log(err);
        console.log(this.cartData());
        
      },
    });
  }
  submitVisa() {
    let payLoad = {
      shippingAddress: this.checkoutForm.value,
    };
    this.cartService.creatrVisaOrder(this.cartData()._id, payLoad).subscribe({
      next: (res) => {
        console.log(res);
        
        window.open(res.session.url, '_blank');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
