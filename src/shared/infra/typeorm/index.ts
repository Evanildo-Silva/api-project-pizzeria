import Category from "@modules/categories/infra/typeorm/entities/category";
import User from "@modules/users/infra/typeorm/entities/User";
import { DataSource } from "typeorm";
import { CreateUsers1699408921898 } from "./migrations/1699408921898-CreateUsers";
import { CreateCategories1699901605293 } from "./migrations/1699901605293-CreateCategories";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "apipizzeria",
  entities: [User, Category],
  migrations: [CreateUsers1699408921898, CreateCategories1699901605293],
});
