import Category from "@modules/categories/infra/typeorm/entities/Category";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import User from "@modules/users/infra/typeorm/entities/User";
import { DataSource } from "typeorm";
import { CreateUsers1699408921898 } from "./migrations/1699408921898-CreateUsers";
import { CreateCategories1699901605293 } from "./migrations/1699901605293-CreateCategories";
import { CreateProducts1699916290430 } from "./migrations/1699916290430-CreateProducts";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "apipizzeria",
  entities: [User, Category, Product],
  migrations: [
    CreateUsers1699408921898,
    CreateCategories1699901605293,
    CreateProducts1699916290430,
  ],
});
