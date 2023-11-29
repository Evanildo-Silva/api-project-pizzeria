import { ICreateItem } from "../models/ICreateItem";
import { IItem } from "../models/IItem";

export interface IItemRepository {
  create({ order, product, amount }: ICreateItem): Promise<IItem>;
  findById(id: string): Promise<IItem | null>;
  remove(item: IItem): Promise<void>;
}
