import { ICreateProduct } from "@modules/products/domain/models/ICreateProduct";
import { dataSource } from "@shared/infra/typeorm";
import { Equal, Repository } from "typeorm";
import Product from "../entities/Product";

class ProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Product);
  }

  public async create({ ...rest }: ICreateProduct): Promise<Product> {
    const product = this.ormRepository.create({
      ...rest,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async findByCategory(category_id: string): Promise<Product[] | null> {
    const products = await this.ormRepository.find({
      where: {
        category_id: Equal(category_id),
      },
    });

    return products;
  }
}

export default ProductRepository;
