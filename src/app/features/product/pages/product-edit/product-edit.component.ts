import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductStoreService } from '../../services/product-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/shared/components/dialog/dialog.component';
import { ProductPayload } from '../../interfaces/product-payload';
import { ProductApiService } from '../../services/product-api.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent implements OnInit, OnDestroy {
  constructor(
    private productApi: ProductApiService, 
    private productStore: ProductStoreService, 
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    private dialog: MatDialog
  ) { }

  public product = this.productStore.productDetail$;
  
  public id = this.activatedRoute.snapshot.paramMap.get('id') ?? 0;

  public updateProduct(data: ProductPayload) {
    this.productApi.updateProduct(+this.id, data).subscribe(() => {
      this.router.navigate(['/']);
    });
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
    this.productApi.getProductById(+this.id).subscribe((product) => {
      this.productStore.productDetail = product;
    });
  }

  ngOnDestroy(): void {
    this.productApi.destroy$.next();
  }
}
