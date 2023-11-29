import CreateUserService from "@modules/users/services/CreateUserService";
import ShowUserService from "@modules/users/services/ShowUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute({ id });

    return response.json(user);
  }
}

export default UserController;
