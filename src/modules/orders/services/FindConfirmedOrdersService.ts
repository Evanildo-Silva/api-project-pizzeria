import { inject, injectable } from "tsyringe";
import { IOrderRepository } from "../domain/repositories/IOrderRepository";

@injectable()
class FindConfirmedOrdersService {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository,
  ) {}

  public async execute() {
    const confirmedOrders = await this.orderRepository.findConfirmedOrders();

    return confirmedOrders;
  }
}

export default FindConfirmedOrdersService;
