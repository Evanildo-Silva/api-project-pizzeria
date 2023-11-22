import AppError from "@shared/errors/AppError";
import FakeOrderRepository from "../domain/repositories/fakes/FakeOrderRepository";
import Order from "../infra/typeorm/entities/Order";
import FinishOrderService from "./FinishOrderService";

let fakeOrderRepository: FakeOrderRepository;
let finishOrderService: FinishOrderService;

describe("", () => {
  beforeEach(() => {
    fakeOrderRepository = new FakeOrderRepository();
    finishOrderService = new FinishOrderService(fakeOrderRepository);
  });

  it("should be able to return the order with status properties equal to true", async () => {
    const orderList = [
      { table: 30, name: "Cliente Teste 1" },
      { table: 15, name: "Cliente Teste 2" },
      { table: 5, name: "Cliente Teste 3" },
    ];

    const orders: Order[] = [];

    for (let index = 0; index < orderList.length; index++) {
      const element = orderList[index];
      const order = await fakeOrderRepository.create(element);
      orders.push(order);
    }

    orders.forEach(async order => {
      await fakeOrderRepository.sendOrder(order.id);
    });

    const orderToFinish = await finishOrderService.execute(orders[1].id);

    expect(orderToFinish?.status).toBeTruthy();
  });

  it("should not be able to return the order if the draft property equals true", async () => {
    const order = await fakeOrderRepository.create({
      table: 30,
      name: "Cliente Teste 1",
    });

    expect(finishOrderService.execute(order.id)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it("should not be able to return the order if there is no ID", async () => {
    expect(finishOrderService.execute("")).rejects.toBeInstanceOf(AppError);
  });
});
