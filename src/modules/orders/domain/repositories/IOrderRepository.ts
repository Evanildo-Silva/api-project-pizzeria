import Order from "@modules/orders/infra/typeorm/entities/Order";
import { ICreateOrder } from "../models/ICreateOrder";
import { IOrder } from "../models/IOrder";

export interface IOrderRepository {
  create(data: ICreateOrder): Promise<IOrder>;
  findById(id: string): Promise<IOrder | null>;
  sendOrder(id: string): Promise<Order | null>;
  findConfirmedOrders(): Promise<IOrder[] | null>;
  finishOrder(id: string): Promise<Order | null>;
  findAll(): Promise<IOrder[]>;
  remove(order: IOrder): Promise<void>;
}
