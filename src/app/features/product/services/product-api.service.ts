import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Product } from '../interfaces/product.model';
import { ProductPayload } from '../interfaces/product-payload';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private apiService: ApiService<Product>) { }

  public getProducts() {
    return this.apiService.get('products');
  }

  public getProductById(id: number) {
    return this.apiService.get<Product>(`products/${id}`);
  }

  public addProduct(data: ProductPayload) {
    return this.apiService.post('products', data);
  }

  public updateProduct(id: number, data: ProductPayload) {
    return this.apiService.put(`products/${id}`, data);
  }

  public deleteProduct(id: number) {
    return this.apiService.delete(`products/${id}`);
  }
}
