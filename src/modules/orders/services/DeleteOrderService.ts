import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IOrderRepository } from "../domain/repositories/IOrderRepository";

@injectable()
class DeleteOrderService {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new AppError("Order not found.");
    }

    await this.orderRepository.remove(order);
  }
}

export default DeleteOrderService;
