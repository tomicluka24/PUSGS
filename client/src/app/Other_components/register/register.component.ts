import { jsDocComment } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timingSafeEqual } from 'crypto';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AccountService } from '../../_services/account.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  validationErrors: string[] = [];
  uploader: FileUploader;
  baseUrl = environment.apiUrl;
  photoUrl: string;
 

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router,
    private sanitization: DomSanitizer) { }

  ngOnInit(): void {
      this.initializeForm();
  }
  
  initializeForm() {
    this.initializeUploader();
    this.registerForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl("", [Validators.required, this.matchValues('password')]),
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      dateOfBirth: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      photoUrl: new FormControl(""),
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
    }, error => {
      this.validationErrors = error;      
    })
  }

  cancel() {
    console.log('cancelled');
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + '/register',
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024
    });
   
  }
}
