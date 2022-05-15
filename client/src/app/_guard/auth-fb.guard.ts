import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SocialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthFbGuard implements CanActivate {
  constructor(
    private socialAuthService: SocialAuthService,
    private toastr: ToastrService,
    private accountService: AccountService,
    private router: Router)  {}


  canActivate()  {
    return this.socialAuthService.authState.pipe(
      map(user => {
        if (user) return true;
        this.toastr.error('You shall not pass!');
        this.router.navigateByUrl('');
      })
    )
  }
    
}
