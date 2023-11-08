import { DataSource } from "typeorm";
import { CreateUsers1699408921898 } from "./migrations/1699408921898-CreateUsers";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "apipizzeria",
  entities: [],
  migrations: [CreateUsers1699408921898],
});
