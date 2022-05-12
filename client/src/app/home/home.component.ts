import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { FormsModule }   from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  model: any = {}
  registerMode = false;
 // users: any;

  myForm: FormGroup;
  user: SocialUser;
  isSignedin: boolean = null;

  constructor(
    // private http: HttpClient,
    public accountService: AccountService,
    private formBuilder: FormBuilder, 
    private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    //this.getUsers();

    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.isSignedin = (user != null);
      console.log(user);
    },  error => {
      console.log(error);
    });
  }
  
  // getUsers() {
  //   this.http.get('https://localhost:7278/api/users').subscribe(users => this.users = users);
  // }


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
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }
}
