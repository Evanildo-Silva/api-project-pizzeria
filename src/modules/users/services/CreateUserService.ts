import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateUser } from "../domain/models/ICreateUser";
import { IUser } from "../domain/models/IUser";
import { IUsersRepository } from "../domain/repositories/IUserRepository";

@injectable()
class CreateUserService {
  constructor(
    @inject("UserRepository")
    private UserRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const emailExists = await this.UserRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("Email address already used.");
    }

    const user = await this.UserRepository.create({
      name,
      email,
      password,
    });

    return user;
  }
}

export default CreateUserService;
