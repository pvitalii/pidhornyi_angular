import { Component, OnInit } from '@angular/core';
import { ProductStoreService } from '../../services/product-store.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/shared/components/dialog/dialog.component';
import { ProductPayload } from '../../interfaces/product-payload';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent implements OnInit {

  constructor(private productService: ProductStoreService, private activatedRoute: ActivatedRoute, private dialog: MatDialog) { }

  public product? = this.productService.productDetail$;
  
  public id = this.activatedRoute.snapshot.paramMap.get('id') ?? 0;

  public updateProduct(data: ProductPayload) {
    return this.productService.updateProduct(+this.id, data);
  }

  public openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.componentInstance.title = 'Are you sure?';
    dialogRef.componentInstance.content = `Do you want to edit this product?`;
    dialogRef.componentInstance.formId = 'productForm';
  }

  ngOnInit(): void {
    this.productService.getProductById(+this.id);
  }
}
