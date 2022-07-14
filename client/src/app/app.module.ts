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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './Admin_components/member-list/member-list.component'
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CountdownModule } from 'ngx-countdown';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import {FileUploadModule} from 'ng2-file-upload';
import { SocialUserDashboardComponent } from './SocialUser_components/social-user-dashboard/social-user-dashboard.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MenuComponent } from './Consumer_components/menu/menu.component';
import { SocialUserProfileComponent } from './SocialUser_components/social-user-profile/social-user-profile.component';
import { SocialUserNewOrderComponent } from './SocialUser_components/social-user-new-order/social-user-new-order.component';
import { SocialUserMenuComponent } from './SocialUser_components/social-user-menu/social-user-menu.component';
import { SocialUsersNewOrdersComponent } from './Deliverer_components/social-users-new-orders/social-users-new-orders.component';

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
    MenuComponent,
    SocialUserProfileComponent,
    SocialUserNewOrderComponent,
    SocialUserMenuComponent,
    SocialUsersNewOrdersComponent,
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
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatTableModule,
    NgxSpinnerModule,
    FileUploadModule,
    CountdownModule,
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
            ),
          },
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
