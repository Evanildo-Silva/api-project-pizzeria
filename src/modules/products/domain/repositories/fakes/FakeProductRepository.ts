import Product from "@modules/products/infra/typeorm/entities/Product";
import { v4 as uuidv4 } from "uuid";
import { ICreateProduct } from "../../models/ICreateProduct";
import { IProduct } from "../../models/IProduct";
import { IProductRepository } from "../IProductRepository";

class FakeProductRepository implements IProductRepository {
  private products: Product[] = [];

  public async create({
    name,
    price,
    description,
    banner,
    category_id,
  }: ICreateProduct): Promise<Product> {
    const product = new Product();

    product.id = uuidv4();
    product.name = name;
    product.price = price;
    product.description = description;
    product.banner = banner;
    product.category_id = category_id;

    this.products.push(product);

    return product;
  }
  public async findByCategory(category_id: string): Promise<IProduct[] | null> {
    const productList: Product[] = [];

    for (let index = 0; index < this.products.length; index++) {
      const element = this.products[index];

      if (element.category_id === category_id) {
        productList.push(element);
      }
    }
    return productList;
  }

  public async findByName(name: string): Promise<IProduct | null> {
    const product = this.products.find(product => product.name === name);

    if (product) {
      return product;
    }

    return null;
  }
}

export default FakeProductRepository;
