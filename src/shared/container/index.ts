import { ICategoryRepository } from "@modules/categories/domain/repositories/ICategoryRepository";
import CategoryRepository from "@modules/categories/infra/typeorm/repositories/CategoryRepository";
import { IItemRepository } from "@modules/items/domain/repositories/IItemRepository";
import ItemRepository from "@modules/items/infra/typeorm/repositories/ItemRepository";
import { IOrderRepository } from "@modules/orders/domain/repositories/IOrderRepository";
import OrderRepository from "@modules/orders/infra/typeorm/repositories/OrderRepository";
import { IProductRepository } from "@modules/products/domain/repositories/IProductRepository";
import ProductRepository from "@modules/products/infra/typeorm/repositories/ProductRepository";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import UserRepository from "@modules/users/infra/typeorm/repositories/UserRepository";
import "@modules/users/providers/HashProvider"; // Import do container do HashProvider
import { container } from "tsyringe";
// Config container para que esteja disponível para injetar nas classes
container.registerSingleton<IUsersRepository>("UserRepository", UserRepository);

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository,
);

container.registerSingleton<IProductRepository>(
  "ProductRepository",
  ProductRepository,
);

container.registerSingleton<IOrderRepository>(
  "OrderRepository",
  OrderRepository,
);

container.registerSingleton<IItemRepository>("ItemRepository", ItemRepository);
