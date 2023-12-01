import { Injectable } from "@angular/core";
import { ProductApiService } from "./product-api.service";
import { BehaviorSubject, Subject, catchError, map } from "rxjs";
import { Product } from "../interfaces/product.model";
import { Tag } from "../../tag/interfaces/tag.model";
import { TagApiService } from "app/features/tag/services/tag-api.service";

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {
  constructor(private productApiService: ProductApiService, private tagService: TagApiService) {}

  private readonly _products$ = new BehaviorSubject<Product[]>([]);
  private readonly _productDetail$ = new BehaviorSubject<Product>({} as Product);

  public readonly products$ = this._products$.asObservable(); 
  public readonly productDetail$ = this._productDetail$.asObservable();
  
  private isLoaded = false;
  
  get products() {
    return this._products$.getValue();
  }

  get productDetail() {
    return this._productDetail$.getValue();
  }

  public loadProducts() {
    if(!this.isLoaded) {
      return this.productApiService.getProducts().subscribe((products) => {
        this._products$.next(products);
        this.isLoaded = true;
      })
    }
    return;
  }

  public getProductById(id: number) {
    return this.tagService.getTags().subscribe((tags) => {
      this.productApiService.getProductById(id).pipe(map((product) => {
        return { ...product, tags: product.tags.map((tag) => tags.find((newTag) => newTag.id === tag?.id)).filter((tag) => tag !== undefined)}
      })).subscribe((newProduct) => {
        this._productDetail$.next(newProduct);
      })
    });
  }

  public addProduct(product: Omit<Product, "id">) {
    return this.productApiService.addProduct(product).subscribe((product) => {
      this._products$.next([...this.products, product]);      
    });
  }

  public updateProduct(id: number, data: Omit<Product, 'id'>) {
    return this.productApiService.updateProduct(id, data).subscribe((product) => {
      const productIndex = this.products.findIndex((oldData) => oldData.id === product.id);
      this.products[productIndex] = product;
      this._products$.next(this.products);
    });
  }

  public deleteProduct(id: number) {
    return this.productApiService.deleteProduct(id).subscribe(() => {
      this._products$.next([...this.products.filter((oldData) => oldData.id !== id)]);
    });
  }

  public filterProducts(tags: Tag[]) {
    if(tags.length > 0) {
      return this.products$.pipe(map((products) => products.filter((product) => tags.every(tag => product.tags.map((tag) => tag?.id).includes(tag.id)))));
    }
    return this.products$;
  }
}