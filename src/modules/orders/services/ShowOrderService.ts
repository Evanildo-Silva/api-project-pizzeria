import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IOrderRepository } from "../domain/repositories/IOrderRepository";
import Order from "../infra/typeorm/entities/Order";

@injectable()
class ShowOrderService {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository,
  ) {}

  public async execute(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new AppError("Order not found.");
    }

    return order;
  }
}

export default ShowOrderService;
