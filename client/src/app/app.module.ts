import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './Other components/nav/nav.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './Other components/home/home.component';
import { RegisterComponent } from './Other components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import {FacebookLoginProvider, SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import { DashboardComponent } from './Other components/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { VerificationComponent } from './Admin components/verification/verification.component';
import { AllOrdersComponent } from './Admin components/all-orders/all-orders.component';
import { AddProductComponent } from './Admin components/add-product/add-product.component';
import { UserProfileComponent } from './Other components/user-profile/user-profile.component';
import { NewOrderComponent } from './Consumer components/new-order/new-order.component';
import { PreviousOrdersComponent } from './Consumer components/previous-orders/previous-orders.component';
import { NewOrdersComponent } from './Deliverer components/new-orders/new-orders.component';
import { MyOrdersComponent } from './Deliverer components/my-orders/my-orders.component';
import { CurrentOrderComponent } from './Deliverer components/current-order/current-order.component';


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
    CurrentOrderComponent
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
    })
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
    }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
