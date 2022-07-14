import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-social-user-dashboard',
  templateUrl: './social-user-dashboard.component.html',
  styleUrls: ['./social-user-dashboard.component.css']
})
export class SocialUserDashboardComponent implements OnInit {
socialUser: SocialUser;

  constructor(public authService: SocialAuthService, private router: Router) {
    this.authService.authState.pipe(take(1)).subscribe(socialUser => this.socialUser = socialUser);
   }

  ngOnInit(): void {
    this.setCurrentUser();
  
  }
  
  logOutSocial(): void{
    this.authService.signOut(true);
    localStorage.removeItem('socialUser');
    // this.isSignedin = false;
    this.router.navigateByUrl('');
  }


  async setCurrentUser() {
    this.socialUser = JSON.parse(localStorage.getItem('socialUser'));
    if(this.socialUser == null)
    {
      this.router.navigateByUrl('/social-user-dashboard');
    }
  }

}
