import Category from "@modules/categories/infra/typeorm/entities/category";
import { v4 as uuidv4 } from "uuid";
import { ICategory } from "../../models/ICategory";
import { ICreateCategory } from "../../models/ICreateCategory";
import { ICategoryRepository } from "../ICategoryRepository";

class FakeCategoryRepository implements ICategoryRepository {
  private categories: Category[] = [];

  public async create({ name }: ICreateCategory): Promise<Category> {
    const category = new Category();

    category.id = uuidv4();
    category.name = name;

    this.categories.push(category);

    return category;
  }

  public async findAll(): Promise<ICategory[]> {
    return this.categories;
  }

  public async findByName(name: string): Promise<ICategory | null> {
    const category = this.categories.find(category => category.name === name);

    if (category) {
      return category;
    }

    return null;
  }
}

export default FakeCategoryRepository;
