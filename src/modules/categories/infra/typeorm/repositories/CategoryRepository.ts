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
    const categories = await this.ormRepository.find();

    return categories;
  }

  public async findByName(name: string): Promise<ICategory | null> {
    const categoryExists = await this.ormRepository.findOneBy({
      name,
    });

    return categoryExists;
  }
}

export default CategoryRepository;
