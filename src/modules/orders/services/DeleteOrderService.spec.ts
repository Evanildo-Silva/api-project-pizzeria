import AppError from "@shared/errors/AppError";
import FakeOrderRepository from "../domain/repositories/fakes/FakeOrderRepository";
import DeleteOrderService from "./DeleteOrderService";

let fakeOrderRepository: FakeOrderRepository;
let deleteOrderService: DeleteOrderService;

describe("DeleteOrder", () => {
  beforeEach(() => {
    fakeOrderRepository = new FakeOrderRepository();
    deleteOrderService = new DeleteOrderService(fakeOrderRepository);
  });

  it("should be able to return the list without the order informed by the id", async () => {
    const orderList = [
      { table: 30, name: "Cliente Teste 1" },
      { table: 15, name: "Cliente Teste 2" },
      { table: 5, name: "Cliente Teste 3" },
    ];

    for (let index = 0; index < orderList.length; index++) {
      const element = orderList[index];
      await fakeOrderRepository.create(element);
    }

    // TODO verifica como buscar o retorno
    const list = await fakeOrderRepository.findAll();
    await deleteOrderService.execute(list[1].id);
  });

  it("should be able to return an erro", async () => {
    expect(deleteOrderService.execute("")).rejects.toBeInstanceOf(AppError);
  });
});
