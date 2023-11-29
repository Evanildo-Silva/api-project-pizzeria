import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IShowUser } from "../domain/models/IShowUser";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import User from "../infra/typeorm/entities/User";

@injectable()
class ShowUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IShowUser): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found.");
    }

    return user;
  }
}

export default ShowUserService;
