import { Component, OnInit } from '@angular/core';
import { ProductStoreService } from '../../services/product-store.service';
import { Tag } from '../../../tag/interfaces/tag.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductStoreService) {}

  public products = this.productService.products$;

  filter(data: Tag[]) {
    this.products = this.productService.filterProducts(data);
  }
  ngOnInit(): void {
    this.productService.loadProducts();
  }
}
