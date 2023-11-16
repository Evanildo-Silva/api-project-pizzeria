import { Product } from "@modules/products/infra/typeorm/entities/Product";

export interface ICategory {
  id: string;
  name: string;
  products: Product[];
  created_at: Date;
  updated_at: Date;
}
