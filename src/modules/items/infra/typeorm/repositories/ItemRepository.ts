import { ICreateItem } from "@modules/items/domain/models/ICreateItem";
import { IItemRepository } from "@modules/items/domain/repositories/IItemRepository";
import { dataSource } from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import { Item } from "../entities/Item";

class ItemRepository implements IItemRepository {
  private ormRepository: Repository<Item>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Item);
  }

  public async create({ ...rest }: ICreateItem): Promise<Item> {
    const item = this.ormRepository.create({ ...rest });

    await this.ormRepository.save(item);

    return item;
  }
}

export default ItemRepository;
