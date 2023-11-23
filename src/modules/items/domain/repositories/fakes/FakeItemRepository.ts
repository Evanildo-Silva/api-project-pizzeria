import { Item } from "@modules/items/infra/typeorm/entities/Item";
import { v4 as uuidv4 } from "uuid";
import { ICreateItem } from "../../models/ICreateItem";
import { IItem } from "../../models/IItem";
import { IItemRepository } from "../IItemRepository";

class FakeItemRepository implements IItemRepository {
  private items: Item[] = [];
  public async create({ order, product, amount }: ICreateItem): Promise<Item> {
    const item = new Item();

    item.id = uuidv4();
    item.amount = amount;
    item.order = order;
    item.product = product;

    this.items.push(item);

    return item;
  }
  public async findById(id: string): Promise<IItem | null> {
    const item = this.items.find(item => item.id === id);

    if (item) {
      return item;
    }

    return null;
  }
  public async remove(item: IItem): Promise<void> {
    this.items.filter(data => data !== item);
  }
}

export default FakeItemRepository;
