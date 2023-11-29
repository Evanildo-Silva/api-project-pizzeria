import Category from "@modules/categories/infra/typeorm/entities/Category";

export interface ICreateProduct {
  name: string;
  price: number;
  description: string;
  banner: string;
  category: Category;
}
