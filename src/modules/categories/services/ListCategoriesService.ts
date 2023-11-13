import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../domain/repositories/ICategoryRepository";
import Category from "../infra/typeorm/entities/category";

@injectable()
class ListCategoriesService {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository,
  ) {}

  public async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll();

    return categories;
  }
}

export default ListCategoriesService;
