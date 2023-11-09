// Container de injeção de dependências do BcryptHashprovider
import { container } from "tsyringe";
import BcryptHashprovider from "./implementations/BcryptHashProvider";
import { IHashProvider } from "./models/IHashProvider";

container.registerSingleton<IHashProvider>("HashProvider", BcryptHashprovider);
