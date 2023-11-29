import { inject, injectable } from "tsyringe";
import { IProduct } from "../domain/models/IProduct";
import { IShowProduct } from "../domain/models/IShowProducts";
import { IProductRepository } from "../domain/repositories/IProductRepository";

@injectable()
class ListProductByCategoryService {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository,
  ) {}

  public async execute({ category }: IShowProduct): Promise<IProduct[] | null> {
    const products = await this.productRepository.findByCategory(category);

    if (products?.length !== 0) {
      return products;
    }

    return null;
  }
}

export default ListProductByCategoryService;
