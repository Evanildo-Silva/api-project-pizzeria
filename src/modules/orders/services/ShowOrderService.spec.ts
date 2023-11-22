import AppError from "@shared/errors/AppError";
import FakeOrderRepository from "../domain/repositories/fakes/FakeOrderRepository";
import Order from "../infra/typeorm/entities/Order";
import ShowOrderService from "./ShowOrderService";

let fakeOrderRepository: FakeOrderRepository;
let showOrderService: ShowOrderService;

describe("ShowOrder", () => {
  beforeEach(() => {
    fakeOrderRepository = new FakeOrderRepository();
    showOrderService = new ShowOrderService(fakeOrderRepository);
  });

  it("should be able to return a request based on the given id", async () => {
    const orderList = [
      { table: 30, name: "Cliente Teste 1" },
      { table: 15, name: "Cliente Teste 2" },
    ];
    const orders: Order[] = [];

    for (let index = 0; index < orderList.length; index++) {
      const element = orderList[index];
      const order = await fakeOrderRepository.create(element);
      orders.push(order);
    }

    const order = await showOrderService.execute(orders[0].id);

    expect(order.table).toEqual(30);
  });

  it("should not return a request if the given ID does not exist", async () => {
    expect(showOrderService.execute("id_falso")).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
