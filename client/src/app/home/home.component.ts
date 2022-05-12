import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { FormsModule }   from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  model: any = {}
  registerMode = false;
  myForm: FormGroup;
  user: SocialUser;
  isSignedin: boolean = null;

  constructor(
    public accountService: AccountService,
    private formBuilder: FormBuilder, 
    private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.isSignedin = (user != null);
      console.log(this.user);
    });
  }
  
  login() {
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
    },  error => {
      console.log(error);
    })
  }

  logout() {
    this.accountService.logout();
  }

  facebookSignin(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.login();
  }

  logOut(): void {
    this.socialAuthService.signOut();
    this.logout();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }
}
