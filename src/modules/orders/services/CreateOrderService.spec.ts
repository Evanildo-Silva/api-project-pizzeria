import AppError from "@shared/errors/AppError";
import FakeOrderRepository from "../domain/repositories/fakes/FakeOrderRepository";
import CreateOrderService from "./CreateOrderService";

let fakeOrderRepository: FakeOrderRepository;
let createOrder: CreateOrderService;

describe("CreateOrder", () => {
  beforeEach(() => {
    fakeOrderRepository = new FakeOrderRepository();
    createOrder = new CreateOrderService(fakeOrderRepository);
  });

  it("should be able create a new order", async () => {
    const order = await createOrder.execute({
      table: 30,
    });

    expect(order).toHaveProperty("id");
  });

  it("should not be possible to create a new order if the table number is not provided", async () => {
    expect(
      createOrder.execute({
        table: NaN,
        name: "Cliente Teste",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
