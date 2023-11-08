import { ICreateUser } from "../models/ICreateUser";
import { IUser } from "../models/IUser";

// Interface para determinar o repositório de usuários
export interface IUsersRepository {
  findById(id: string): Promise<IUser | null>;
  create(data: ICreateUser): Promise<IUser>;
}
