import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateCategory } from "../domain/models/ICreateCategory";
import { ICategoryRepository } from "../domain/repositories/ICategoryRepository";

@injectable()
class CreateCategoryService {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository,
  ) {}

  public async execute({ name }: ICreateCategory) {
    const categoryExists = await this.categoryRepository.findByName(name);

    if (categoryExists) {
      throw new AppError("Category name already used.");
    }

    const category = await this.categoryRepository.create({
      name,
    });

    return category;
  }
}

export default CreateCategoryService;
