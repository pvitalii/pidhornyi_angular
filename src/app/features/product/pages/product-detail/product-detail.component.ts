import { Component, OnInit } from '@angular/core';
import { ProductStoreService } from '../../services/product-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  constructor(private productService: ProductStoreService, private activatedRoute: ActivatedRoute, private router: Router, private dialog: MatDialog) {}
  
  public product = this.productService.productDetail$;

  public id = this.activatedRoute.snapshot.paramMap.get('id') ?? 0;

  public openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.componentInstance.title = 'Are you sure?';
    dialogRef.componentInstance.content = `Do you want to delete this product?`;
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.deleteProduct();
      }
    })
  }

  public deleteProduct() {
    this.productService.deleteProduct(+this.id);
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.productService.getProductById(+this.id);
  }
}
