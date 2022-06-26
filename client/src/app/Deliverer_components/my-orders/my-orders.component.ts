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

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  member: Member;
  user: User;
  photoUrl: string;

  constructor(private accountService: AccountService, private memberService: MembersService, private sanitizer: DomSanitizer) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.sanitizer = sanitizer;
   }

   ngOnInit(): void {
    if (this.user != null)
      this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => {this.member = member;});
  }
}
