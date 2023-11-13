import { ICategoryRepository } from "@modules/categories/domain/repositories/ICategoryRepository";
import CategoryRepository from "@modules/categories/infra/typeorm/repositories/CategoryRepository";
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
