import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IOrderRepository } from "../domain/repositories/IOrderRepository";
import Order from "../infra/typeorm/entities/Order";

@injectable()
class FinishOrderService {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository,
  ) {}

  public async execute(id: string): Promise<Order | null> {
    if (!id) {
      throw new AppError("Unable to find order");
    }

    const order = await this.orderRepository.findById(id);

    if (order?.draft === true) {
      throw new AppError("Unable to finalize a draft");
    }

    const orderToFinish = this.orderRepository.finishOrder(id);

    return orderToFinish;
  }
}

export default FinishOrderService;
