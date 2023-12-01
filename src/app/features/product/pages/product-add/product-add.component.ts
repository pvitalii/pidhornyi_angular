import { Component } from '@angular/core';
import { ProductStoreService } from '../../services/product-store.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/shared/components/dialog/dialog.component';
import { ProductPayload } from '../../interfaces/product-payload';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss'
})
export class ProductAddComponent {

  constructor(private productService: ProductStoreService, public dialog: MatDialog) {}

  public addProduct(data: ProductPayload) {
    this.productService.addProduct(data);
  }

  public openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.componentInstance.title = 'Are you sure?';
    dialogRef.componentInstance.content = `Do you want to add new product?`;
    dialogRef.componentInstance.formId = 'productForm';
  }

}
