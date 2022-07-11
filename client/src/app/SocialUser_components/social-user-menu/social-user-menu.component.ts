import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-social-user-menu',
  templateUrl: './social-user-menu.component.html',
  styleUrls: ['./social-user-menu.component.css']
})
export class SocialUserMenuComponent implements OnInit {
  products$: Observable<Product[]>;
  displayedColumns: string[] = ['id', 'name', 'ingredients', 'price'];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getProductsAsSocialUser();
  }

}
