import AppError from "@shared/errors/AppError";
import FakeItemRepository from "../domain/repositories/fakes/FakeItemRepository";
import CreateItemService from "./CreateItemService";

let fakeItemRepository: FakeItemRepository;
let createItem: CreateItemService;

const order = {
  id: "55129b14-2000-41f0-9381-0431545a2d24",
  table: 58,
  status: false,
  draft: false,
  created_at: new Date(),
  updated_at: new Date(),
  items: [],
};
const category = {
  id: "e9c87eaf-6bbd-4e19-88f9-a6889d630f2e",
  name: "Bebidas",
  created_at: new Date(),
  updated_at: new Date(),
  products: [],
};
const product = {
  id: "ff9a5466-2990-4085-a5b4-d1fd223122b2",
  name: "sprite",
  price: 5.9,
  description: "Refrigerante sabor Cola, 350ml.",
  banner: "63df88d770034d3d9bde1fdde9ce56ca-stripe-lata.png",
  created_at: new Date(),
  updated_at: new Date(),
  items: [],
  category: category,
};

describe("CreateItem", () => {
  beforeEach(() => {
    fakeItemRepository = new FakeItemRepository();
    createItem = new CreateItemService(fakeItemRepository);
  });

  it("should be able create a new item", async () => {
    const item = await createItem.execute({
      amount: 2,
      order_id: order,
      product_id: product,
    });

    expect(item).toHaveProperty("id");
  });

  it("should not be able create a new item if there is no amount", async () => {
    expect(
      createItem.execute({
        amount: 0,
        order_id: order,
        product_id: product,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
