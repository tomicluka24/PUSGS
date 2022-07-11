import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'The Delivery App';
  users: any;

  // , private socialAuthService: SocialAuthService
  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'))     
    this.accountService.setCurrentUser(user);
  }

  // setCurrentSocialUser() {
  //   const user: SocialUser = JSON.parse(localStorage.getItem('socialUser'))     
  //   this.socialAuthService.set(user);
  // }

}
