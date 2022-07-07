import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Order } from 'src/app/_models/order';
import { Product } from 'src/app/_models/product';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { OrdersService } from 'src/app/_services/orders.service';
import { ProductService } from 'src/app/_services/product.service';
import { take } from 'rxjs/operators';
import { MembersService } from 'src/app/_services/members.service';
import { Member } from 'src/app/_models/member';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import { CountdownEvent } from 'ngx-countdown';

export let browserRefresh = false;
@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css'],
})
export class NewOrderComponent implements OnInit {
  
  user: User;
  member: Member;
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



  constructor(private accountService: AccountService,
    private membersService: MembersService, 
    private productService: ProductService,
    private orderService: OrdersService, 
    private toastr: ToastrService,
    private router: Router) 
    {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
      }
  

  ngOnInit(): void {
    this.loadMember();
    this.products$ = this.productService.getProducts();
    this.initializeForm();
  }

    
  loadMember() {
    this.membersService.getMember(this.user.username).subscribe(member => {
      this.member = member;
      if (this.member.currentOrderId != 0)
      {
        this.loadOrder();
      }
    })

  }

  loadOrder() {
    this.orderService.getOrder(this.member.currentOrderId.toString()).subscribe(order => {
      this.order = order;

      if(this.order.accepted == "True")
      {
        this.deliveryStartedTime = +localStorage.getItem(this.order.delivererId + 'delivery' + order.id + 'StartedTime');
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
        // order delivered
        if(this.deliveryTime <= 0)
        {
          this.member.currentOrderId = 0;
 
          this.membersService.deliverOrder(this.member).subscribe(() => {
            this.toastr.success('Order recieved successfully');
         })
          
        }
      }
       
       
    }
    );
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
    this.order.consumerId = this.member.id;
    this.order.price = this.product.price * this.placeOrderForm.value.quantity + this.delivery;
    this.order.accepted = "False";
    this.order.delivered = "False";
    this.order.delivererId = 1; // assign it to admin so it passes foreign key constraint => to be updated after accepting by deliverer

    this.orderService.placeOrder(this.placeOrderForm.value).subscribe(response => {
      this.toastr.success('New order placed successfully');
    }, error => {
      this.validationErrors = error;      
    })

    this.orderService.getOrders().subscribe(data => {
    this.orders = data;
    this.member.currentOrderId = this.orders[this.orders.length-1].id;
      this.membersService.updateMember(this.member).subscribe(() => {
        this.toastr.info('Order will start when deliverer accepts it.');
      })
   })
  }  
}