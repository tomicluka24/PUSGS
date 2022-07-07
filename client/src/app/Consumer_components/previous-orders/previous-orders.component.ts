import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/_models/order';
import { OrdersService } from 'src/app/_services/orders.service';
import { Observable } from 'rxjs';
import { MembersService } from 'src/app/_services/members.service';
import { User } from 'src/app/_models/user';
import { Member } from 'src/app/_models/member';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.css']
})
export class PreviousOrdersComponent implements OnInit {
  member: Member;
  user: User;
  orders: Order[];
  displayedColumns: string[] = ['id', 'consumerId', 'delivererId', 'productName', 'quantity', 'deliveryAddress', 'comment', 'price', 'accepted', 'delivered'];

  constructor(private accountService: AccountService, private ordersService: OrdersService, private membersService: MembersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    if (this.user != null)
      this.loadMember();

    this.ordersService.getPreviousOrders().subscribe(
       orders => (this.orders = orders.filter(({consumerId}) => consumerId === this.member.id))  
    );
  }

  loadMember() {
    this.membersService.getMember(this.user.username).subscribe(member => {this.member = member;});
  }
  
}