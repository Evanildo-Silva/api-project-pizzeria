import { IUsersRepository } from "@modules/users/domain/repositories/IUserRepository";
import UserRepository from "@modules/users/infra/typeorm/repositories/UserRepository";
import "@modules/users/providers"; // Import do container do HashProvider
import { container } from "tsyringe";
// Config container para que esteja disponível para injetar nas classes
container.registerSingleton<IUsersRepository>("UserRepository", UserRepository);
