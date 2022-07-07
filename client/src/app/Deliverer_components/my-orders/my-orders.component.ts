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
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  member: Member;
  user: User;
  orders: Order[];
  displayedColumns: string[] = ['id', 'consumerId', 'delivererId', 'productName', 'quantity', 'deliveryAddress', 'comment', 'price', 'accepted', 'delivered'];

  constructor(private accountService: AccountService, private memberService: MembersService, private ordersService: OrdersService,) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

   ngOnInit(): void {
    if (this.user != null)
      this.loadMember();
      this.ordersService.getMyOrders().subscribe(
        orders => (this.orders = orders.filter(({delivererId}) => delivererId === this.member.id))  
     );
   }
 
   loadMember() {
     this.memberService.getMember(this.user.username).subscribe(member => {this.member = member;});
   }

}
