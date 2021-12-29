import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css'],
})
export class ProductDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ProductDialogComponent>) {}

  ngOnInit(): void {}

  onClose(): void {
    this.dialogRef.close();
  }
}
