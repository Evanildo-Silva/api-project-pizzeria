import { inject, injectable } from "tsyringe";
import { ICreateSession } from "../domain/models/ICreateSession";
import { IUsersRepository } from "../domain/repositories/IUserRepository";
// import { IUserAuthenticated } from "../domain/models/IUserAuthenticated";
import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { IUser } from "../domain/models/IUser";

@injectable()
class CreateSessionService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: ICreateSession): Promise<IUser> {
    // Verificar se o usuário tem cadastro com base no email cadastrado
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    // Verificar a senha informada pelo usuário com a senha cadastrada.
    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    return user;
  }
}

export default CreateSessionService;
