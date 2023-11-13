import AppError from "@shared/errors/AppError";
import FakeUserRepository from "../domain/repositories/fakes/FakeUserRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import CreateSessionService from "./CreateSessionService";

let fakeUserRepository: FakeUserRepository;
let createSession: CreateSessionService;
let fakeHashProvider: FakeHashProvider;

describe("CreateSession", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createSession = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  /**
   * ! Para realizar esse teste ir para a pasta config no arquivo auth ("../../../config/auth") e modeificar a secret.
   * ! O Jest tem problemas para ler a variável de ambiente. subistituir por → secret: "secretparateste",
   */
  it("should be able to authenticate", async () => {
    // Criar usuário
    const user = await fakeUserRepository.create({
      name: "Usuário Teste",
      email: "usuarioteste@gmail.com",
      password: "1234567",
    });

    // Logar
    const response = await createSession.execute({
      email: "usuarioteste@gmail.com",
      password: "1234567",
    });

    // Deve haver um token
    expect(response).toHaveProperty("token");
    // Usuário retornado deve igual ao criado
    expect(response.user).toEqual(user);
  });

  it("should not be able to authenticate with non-existent user", async () => {
    // Logar sem usuário
    expect(
      createSession.execute({
        email: "emailerrado@gmail.com",
        password: "1234567",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    // Criar usuário
    const user = await fakeUserRepository.create({
      name: "Usuário Teste",
      email: "usuarioteste@gmail.com",
      password: "1234567",
    });

    // Logar com senha errada
    expect(
      createSession.execute({
        email: "usuarioteste@gmail.com",
        password: "senhaerrada",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
