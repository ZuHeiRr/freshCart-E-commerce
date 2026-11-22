import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../core/models/icart.interface';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-cart',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService=inject(CartService)
  private readonly platformId=inject(PLATFORM_ID)
cartData : WritableSignal<Icart>=signal({} as Icart)

  ngOnInit(): void {
    this.getLoggedUserCart()
    
  }
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
  removeProduct(id:string){
     this.cartService.removeProduct(id).subscribe({
      next: (res) => {
       this.cartData.set(res.data)
                 this.cartService.cartCounter.set(res.numOfCartItems)

       
      },
      error: (err) => {
       console.log(err);
       
      },
    });
  }
  updateItemQuntity(id:string,data:number){
     this.cartService.updateItemQuntity(id,{count:data}).subscribe({
      next: (res) => {
      
       this.cartData.set(res.data)
                 this.cartService.cartCounter.set(res.numOfCartItems)

       
      },
      error: (err) => {
       console.log(err);
       
      },
    });
  }
  clearLoggedUserCart(){
     this.cartService.clearUserCart().subscribe({
      next: (res) => {
       this.cartData.set(res.data)
                 this.cartService.cartCounter.set(res.numOfCartItems)

       
      },
      error: (err) => {
       console.log(err);
       
      },
    });
  }

  }

