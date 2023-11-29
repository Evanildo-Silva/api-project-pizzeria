import FakeOrderRepository from "../domain/repositories/fakes/FakeOrderRepository";
import Order from "../infra/typeorm/entities/Order";
import FindConfirmedOrdersService from "./FindConfirmedOrdersService";

let fakeOrderRepository: FakeOrderRepository;
let findConfirmedOrdersService: FindConfirmedOrdersService;

describe("FindConfirmedOrders", () => {
  beforeEach(() => {
    fakeOrderRepository = new FakeOrderRepository();
    findConfirmedOrdersService = new FindConfirmedOrdersService(
      fakeOrderRepository,
    );
  });

  it("should be able to return a list of confirmed orders", async () => {
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

    orders.forEach(async (order, i) => {
      if (i % 2 === 0) {
        await fakeOrderRepository.sendOrder(order.id);
      }
    });

    const confirmedOrders = await findConfirmedOrdersService.execute();

    expect(confirmedOrders).toHaveLength(2);
    expect(confirmedOrders![0].draft).toBeFalsy();
    expect(confirmedOrders![1].draft).toBeFalsy();
  });
});
