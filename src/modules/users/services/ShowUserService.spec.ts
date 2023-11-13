import AppError from "@shared/errors/AppError";
import FakeUserRepository from "../domain/repositories/fakes/FakeUserRepository";
import ShowUserService from "./ShowUserService";

let fakeUserRepository: FakeUserRepository;
let showUser: ShowUserService;

describe("ShowUser", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showUser = new ShowUserService(fakeUserRepository);
  });

  it("should be able to return the user based without the given ID", async () => {
    const user = await fakeUserRepository.create({
      name: "Usuário Teste",
      email: "usuarioteste@gmail.com",
      password: "1234567",
    });

    const id = user.id;

    const response = await showUser.execute({ id });

    expect(response).toEqual(user);
  });

  it("should not be able to return the user based without the given ID", async () => {
    const user = await fakeUserRepository.create({
      name: "Usuário Teste",
      email: "usuarioteste@gmail.com",
      password: "1234567",
    });

    const id = "wrong id";

    expect(showUser.execute({ id })).rejects.toBeInstanceOf(AppError);
  });
});
