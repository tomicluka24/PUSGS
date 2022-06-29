import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../_models/order';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;
  orders: Order[] = [];

  constructor(private http: HttpClient) { }

  placeOrder(model: any) {
    return this.http.post(this.baseUrl + 'consumer/place-order', model).pipe(
      map((order: Order) => {
        if (order) {
          localStorage.setItem('order', JSON.stringify(order));
          console.log(order);
        }
        return order;
      })
    )
  }

  
  getOrders() {
    if (this.orders.length > 0) return of(this.orders);
    return this.http.get<Order[]>(this.baseUrl + 'admin/orders').pipe(
      map(orders => {
        this.orders = orders;
        return orders;
      })
    )
  }


}
