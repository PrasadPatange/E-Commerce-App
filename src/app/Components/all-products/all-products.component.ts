import { Component, OnInit } from '@angular/core';
import { SnapshotAction } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/Admin/Service/product.service';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/Services/cart.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  constructor(
    public service: ProductService,
    public loginService: LoginService,
    public router: Router,
    public cartService: CartService,
    public toastr: ToastrService
  ) {}

  productArray: Product[] = [];

  userName: any;

  ngOnInit(): void {
    this.service.getProducts().subscribe((list: SnapshotAction<Product>[]) => {
      this.productArray = list.map((item: any) => {
        return {
          $key: item.key,
          ...item.payload.val(),
        };
      });
    });

    this.userName = sessionStorage.getItem('email');
  }

  logout(): void {
    this.loginService.logout();
    this.toastr.success('Logout Successfully!!!');
    this.router.navigate(['/login']);
  }
}
