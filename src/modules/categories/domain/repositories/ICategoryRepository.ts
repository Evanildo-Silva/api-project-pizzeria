import { ICategory } from "../models/ICategory";
import { ICreateCategory } from "../models/ICreateCategory";

export interface ICategoryRepository {
  findAll(): Promise<ICategory[]>;
  findByName(name: string): Promise<ICategory | null>;
  create(data: ICreateCategory): Promise<ICategory>;
}
