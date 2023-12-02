import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductStoreService } from '../../services/product-store.service';
import { Tag } from '../../../tag/interfaces/tag.model';
import { ProductApiService } from '../../services/product-api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit, OnDestroy {
  constructor(private productApi: ProductApiService, private productStore: ProductStoreService) {}

  public products = this.productStore.products$;

  filter(data: Tag[]) {
    this.products = this.productStore.filterProducts(data);
  }
  
  ngOnInit(): void {
    if(!this.productStore.isLoaded) {
      this.productApi.getProducts().subscribe();
    }
  }

  ngOnDestroy(): void {
    this.productApi.destroy$.next();
    this.productApi.destroy$.complete();
  }
}
