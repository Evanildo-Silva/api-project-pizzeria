import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateUser } from "../domain/models/ICreateUser";
import { IUser } from "../domain/models/IUser";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";

@injectable()
class CreateUserService {
  constructor(
    // Injetar dependências
    @inject("UserRepository")
    private userRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("Email address already used.");
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
