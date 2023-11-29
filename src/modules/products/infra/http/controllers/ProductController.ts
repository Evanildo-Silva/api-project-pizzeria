import CreateProductService from "@modules/products/services/CreateProductService";
import ListProductByCategoryService from "@modules/products/services/ListProductByCategoryService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class ProductController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, description, category } = request.body;

    const banner = request.file!.filename;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      price,
      description,
      banner,
      category,
    });

    return response.status(201).json(product);
  }

  public async findByCategory(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const category = request.query.category as string;

    const productList = container.resolve(ListProductByCategoryService);

    const products = await productList.execute({ category });

    return response.json(products);
  }
}

export default ProductController;
