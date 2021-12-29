import { Component, OnInit } from '@angular/core';

import { ProductComponent } from '../../product/product/product.component';
import { ProductService } from '../../../Service/product.service';
import { ProductDialogComponent } from '../../productDialog/product-dialog/product-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Product } from 'src/app/model/product';
import { ProdEnum } from 'src/app/enum/ProdEnum';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(public dialog: MatDialog, public service: ProductService) {}

  productArray: Product[] = [];
  imgUrl: string = '../../../../assets/Images/avatar.jpg';

  ngOnInit(): void {
    this.service.getProducts().subscribe((list: any) => {
      this.productArray = list.map((item: any) => {
        return {
          $key: item.key,
          ...item.payload.val(),
        };
      });
    });
  }

  onCreate(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    dialogConfig.height = '550px';
    this.dialog.open(ProductComponent, dialogConfig);
  }

  onEdit(data: Product): void {
    this.service.populateForm(data);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    dialogConfig.height = '550px';
    this.dialog.open(ProductComponent, dialogConfig);
  }

  onDelete(title: string, $key: string): void {
    if (confirm(`Are you sure to delete this Product with name : ${title} ?`)) {
      this.service.deleteProduct($key);
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.height = '300px';
    this.dialog.open(ProductDialogComponent, dialogConfig);
  }
}
