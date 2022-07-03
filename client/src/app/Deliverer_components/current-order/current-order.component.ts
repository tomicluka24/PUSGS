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

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.css']
})
export class CurrentOrderComponent implements OnInit {
  member: Member;
  user: User;
  order: Order;  

  constructor(private accountService: AccountService, private memberService: MembersService, private orderService: OrdersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }


   ngOnInit(): void {
    if (this.user != null)
    {
      this.loadMember();
      
    }
  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
      this.loadOrder();
    });
  }

  loadOrder() {
    //console.log(this.member.currentOrderId.toString());
    this.orderService.getOrderAsDeliverer(this.member.currentOrderId.toString()).subscribe(order => {this.order = order;});
  }


}
