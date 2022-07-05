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
import { CountdownEvent } from 'ngx-countdown';


@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.css']
})
export class CurrentOrderComponent implements OnInit {
  member: Member;
  user: User;
  order: Order;  
  deliveryTime: number;
  loadPageTime: number;
  deliveryStartedTime: number;
  currentTime: number;

  constructor(private accountService: AccountService, private memberService: MembersService, private orderService: OrdersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

   ngOnInit(): void {
    if (this.user != null)
      this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
      this.loadOrder();
    });
  }

  loadOrder() {
    this.orderService.getOrderAsDeliverer(this.member.currentOrderId.toString()).subscribe(order => {
      this.order = order;
       
       this.deliveryStartedTime = +localStorage.getItem(this.order.delivererId + 'delivery' + order.id + 'StartedTime');
       this.loadPageTime = Date.now()/1000;
       this.deliveryTime = +localStorage.getItem(this.order.delivererId + 'delivery'+this.order.id+'Time');
       var firstTime =  localStorage.getItem(this.order.delivererId + 'delivery' + this.order.id + 'FirstTime');

       if(firstTime != "True") //if not first time loaded, take lastTimeLoaded and update lastTime loaded
       {
         var lastTimeLoaded = +localStorage.getItem(this.order.delivererId + 'delivery' + this.order.id + 'LastTime');
         this.deliveryTime = this.deliveryTime - (this.loadPageTime - lastTimeLoaded);
         localStorage.setItem(this.order.delivererId + 'delivery' + this.order.id + 'LastTime', (Date.now()/1000).toString())
       }
       else // page loaded first time so take startedTime and place lastTimeLoaded
       {
         this.deliveryTime = this.deliveryTime - (this.loadPageTime - this.deliveryStartedTime);
         localStorage.setItem(this.order.delivererId + 'delivery' + this.order.id + 'LastTime', (Date.now()/1000).toString());
         localStorage.setItem(this.order.delivererId + 'delivery' + this.order.id + 'FirstTime', 'False');
       }

       localStorage.setItem(this.order.delivererId + 'delivery' + this.order.id + 'Time', this.deliveryTime.toString()); 
    });
  }

}
