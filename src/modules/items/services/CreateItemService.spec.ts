import AppError from "@shared/errors/AppError";
import Mock from "../domain/mocks/mockTestItem";
import FakeItemRepository from "../domain/repositories/fakes/FakeItemRepository";
import CreateItemService from "./CreateItemService";

let fakeItemRepository: FakeItemRepository;
let createItem: CreateItemService;

describe("CreateItem", () => {
  beforeEach(() => {
    fakeItemRepository = new FakeItemRepository();
    createItem = new CreateItemService(fakeItemRepository);
  });

  it("should be able create a new item", async () => {
    const item = await createItem.execute({
      amount: 2,
      order_id: Mock.order,
      product_id: Mock.product,
    });

    expect(item).toHaveProperty("id");
  });

  it("should not be able create a new item if there is no amount", async () => {
    expect(
      createItem.execute({
        amount: 0,
        order_id: Mock.order,
        product_id: Mock.product,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
