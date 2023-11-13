import { ICreateCategory } from "@modules/categories/domain/models/ICreateCategory";
import { dataSource } from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import Category from "../entities/category";

class CategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Category);
  }

  public async create({ name }: ICreateCategory): Promise<Category> {
    const category = this.ormRepository.create({ name });

    await this.ormRepository.save(category);

    return category;
  }
}
