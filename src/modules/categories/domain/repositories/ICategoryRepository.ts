import { ICategory } from "../models/ICategory";
import { ICreateCategory } from "../models/ICreateCategory";

export interface ICategoryRepository {
  findAll(): Promise<ICategory[]>;
  create(data: ICreateCategory): Promise<ICategory>;
}
