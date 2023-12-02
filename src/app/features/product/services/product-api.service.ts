import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Product } from '../interfaces/product.model';
import { ProductPayload } from '../interfaces/product-payload';
import { ProductStoreService } from './product-store.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private apiService: ApiService<Product>, private productStore: ProductStoreService) { }

  public readonly destroy$ = new Subject<void>();

  public getProducts() {
    return this.apiService.get('products').pipe(tap((products) => this.productStore.products = products), takeUntil(this.destroy$));
  }

  public getProductById(id: number) {
    return this.apiService.get<Product>(`products/${id}`).pipe(takeUntil(this.destroy$));
  }

  public addProduct(data: ProductPayload) {
    return this.apiService.post('products', data).pipe(tap((product) => this.productStore.addProduct(product)), takeUntil(this.destroy$));
  }

  public updateProduct(id: number, data: ProductPayload) {
    return this.apiService.put(`products/${id}`, data).pipe(tap((product) => this.productStore.updateProduct(product)), takeUntil(this.destroy$));
  }

  public deleteProduct(id: number) {
    return this.apiService.delete(`products/${id}`).pipe(tap(() => this.productStore.deleteProduct(id)), takeUntil(this.destroy$));
  }
}
