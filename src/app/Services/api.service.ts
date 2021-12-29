import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  url = 'https://e-commerceapp-5fc20-default-rtdb.firebaseio.com/products.json';

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }
}
