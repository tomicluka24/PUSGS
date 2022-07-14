import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { FormsModule }   from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


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
  isSignedin: boolean = false;

  constructor(
    // private http: HttpClient,
    public accountService: AccountService,
    private router: Router,
    private formBuilder: FormBuilder, 
    private socialAuthService: SocialAuthService,
    private toastr: ToastrService) { }

    ngOnInit(): void {
    }
  

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/dashboard')
    })
  }
  
  loginWithFacebook() {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.isSignedin = (user != null);
      localStorage.setItem('socialUser', JSON.stringify(this.user));
    },  error => {
      console.log(error);
    });
    
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }



  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  isUserLoggedIn(): boolean {
    if (localStorage.getItem('user'))
    {
      return true;
    }
  }

  isSocialUserLoggedIn(): boolean {
    if (localStorage.getItem('socialUser'))
    {
      return true;
    }
  }

  public localStorageItem(id: string): string {
    return localStorage.getItem(id);
  }

}
