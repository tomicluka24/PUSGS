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
    return this.http.get<Order[]>(this.baseUrl + 'admin/all-orders').pipe(
      map(orders => {
        this.orders = orders;
        return orders;
      })
    )
  }

  getPreviousOrders() {
    if (this.orders.length > 0) return of(this.orders);
    return this.http.get<Order[]>(this.baseUrl + 'consumer/previous-orders').pipe(
      map(orders => {
        // this.orders = orders;
        this.orders = orders.filter(({delivered}) => delivered === 'True');
        
        return this.orders;
      })
    )
  }

  getMyOrders() {
    if (this.orders.length > 0) return of(this.orders);
    return this.http.get<Order[]>(this.baseUrl + 'deliverer/my-orders').pipe(
      map(orders => {
        this.orders = orders.filter(({delivered}) => delivered === 'True');
        
        return this.orders;
      })
    )
  }


  getNewOrders() {
    if (this.orders.length > 0) return of(this.orders);
    return this.http.get<Order[]>(this.baseUrl + 'deliverer/new-orders').pipe(
      map(orders => {
        this.orders = orders;
        return orders;
      })
    )
  }

  getOrder(id: string) {
    const order = this.orders.find(x => x.id.toString() === id);
    if (order !== undefined) return of(order);
    {
      return this.http.get<Order>(this.baseUrl + 'consumer/current-order/' + id);
    }
  }

  getOrderAsDeliverer(id: string) {
    const order = this.orders.find(x => x.id.toString() === id);
    if (order !== undefined) return of(order);
    {
      return this.http.get<Order>(this.baseUrl + 'deliverer/current-order/' + id);
    }
  }


  acceptOrder(order: Order) {
    return this.http.put(this.baseUrl + 'deliverer/AcceptOrder', order).pipe(
      map(() => {
        const index = this.orders.indexOf(order);
        this.orders[index] = order;
      })
    )
  }

  deliverOrder(order: Order) {
    return this.http.put(this.baseUrl + 'deliverer/DeliverOrder', order).pipe(
      map(() => {
        const index = this.orders.indexOf(order);
        this.orders[index] = order;
      })
    )
  }

  recieveOrder(order: Order) {
    return this.http.put(this.baseUrl + 'consumer/RecieveOrder', order).pipe(
      map(() => {
        const index = this.orders.indexOf(order);
        this.orders[index] = order;
      })
    )
  }

}
