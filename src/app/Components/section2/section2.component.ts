import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/Admin/Service/product.service';
@Component({
  selector: 'app-section2',
  templateUrl: './section2.component.html',
  styleUrls: ['./section2.component.css'],
})
export class Section2Component implements OnInit {
  productList: Product[] = [];
  constructor(
    public api: ApiService,
    public cartService: CartService,
    public toastr: ToastrService,
    public prodService: ProductService
  ) {}

  ngOnInit(): void {
    this.api.getProduct().subscribe((res: Product[]) => {
      const data = Object.keys(res).map((key: any) => {
        return res[key];
      });
      this.productList = data;
    });
  }

  addtocart(item: Product): void {
    this.cartService.addtoCart(item);
    this.toastr.success(`"${item.title}" added Successfully!!!`);
  }
}
