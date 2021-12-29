import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/product';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: Product[] = [];
  public productList = new BehaviorSubject<Product[]>([]);

  constructor() {}
  getProducts(): Observable<Product[]> {
    return this.productList.asObservable();
  }

  addtoCart(product: Product): void {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log('cartItemList', this.cartItemList);
  }
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: Product) => {
      grandTotal += +a.price;
    });
    return grandTotal;
  }
  removeCartItem(product: Product, index: number): void {
    this.cartItemList = this.cartItemList.filter(
      (el: Product, i: number) => i !== index
    );
    console.log('remove Array : ', this.cartItemList);
    this.productList.next(this.cartItemList);
  }
  removeAllCart(): void {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
