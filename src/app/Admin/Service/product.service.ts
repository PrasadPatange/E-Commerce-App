import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  AngularFireDatabase,
  AngularFireList,
  SnapshotAction,
} from '@angular/fire/compat/database';
import * as _ from 'lodash';
import { LoginService } from 'src/app/Services/login.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/model/product';
import { ProdEnum } from 'src/app/enum/ProdEnum';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  imageURL: string = '';
  imgurl = '../../../../assets/Images/avatar.jpg';
  productList: AngularFireList<Product>;

  constructor(
    public db: AngularFireDatabase,
    public loginService: LoginService,
    public http: HttpClient
  ) {
    this.productList = db.list('products');
  }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    image: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  showPreview(event: any): void {
    const file = event.target.files[0];
    this.form.patchValue({
      image: file,
    });

    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  getProducts(): Observable<SnapshotAction<Product>[]> {
    this.productList = this.db.list('products');
    return this.productList.snapshotChanges();
  }

  addProduct(product: Product): void {
    this.productList.push({
      image: this.imageURL || this.imgurl,
      title: product.title,
      description: product.description,
      price: product.price,
    });
  }

  updateProduct(product: Product): void {
    this.productList.update(product.$key!, {
      image: this.imageURL,
      title: product.title,
      description: product.description,
      price: product.price,
    });
  }

  deleteProduct($key: string): void {
    this.productList.remove($key);
  }

  populateForm(product: Product): void {
    this.form.setValue(_.omit(product));
  }
}
