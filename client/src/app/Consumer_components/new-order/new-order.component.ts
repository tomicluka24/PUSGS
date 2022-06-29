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

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  user: User;
  member: Member;
  placeOrderForm: FormGroup;
  validationErrors: string[] = [];
  products$ : Observable<Product[]>;
  product: Product;
  order: Order;

  constructor(private accountService: AccountService,
    private membersService: MembersService, 
    private productService: ProductService,
    private orderService: OrdersService, 
    private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    this.loadMember();
    this.products$ = this.productService.getProducts();
    this.initializeForm();
  }

    
  loadMember() {
    this.membersService.getMember(this.user.username).subscribe(member => {
      this.member = member})
  }


  initializeForm() {
    this.placeOrderForm = new FormGroup(
    {
      productName: new FormControl("", Validators.required),
      quantity: new FormControl(Validators.required),
      deliveryAddress: new FormControl("", Validators.required),
      comment: new FormControl(""),
    });
  }

  placeOrder() {
    this.productService.getProduct(this.placeOrderForm.value.productName).subscribe(product => {
      this.product = product;
    })
  
    this.order = this.placeOrderForm.value;
    this.order.productId = this.product.id;
    this.order.consumerId = this.member.id;
    this.order.price = this.product.price * this.placeOrderForm.value.quantity;
    this.order.accepted = "False";
    this.order.delivererId = 1; // assign it to admin so it passes foreign key constraint => to be updated after accepting by deliverer

    console.log(this.order);
    this.orderService.placeOrder(this.placeOrderForm.value).subscribe(response => {
      this.toastr.success('New order placed successfully. Wait until deliverer accepts it.');
    }, error => {
      this.validationErrors = error;      
    })
  
  }  
}