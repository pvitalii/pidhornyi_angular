import { Tag } from "../../tag/interfaces/tag.model";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: (Tag | undefined)[];
}