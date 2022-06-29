import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;
  products: Product[] = [];

  constructor(private http: HttpClient) { }

  addProduct(model: any) {
    return this.http.post(this.baseUrl + 'admin/add-product', model).pipe(
      map((product: Product) => {
        if (product) {
          localStorage.setItem('product', JSON.stringify(product));
          console.log(product);
        }
        return product;
      })
    )
  }

  
  getProducts() {
    if (this.products.length > 0) return of(this.products);
    return this.http.get<Product[]>(this.baseUrl + 'consumer/menu').pipe(
      map(products => {
        this.products = products;
        return products;
      })
    )
  }

  
  getProduct(name: string) {
    const product = this.products.find(x => x.name === name);
    if (product !== undefined) return of(product);
    {
      return this.http.get<Product>(this.baseUrl + 'product/' + name);
    }
  }


}
