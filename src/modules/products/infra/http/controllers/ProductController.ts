import CreateProductService from "@modules/products/services/CreateProductService";
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
}

export default ProductController;
