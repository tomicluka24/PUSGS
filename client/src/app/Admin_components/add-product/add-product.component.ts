import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  validationErrors: string[] = [];
  product$: Observable<Product[]>;
  product: Product;

  constructor(private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.addProductForm = new FormGroup(
    {
      name: new FormControl("", Validators.required),
      price: new FormControl("", Validators.required),
      ingredients: new FormControl("", Validators.required),
    });
  }


  addProduct() {
    this.productService.addProduct(this.addProductForm.value).subscribe(response => {
      this.toastr.success('New product added successfully');
    }, error => {
      this.validationErrors = error;      
    })
  }

}