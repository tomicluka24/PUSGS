import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { take } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Order } from 'src/app/_models/order';
import { Product } from 'src/app/_models/product';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { OrdersService } from 'src/app/_services/orders.service';
import { ProductService } from 'src/app/_services/product.service';
import { MembersService } from 'src/app/_services/members.service';
import { Member } from 'src/app/_models/member';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import { CountdownEvent } from 'ngx-countdown';

@Component({
  selector: 'app-social-user-new-order',
  templateUrl: './social-user-new-order.component.html',
  styleUrls: ['./social-user-new-order.component.css']
})
export class SocialUserNewOrderComponent implements OnInit {
  socialUser: SocialUser;
  placeOrderForm: FormGroup;
  validationErrors: string[] = [];
  products$ : Observable<Product[]>;
  product: Product;
  order: Order;
  price: number;
  orders: Order[];
  subscription: Subscription;
  currentOrder: Order;
  delivery: number = 250;
  deliveryTime: number;
  loadPageTime: number;
  deliveryStartedTime: number;
  currentTime: number;


  constructor(
    private authService: SocialAuthService,
    private productService: ProductService,
    private orderService: OrdersService, 
    private toastr: ToastrService,) {
    this.authService.authState.pipe(take(1)).subscribe(socialUser => this.socialUser = socialUser);
   }

  ngOnInit(): void {
    this.setCurrentUser();
    this.products$ = this.productService.getProductsAsSocialUser();
    this.initializeForm();
    this.loadOrder();
  }

  setCurrentUser() {
    this.socialUser = JSON.parse(localStorage.getItem('socialUser'));
  }

  initializeForm() {
    this.placeOrderForm = new FormGroup(
    {
      productName: new FormControl("", Validators.required),
      quantity: new FormControl("", Validators.required),
      deliveryAddress: new FormControl("", Validators.required),
      comment: new FormControl(""),
    });
  }

  selected(change: MatSelectChange) {
    this.productService.getProduct(change.value).subscribe(product => {
      this.product = product;
    })
    this.price = this.product.price;
  }

  placeOrder() {
    this.order = this.placeOrderForm.value;
    this.order.productId = this.product.id;
    this.order.consumerId = this.socialUser.id;
    this.order.price = this.product.price * this.placeOrderForm.value.quantity + this.delivery;
    this.order.accepted = "False";
    this.order.delivered = "False";
    this.order.delivererId = 1; // assign it to admin so it passes foreign key constraint => to be updated after accepting by deliverer
    this.order.id = this.getRandomInt(1000, 2000);

    this.orderService.placeOrderAsSocialUser(this.order)
      this.toastr.success('New order placed successfully');
  }  



  loadOrder() {
    this.order = JSON.parse(localStorage.getItem('socialUserOrder'));

      
      if(this.order.accepted == "True")
      {
        this.deliveryStartedTime = +localStorage.getItem(this.order.delivererId + 'delivery' + this.order.id + 'StartedTime');
        this.loadPageTime = Date.now()/1000;
        this.deliveryTime = +localStorage.getItem(this.order.delivererId + 'delivery' + this.order.id + 'Time');
        var firstTime =  localStorage.getItem(this.order.delivererId + 'delivery' + this.order.id + 'FirstTime');
 
        if(firstTime != "True") //if not first time loaded, take lastTimeLoaded and update lastTime loaded
        {
          var lastTimeLoaded = +localStorage.getItem(this.order.delivererId + 'delivery' + this.order.id + 'LastTime');
          this.deliveryTime = this.deliveryTime - (this.loadPageTime - lastTimeLoaded);
          localStorage.setItem(this.order.delivererId + 'delivery' + this.order.id + 'LastTime', (Date.now()/1000).toString())
        }
        else // page loaded first time so take startedTime and place lastTimeLoaded
        {
          this.deliveryTime = this.deliveryTime - (this.loadPageTime - this.deliveryStartedTime);
          localStorage.setItem(this.order.delivererId + 'delivery' + this.order.id + 'LastTime', (Date.now()/1000).toString());
          localStorage.setItem(this.order.delivererId + 'delivery' + this.order.id + 'FirstTime', 'False');
        }
 
        localStorage.setItem(this.order.delivererId + 'delivery' + this.order.id + 'Time', this.deliveryTime.toString()); 
        if(this.deliveryTime >= 0)
        {
          setTimeout(window.location.reload.bind(window.location),this.deliveryTime* 1000) ;
        }

        // order delivered
        if(this.deliveryTime <= 0)
        {
            localStorage.removeItem('socialUserOrder');
            this.toastr.success('Order received successfully');
        }
      }
    }
  

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
}
