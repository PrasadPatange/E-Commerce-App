import { Component, OnInit } from '@angular/core';
import { ProdEnum } from 'src/app/enum/ProdEnum';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  totalItem: number = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res: Product[]) => {
      this.totalItem = res.length;
    });
  }
}
