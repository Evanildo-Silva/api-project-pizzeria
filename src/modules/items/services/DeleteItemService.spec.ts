import AppError from "@shared/errors/AppError";
import Mock from "../domain/mocks/mockTestItem";
import FakeItemRepository from "../domain/repositories/fakes/FakeItemRepository";
import DeleteItemService from "./DeleteItemService";

let fakeItemRepository: FakeItemRepository;
let deleteItemService: DeleteItemService;

describe("DeleteItem", () => {
  beforeEach(() => {
    fakeItemRepository = new FakeItemRepository();
    deleteItemService = new DeleteItemService(fakeItemRepository);
  });

  it("should be able to return the list without the item informed by the id", async () => {
    const item = await fakeItemRepository.create({
      amount: 1,
      order: Mock.order,
      product: Mock.product,
    });

    // TODO verifica como buscar o retorno

    await deleteItemService.execute(item.id);
  });

  it("should be able to return an erro", async () => {
    expect(deleteItemService.execute("")).rejects.toBeInstanceOf(AppError);
  });
});
