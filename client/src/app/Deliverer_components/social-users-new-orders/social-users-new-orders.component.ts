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
  selector: 'app-social-users-new-orders',
  templateUrl: './social-users-new-orders.component.html',
  styleUrls: ['./social-users-new-orders.component.css']
})
export class SocialUsersNewOrdersComponent implements OnInit {
  member: Member;
  user: User;
  photoUrl: string;
  orders: Order[] = [];
  order: Order;
  deliveryStartedTime: number;
  randomDeliveryTime: number;


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
  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;  
      this.order = JSON.parse(localStorage.getItem('socialUserOrder'));
      console.log(this.order);
      this.orders[0] = this.order;
    });
  }

  accept(id: number) {
    this.order.accepted = 'True';
    this.order.delivererId = this.member.id;

    this.ordersService.placeOrderAsSocialUser(this.order)
      this.toastr.success('Order accepted successfully');

      this.member.currentOrderId = this.order.id;
      this.memberService.acceptOrder(this.member).subscribe(() => {
      })
    
      this.randomDeliveryTime = this.getRandomInt(60, 80); // to set on 300, 1800 = 5min - 30min
      this.deliveryStartedTime = Date.now() / 1000; 
      localStorage.setItem(this.order.delivererId + 'delivery' + this.order.id + 'Time', this.randomDeliveryTime.toString());
      localStorage.setItem(this.order.delivererId + 'delivery' + this.order.id + 'StartedTime', this.deliveryStartedTime.toString());
      localStorage.setItem(this.order.delivererId + 'delivery' + this.order.id + 'FirstTime', 'True');

  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
}
