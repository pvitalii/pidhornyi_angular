import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { Product } from "../interfaces/product.model";
import { Tag } from "app/features/tag/interfaces/tag.model";

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {
  constructor() {}

  private readonly _products$ = new BehaviorSubject<Product[]>([]);
  private readonly _productDetail$ = new BehaviorSubject<Product>({} as Product);

  public readonly products$ = this._products$.asObservable();
  public readonly productDetail$ = this._productDetail$.asObservable();

  private _isLoaded = false;

  public get isLoaded() {
    return this._isLoaded;
  }
  
  public get products() {
    return this._products$.getValue();
  }

  public set products(products: Product[]) {
    this._isLoaded = true;
    this._products$.next(products);
  }

  public set productDetail(product: Product) {
    this._productDetail$.next(product);
  }

  public addProduct(product: Product) {
    this._products$.next([...this.products, product]);
  }

  public updateProduct(product: Product) {
    const productIndex = this.products.findIndex((oldData) => oldData.id === product.id);
    this.products[productIndex] = product;
    this._products$.next(this.products);
  }

  public deleteProduct(id: number) {
    this._products$.next([...this.products.filter((oldData) => oldData.id !== id)]);
  }

  public filterProducts(tags: Tag[]) {
    if(tags.length > 0) {
      return this.products$.pipe(map((products) => products.filter((product) => tags.every(tag => product.tags.map((tag) => tag?.id).includes(tag.id)))));
    }
    return this.products$;
  }
}