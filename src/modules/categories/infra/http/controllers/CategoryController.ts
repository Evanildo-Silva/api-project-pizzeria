import CreateCategoryService from "@modules/categories/services/CreateCategoryService";
import ListCategoriesService from "@modules/categories/services/ListCategoriesService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class CategoryController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute({
      name,
    });

    return response.json(category);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const categories = container.resolve(ListCategoriesService);

    const categoriesList = await categories.execute();

    return response.json(categoriesList);
  }
}

export default CategoryController;
