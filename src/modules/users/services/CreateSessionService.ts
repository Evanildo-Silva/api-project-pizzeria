import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { Secret, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { ICreateSession } from "../domain/models/ICreateSession";
import { IUserAuthenticated } from "../domain/models/IUserAuthenticated";
import { IUsersRepository } from "../domain/repositories/IUserRepository";

@injectable()
class CreateSessionService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepository,
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
    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    // Gerar token
    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
