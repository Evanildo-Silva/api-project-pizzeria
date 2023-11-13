import { ICategory } from "@modules/categories/domain/models/ICategory";
import { ICreateCategory } from "@modules/categories/domain/models/ICreateCategory";
import { ICategoryRepository } from "@modules/categories/domain/repositories/ICategoryRepository";
import { dataSource } from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import Category from "../entities/category";

class CategoryRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Category);
  }

  public async create({ name }: ICreateCategory): Promise<Category> {
    const category = this.ormRepository.create({ name });

    await this.ormRepository.save(category);

    return category;
  }

  public async findAll(): Promise<ICategory[]> {
    const categories = this.ormRepository.find();

    return categories;
  }
}

export default CategoryRepository;
