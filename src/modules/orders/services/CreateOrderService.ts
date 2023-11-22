import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateOrder } from "../domain/models/ICreateOrder";
import { IOrder } from "../domain/models/IOrder";
import { IOrderRepository } from "../domain/repositories/IOrderRepository";

@injectable()
class CreateOrderService {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository,
  ) {}

  public async execute({ table, name }: ICreateOrder): Promise<IOrder> {
    if (!table) {
      throw new AppError("The table number must be provided.");
    }

    const order = await this.orderRepository.create({ table, name });

    return order;
  }
}

export default CreateOrderService;
