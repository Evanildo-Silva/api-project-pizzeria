import Category from "@modules/categories/infra/typeorm/entities/Category";
import { Item } from "@modules/items/infra/typeorm/entities/Item";
import Order from "@modules/orders/infra/typeorm/entities/Order";
import Product from "@modules/products/infra/typeorm/entities/Product";
import User from "@modules/users/infra/typeorm/entities/User";
import { DataSource } from "typeorm";
import { CreateUsers1699408921898 } from "./migrations/1699408921898-CreateUsers";
import { CreateCategories1699901605293 } from "./migrations/1699901605293-CreateCategories";
import { CreateProducts1699916290430 } from "./migrations/1699916290430-CreateProducts";
import { CreateOrders1700521375933 } from "./migrations/1700521375933-CreateOrders";
import { CreateItems1700521940644 } from "./migrations/1700521940644-CreateItems";
import { AddOrderIdToItems1700522613355 } from "./migrations/1700522613355-AddOrderIdToItems";
import { AddProductIdToItems1700523182224 } from "./migrations/1700523182224-AddProductIdToItems";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Category, Product, Order, Item],
  migrations: [
    CreateUsers1699408921898,
    CreateCategories1699901605293,
    CreateProducts1699916290430,
    CreateOrders1700521375933,
    CreateItems1700521940644,
    AddOrderIdToItems1700522613355,
    AddProductIdToItems1700523182224,
  ],
});
