import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "apipizzeria",
  entities: [],
  migrations: [],
});
