import { Component, OnInit } from '@angular/core';

import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ProductService } from '../../../Service/product.service';
import { ProductDialogComponent } from '../../productDialog/product-dialog/product-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(
    public service: ProductService,
    public dialogRef: MatDialogRef<ProductComponent>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.service.getProducts();
  }

  onClear(): void {
    this.service.form.reset();
    this.service.imageURL = '';
    this.service.imgurl = '';
  }

  onSubmit(): void {
    if (this.service.form.valid) {
      if (!this.service.form.get('$key')!.value)
        this.service.addProduct(this.service.form.value);
      else this.service.updateProduct(this.service.form.value);
      this.service.form.reset();
      this.onClose();
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '400px';
      dialogConfig.height = '300px';
      this.dialog.open(ProductDialogComponent, dialogConfig);
    }
  }

  onClose(): void {
    this.service.form.reset();
    this.dialogRef.close();
  }
}
