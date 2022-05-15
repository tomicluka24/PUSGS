import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}

  constructor(
    public accountService: AccountService, 
    private route: Router,
    public socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.accountService.logout();
    this.route.navigateByUrl('');
  }
  
  logOut(): void{
    //this.route.navigateByUrl('');
    this.socialAuthService.signOut();
  }

}
