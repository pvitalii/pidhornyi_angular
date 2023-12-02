import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductStoreService } from '../../services/product-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/shared/components/dialog/dialog.component';
import { Subscription, map } from 'rxjs';
import { ProductApiService } from '../../services/product-api.service';
import { TagApiService } from 'app/features/tag/services/tag-api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  constructor(
    private tagApi: TagApiService,
    private productStore: ProductStoreService, 
    private productApi: ProductApiService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private dialog: MatDialog
  ) {}

  private dialogSubscription?: Subscription;

  public product = this.productStore.productDetail$;

  public id = this.activatedRoute.snapshot.paramMap.get('id') ?? 0;

  public openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.componentInstance.title = 'Are you sure?';
    dialogRef.componentInstance.content = `Do you want to delete this product?`;
    this.dialogSubscription = dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.deleteProduct();
      }
    });
  }

  public deleteProduct() {
    this.productApi.deleteProduct(+this.id).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  ngOnInit(): void {
    this.tagApi.getTags().subscribe((tags) => {
      this.productApi.getProductById(+this.id).pipe(map((product) => {
        return { ...product, tags: product.tags.map((tag) => tags.find((newTag) => newTag.id === tag?.id)).filter((tag) => tag !== undefined) }
      })).subscribe((product) => {
        this.productStore.productDetail = product;
      });
    })
  }

  ngOnDestroy(): void {
    this.dialogSubscription?.unsubscribe();
    this.tagApi.destroy$.next();
    this.tagApi.destroy$.complete();
    this.productApi.destroy$.next();
    this.productApi.destroy$.complete();
  }
}
