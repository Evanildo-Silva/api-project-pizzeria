import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateProduct } from "../domain/models/ICreateProduct";
import { IProduct } from "../domain/models/IProduct";
import { IProductRepository } from "../domain/repositories/IProductRepository";

@injectable()
class CreateProductService {
  constructor(
    @inject("ProducRepository")
    private productRepository: IProductRepository,
  ) {}

  public async execute({
    name,
    price,
    description,
    banner,
    category_id,
  }: ICreateProduct): Promise<IProduct> {
    const productExists = await this.productRepository.findByName(name);

    if (productExists) {
      throw new AppError("Product name already used.");
    }

    const product = await this.productRepository.create({
      name,
      price,
      description,
      banner,
      category_id,
    });

    return product;
  }
}

export default CreateProductService;
