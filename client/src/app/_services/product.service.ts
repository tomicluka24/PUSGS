import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;

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
}
