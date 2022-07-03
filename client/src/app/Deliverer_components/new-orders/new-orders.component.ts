import { Component, OnInit, SecurityContext} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { take } from 'rxjs/operators';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { OrdersService } from 'src/app/_services/orders.service';
import { Order } from 'src/app/_models/order';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.css']
})
export class NewOrdersComponent implements OnInit {
  member: Member;
  user: User;
  photoUrl: string;
  orders: Order[];
  order: Order;

  displayedColumns: string[] = ['id', 'consumerId', 'productName', 'quantity', 'deliveryAddress', 'comment', 'price', 'accept'];

  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private sanitizer: DomSanitizer,
    private ordersService: OrdersService,
    private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.sanitizer = sanitizer;
   }


   ngOnInit(): void {
    if (this.user != null)
      this.loadMember();

    this.ordersService.getNewOrders().subscribe(orders => {
      this.orders = orders
    });
      
  }


  accept(id: number) {
    this.ordersService.getOrder(id.toString()).subscribe(order => {
      this.order = order;
    });
    
    this.order.accepted = "True";
    this.order.delivererId = this.member.id;
    this.ordersService.acceptOrder(this.order).subscribe(() => {
      this.toastr.success('Order accepted successfully');
    })


    this.member.currentOrderId = this.order.id;
    this.memberService.acceptOrder(this.member).subscribe(() => {
      this.toastr.success('Your current order id successfully set to ' + this.order.id);
    })
   
    // window.location.reload();
  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;      
    });

  }

}
