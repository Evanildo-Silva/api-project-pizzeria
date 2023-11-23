import { ICategory } from "@modules/categories/domain/models/ICategory";
import { IItem } from "@modules/items/domain/models/IItem";

export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  banner: string;
  items: IItem[];
  category: ICategory;
  created_at: Date;
  updated_at: Date;
}
