import { ICreateOrder } from "../models/ICreateOrder";
import { IOrder } from "../models/IOrder";

export interface IOrderRepository {
  create(data: ICreateOrder): Promise<IOrder>;
  findById(id: string): Promise<IOrder | null>;
}
