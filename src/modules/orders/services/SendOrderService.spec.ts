import AppError from "@shared/errors/AppError";
import FakeOrderRepository from "../domain/repositories/fakes/FakeOrderRepository";
import Order from "../infra/typeorm/entities/Order";
import SendOrderService from "./SendOrderService";

let fakeOrderRepository: FakeOrderRepository;
let orderSendService: SendOrderService;

describe("SendOrder", () => {
  beforeEach(() => {
    fakeOrderRepository = new FakeOrderRepository();
    orderSendService = new SendOrderService(fakeOrderRepository);
  });

  it("should be able to return the order with draft properties equal to false", async () => {
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

    const orderSent = await orderSendService.execute(orders[1].id);

    expect(orderSent?.draft).toEqual(false);
  });

  it("should not be able to return the order", async () => {
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

    expect(orderSendService.execute("")).rejects.toBeInstanceOf(AppError);
  });
});
