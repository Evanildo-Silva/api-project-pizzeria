import { ICategory } from "@modules/categories/domain/models/ICategory";

export interface IProduct {
  name: string;
  price: number;
  description: string;
  banner: string;
  category: ICategory;
  created_at: Date;
  updated_at: Date;
}
