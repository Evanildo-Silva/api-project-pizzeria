import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IOrder } from "../domain/models/IOrder";
import { IOrderRepository } from "../domain/repositories/IOrderRepository";

@injectable()
class SendOrderService {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository,
  ) {}

  public async execute(id: string): Promise<IOrder | null> {
    if (!id) {
      throw new AppError("Unable to find order");
    }
    const order = this.orderRepository.sendOrder(id);

    return order;
  }
}

export default SendOrderService;
