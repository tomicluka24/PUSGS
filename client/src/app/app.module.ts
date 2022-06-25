import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './Other_components/nav/nav.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './Other_components/home/home.component';
import { RegisterComponent } from './Other_components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import {FacebookLoginProvider, SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import { DashboardComponent } from './Other_components/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { VerificationComponent } from './Admin_components/verification/verification.component';
import { AllOrdersComponent } from './Admin_components/all-orders/all-orders.component';
import { AddProductComponent } from './Admin_components/add-product/add-product.component';
import { UserProfileComponent } from './Other_components/user-profile/user-profile.component';
import { NewOrderComponent } from './Consumer_components/new-order/new-order.component';
import { PreviousOrdersComponent } from './Consumer_components/previous-orders/previous-orders.component';
import { NewOrdersComponent } from './Deliverer_components/new-orders/new-orders.component';
import { MyOrdersComponent } from './Deliverer_components/my-orders/my-orders.component';
import { CurrentOrderComponent } from './Deliverer_components/current-order/current-order.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component'
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import {FileUploadModule} from 'ng2-file-upload';
import { SocialUserDashboardComponent } from './Other_components/social-user-dashboard/social-user-dashboard.component';
import { HasRoleDirective } from './_directives/has-role.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    DashboardComponent,
    VerificationComponent,
    AllOrdersComponent,
    AddProductComponent,
    UserProfileComponent,
    NewOrderComponent,
    PreviousOrdersComponent,
    NewOrdersComponent,
    MyOrdersComponent,
    CurrentOrderComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberListComponent,
    MemberEditComponent,
    TextInputComponent,
    SocialUserDashboardComponent,
    HasRoleDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    SocialLoginModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    TabsModule.forRoot(),
    MatRippleModule,
    MatButtonModule,
    NgxSpinnerModule,
    FileUploadModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '498770238641524'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },   
    [
      {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
      {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
      {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
