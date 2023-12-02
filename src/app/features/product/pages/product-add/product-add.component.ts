import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/shared/components/dialog/dialog.component';
import { ProductPayload } from '../../interfaces/product-payload';
import { ProductApiService } from '../../services/product-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss'
})
export class ProductAddComponent implements OnDestroy {

  constructor(private productApi: ProductApiService, private router: Router, public dialog: MatDialog) {}

  public addProduct(data: ProductPayload) {
    this.productApi.addProduct(data).subscribe(() => {
      this.router.navigate(['/']);
    });
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

  ngOnDestroy(): void {
    this.productApi.destroy$.next();
    this.productApi.destroy$.complete();
  }
}
