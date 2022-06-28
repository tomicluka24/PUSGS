import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  products$: Observable<Product[]>;
  displayedColumns: string[] = ['id', 'name', 'ingredients', 'price'];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

}
