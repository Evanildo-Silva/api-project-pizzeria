import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";
import { Secret, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { ICreateSession } from "../domain/models/ICreateSession";
import { IUserAuthenticated } from "../domain/models/IUserAuthenticated";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";

@injectable()
class CreateSessionService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: ICreateSession): Promise<IUserAuthenticated> {
    // Verificar se o usuário tem cadastro com base no email cadastrado
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    // Verificar a senha informada pelo usuário com a senha cadastrada.
    const passwordConfirmed = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordConfirmed) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    // Gerar token
    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    // Retorna objeto user + token
    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
