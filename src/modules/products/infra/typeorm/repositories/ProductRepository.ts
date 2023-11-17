import { ICreateProduct } from "@modules/products/domain/models/ICreateProduct";
import { IProductRepository } from "@modules/products/domain/repositories/IProductRepository";
import { dataSource } from "@shared/infra/typeorm";
import { Equal, Repository } from "typeorm";
import Product from "../entities/Product";

class ProductRepository implements IProductRepository {
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

  public async findByCategory(category: string): Promise<Product[] | null> {
    const products = await this.ormRepository.find({
      where: {
        category: Equal(category),
      },
    });

    return products;
  }

  public async findByName(name: string): Promise<Product | null> {
    const product = await this.ormRepository.findOneBy({ name });

    return product;
  }
}

export default ProductRepository;
