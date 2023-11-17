import FakeProductRepository from "../domain/repositories/fakes/FakeProductRepository";

let fakeProductRepository: FakeProductRepository;

describe("ListProductByCategory", () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
  });

  it("should return a list of products based on the category id provided", async () => {
    const products = [
      {
        name: "Produto teste 1",
        price: 10.0,
        description: "Produto criado para testes",
        banner: "image",
        category_id: "7e6354c1-8e22-4b59-953d-752b03b4076b",
      },
      {
        name: "Produto teste 2",
        price: 10.0,
        description: "Produto criado para testes",
        banner: "image",
        category_id: "e08b66fe-cca9-4d51-afa6-e00128b678ab",
      },
      {
        name: "Produto teste 3",
        price: 10.0,
        description: "Produto criado para testes",
        banner: "image",
        category_id: "7e6354c1-8e22-4b59-953d-752b03b4076b",
      },
    ];

    products.map(product => {
      fakeProductRepository.create(product);
    });

    const productList = await fakeProductRepository.findByCategory(
      "7e6354c1-8e22-4b59-953d-752b03b4076b",
    );

    expect(productList).toHaveLength(2);
    expect(productList![0].name).toBe("Produto teste 1");
    expect(productList![1].name).toBe("Produto teste 3");
  });
});
