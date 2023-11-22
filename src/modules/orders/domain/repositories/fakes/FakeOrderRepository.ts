import Order from "@modules/orders/infra/typeorm/entities/Order";
import { v4 as uuidv4 } from "uuid";
import { ICreateOrder } from "../../models/ICreateOrder";
import { IOrder } from "../../models/IOrder";
import { IOrderRepository } from "../IOrderRepository";

class FakeOrderRepository implements IOrderRepository {
  private orders: Order[] = [];

  public async create({ table, name }: ICreateOrder): Promise<Order> {
    const order = new Order();

    order.id = uuidv4();
    order.table = table;
    order.name = name;
    order.status = false;
    order.draft = true;

    this.orders.push(order);

    return order;
  }

  public async findById(id: string): Promise<IOrder | null> {
    throw new Error("Method not implemented.");
  }

  public async findConfirmedOrders(): Promise<IOrder[] | null> {
    const confirmedOrders: Order[] = [];

    if (this.orders.length !== 0) {
      for (let index = 0; index < this.orders.length; index++) {
        const element = this.orders[index];
        if (element.draft === false && element.status === false) {
          confirmedOrders.push(element);
        }
      }
      return confirmedOrders;
    }

    return null;
  }

  public async sendOrder(id: string): Promise<Order | null> {
    const order = this.orders.find(order => order.id === id);

    if (!order) {
      return null;
    }

    order.draft = false;

    return order;
  }
}

export default FakeOrderRepository;
