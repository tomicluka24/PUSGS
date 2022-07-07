import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/_models/order';
import { OrdersService } from 'src/app/_services/orders.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  orders: Order[];
  acceptedAndDeliveredOrders$: Observable<Order[]>;
  displayedColumns: string[] = ['id', 'consumerId', 'delivererId', 'productName', 'quantity', 'deliveryAddress', 'comment', 'price', 'accepted', 'delivered'];

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe(
      orders => this.orders = orders.filter(({accepted}) => accepted === 'True')
    );
  }

}
