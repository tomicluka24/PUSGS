import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-social-user-profile',
  templateUrl: './social-user-profile.component.html',
  styleUrls: ['./social-user-profile.component.css']
})
export class SocialUserProfileComponent implements OnInit {
  socialUser: SocialUser;

  constructor(private authService: SocialAuthService) {
    this.authService.authState.pipe(take(1)).subscribe(socialUser => this.socialUser = socialUser);
   }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    this.socialUser = JSON.parse(localStorage.getItem('socialUser'));
  }
}
