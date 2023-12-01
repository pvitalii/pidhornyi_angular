import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input({ required: true }) product: Product | undefined;

}
