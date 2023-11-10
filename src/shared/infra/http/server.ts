import "dotenv/config";
import "reflect-metadata";
import { dataSource } from "../typeorm";
import { app } from "./app";

const port = 3333;

dataSource.initialize().then(() => {
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}!🚀`);
  });
});
