import { Product } from "./product.model";

export interface ProductPayload extends Omit<Product, 'id'> {}