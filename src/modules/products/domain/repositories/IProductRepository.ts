import { ICreateProduct } from "../models/ICreateProduct";
import { IProduct } from "../models/IProduct";

export interface IProductRepository {
  create(data: ICreateProduct): Promise<IProduct>;
  findByCategory(category: string): Promise<IProduct[] | null>;
  findByName(name: string): Promise<IProduct | null>;
}
