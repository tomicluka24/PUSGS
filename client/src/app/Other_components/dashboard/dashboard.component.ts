import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Router } from '@angular/router';
import { Order } from 'src/app/_models/order';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
user: User;
member: Member;
socialUserOrder: Order;

  constructor(public accountService: AccountService, public membersService: MembersService, private route: Router,) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    this.loadMember();


  }
  
  loadMember() {
    this.membersService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    
      if(this.member.userType == "Deliverer")
        this.socialUserOrder = JSON.parse(localStorage.getItem('socialUserOrder'));

    })
  }
  
  logout() {
    this.accountService.logout();
    this.route.navigateByUrl('');
  }
}
