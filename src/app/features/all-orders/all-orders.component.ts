import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { jwtDecode } from "jwt-decode";
import { CurrencyPipe, DatePipe, isPlatformBrowser, SlicePipe } from '@angular/common';
import { IOrder } from '../../core/models/iorder.interface';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-all-orders',
  imports: [TranslatePipe, DatePipe, CurrencyPipe, SlicePipe, RouterLink],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css',
})
export class AllOrdersComponent implements OnInit{
  private readonly ordersService=inject(OrdersService)
  private readonly platformId=inject(PLATFORM_ID)
 userId=signal("")
userOrdersList:WritableSignal<IOrder[]>=signal([])

  ngOnInit(): void {
    this.getUserId()

  }

  getUserId(){
     if (isPlatformBrowser(this.platformId)) {
  let token = localStorage.getItem('ecommToken');

  if (token) {
    let decoded = jwtDecode<{ id?: string }>(token);

    if (decoded.id) {
      this.userId.set(decoded.id);
    }
  }

}
    this.getUserOrders()
    
  }
getUserOrders(){
this.ordersService.getLoggedUserOrder(this.userId()).subscribe({
  next:(res)=>{
    this.userOrdersList.set(res)
    console.log(this.userOrdersList());
    
  },
  error:(err)=>{
    console.log(err);
    
  }
})
}

selectedOrder = signal<IOrder | null>(null);

openOrderDetails(order: IOrder) {
  this.selectedOrder.set(order);
}

closeOrderDetails() {
  this.selectedOrder.set(null);
}

getTotalItems(order: IOrder): number {
  return order.cartItems.reduce((total, item) => total + item.count, 0);
}
}
