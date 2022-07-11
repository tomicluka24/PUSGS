import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  user: SocialUser;
  constructor(
    public accountService: AccountService, 
    private route: Router,
    public socialAuthService: SocialAuthService) { 

    }
    
    ngOnInit(): void {
      this.setCurrentUser();
    }
  
    setCurrentUser() {
      this.user = JSON.parse(localStorage.getItem('socialUser'));
    }

  logout() {
    this.accountService.logout();
    this.route.navigateByUrl('');
  }
  
  
  logOutSocial(): void{
    this.socialAuthService.signOut(true);
    localStorage.removeItem('socialUser');
    this.route.navigateByUrl('');
  }

}
