import AppError from "@shared/errors/AppError";
import FakeUserRepository from "../domain/repositories/fakes/FakeUserRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import CreateUserService from "./CreateUserService";

let fakeUserRepository: FakeUserRepository;
let createUser: CreateUserService;
let fakeHashProvider: FakeHashProvider;

describe("CreateUser", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });

  it("should be able to create a new user", async () => {
    const user = await createUser.execute({
      name: "Usuário Teste",
      email: "usuarioteste@gmail.com",
      password: "1234567",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be possible to create a new user if the email address is already in use", async () => {
    await createUser.execute({
      name: "Usuário Teste",
      email: "usuarioteste@gmail.com",
      password: "1234567",
    });

    expect(
      createUser.execute({
        name: "Usuário Teste",
        email: "usuarioteste@gmail.com",
        password: "1234567",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
