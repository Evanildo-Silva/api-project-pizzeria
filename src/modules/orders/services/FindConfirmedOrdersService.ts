import { inject, injectable } from "tsyringe";
import { IOrder } from "../domain/models/IOrder";
import { IOrderRepository } from "../domain/repositories/IOrderRepository";

@injectable()
class FindConfirmedOrdersService {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository,
  ) {}

  public async execute(): Promise<IOrder[] | null> {
    const confirmedOrders = await this.orderRepository.findConfirmedOrders();

    return confirmedOrders;
  }
}

export default FindConfirmedOrdersService;
