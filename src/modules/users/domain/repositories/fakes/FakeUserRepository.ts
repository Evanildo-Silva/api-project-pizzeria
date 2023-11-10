import { ICreateUser } from "@modules/users/domain/models/ICreateUser";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import User from "@modules/users/infra/typeorm/entities/User";
import { v4 as uuidv4 } from "uuid";

class FakeUserRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = new User();

    user.id = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;

    this.users.push(user);

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id);

    if (user) {
      return user;
    }

    return null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email);

    if (user) {
      return user;
    }

    return null;
  }
}

export default FakeUserRepository;
