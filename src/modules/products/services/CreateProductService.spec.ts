import AppError from "@shared/errors/AppError";
import FakeProductRepository from "../domain/repositories/fakes/FakeProductRepository";
import CreateProductService from "./CreateProductService";

let fakeProductRepository: FakeProductRepository;
let createProduct: CreateProductService;

describe("CreateProduct", () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    createProduct = new CreateProductService(fakeProductRepository);
  });

  it("should be able to create a new product", async () => {
    const product = await createProduct.execute({
      name: "Produto teste",
      price: 10.0,
      description: "Produto criado para testes",
      banner: "image",
      category: {
        id: "7e6354c1-8e22-4b59-953d-752b03b4076b",
        name: "Categoria teste",
        products: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    expect(product).toHaveProperty("id");
  });

  it("should not be able to create a new product with the same name", async () => {
    await createProduct.execute({
      name: "Produto teste",
      price: 10.0,
      description: "Produto criado para testes",
      banner: "image",
      category: {
        id: "7e6354c1-8e22-4b59-953d-752b03b4076b",
        name: "Categoria teste",
        products: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    expect(
      createProduct.execute({
        name: "Produto teste",
        price: 10.0,
        description: "Produto criado para testes",
        banner: "image",
        category: {
          id: "7e6354c1-8e22-4b59-953d-752b03b4076b",
          name: "Categoria teste",
          products: [],
          created_at: new Date(),
          updated_at: new Date(),
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("shouldn't be able to create a new product without an image", async () => {
    expect(
      createProduct.execute({
        name: "Produto teste",
        price: 10.0,
        description: "Produto criado para testes",
        banner: "",
        category: {
          id: "7e6354c1-8e22-4b59-953d-752b03b4076b",
          name: "Categoria teste",
          products: [],
          created_at: new Date(),
          updated_at: new Date(),
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
