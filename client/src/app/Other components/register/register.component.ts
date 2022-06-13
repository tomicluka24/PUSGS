import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  validationErrors: string[] = [];

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
      this.initializeForm();
  }
  
  initializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl("", [Validators.required, this.matchValues('password')]),
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      dateOfBirth: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      image: new FormControl(""),
      userType: new FormControl("Consumer"),
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return(control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true}
    }
  }


  register() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/dashboard');
      this.cancel();
    }, error => {
      this.validationErrors = error;      
    })
  }

  cancel() {
    console.log('cancelled');
  }

}
