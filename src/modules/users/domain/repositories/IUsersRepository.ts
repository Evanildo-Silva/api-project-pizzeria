import { ICreateUser } from "../models/ICreateUser";
import { IUser } from "../models/IUser";

// Interface para determinar o repositório de usuários
export interface IUsersRepository {
  create(data: ICreateUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
}
