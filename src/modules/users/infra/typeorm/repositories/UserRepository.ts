import { ICreateUser } from "@modules/users/domain/models/ICreateUser";
import { IUser } from "@modules/users/domain/models/IUser";
import { IUsersRepository } from "@modules/users/domain/repositories/IUserRepository";
import { dataSource } from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import User from "../entities/User";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    // Atribuir a instância do repositório desejado
    this.ormRepository = dataSource.getRepository(User);
  }

  public async create({ ...rest }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({ ...rest });

    await this.ormRepository.save(user);

    return user;
  }

  public async findById(id: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOneBy({ id });

    return user;
  }
}

export default UsersRepository;
