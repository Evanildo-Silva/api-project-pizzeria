import { ICreateUser } from "../models/ICreateUser";
import { IUser } from "../models/IUser";

export interface IUsersRepository {
  findById(id: string): Promise<IUser | null>;
  create(data: ICreateUser): Promise<IUser>;
}
