import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);

  constructor(private http: HttpClient) { }
  
  currentUser$ = this.currentUserSource.asObservable();

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }
  

  socialLogin(model: any) {
    return this.http.post<SocialUser>(this.baseUrl + 'account/socialLogin', model).pipe(
      map((response: SocialUser) => {
        const socialUser = response;
        if (socialUser) {
          localStorage.setItem('socialUser', JSON.stringify(socialUser));
        }
      })
    )
  }

  register(model: any, ) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }


  setCurrentUser(user: User) {
    if(user != null)
    {
      user.role = this.getDecodedToken(user.token).role;
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSource.next(user);
    }
  }
  
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1])) // Payload
  }
}
