import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-social-user-dashboard',
  templateUrl: './social-user-dashboard.component.html',
  styleUrls: ['./social-user-dashboard.component.css']
})
export class SocialUserDashboardComponent implements OnInit {
socialUser: SocialUser;

  constructor(public authService: SocialAuthService) {
    this.authService.authState.pipe(take(1)).subscribe(socialUser => this.socialUser = socialUser);
   }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    this.socialUser = JSON.parse(localStorage.getItem('socialUser'));
    //console.log(this.user);
  }

}
