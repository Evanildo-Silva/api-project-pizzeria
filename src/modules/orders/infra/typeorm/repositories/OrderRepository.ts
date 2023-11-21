import { ICreateOrder } from "@modules/orders/domain/models/ICreateOrder";
import { IOrder } from "@modules/orders/domain/models/IOrder";
import { IOrderRepository } from "@modules/orders/domain/repositories/IOrderRepository";
import { dataSource } from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import Order from "../entities/Order";

class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    // Atribuir a instância do repositório desejado
    this.ormRepository = dataSource.getRepository(Order);
  }

  public async create({ ...rest }: ICreateOrder): Promise<IOrder> {
    const order = this.ormRepository.create({ ...rest });

    await this.ormRepository.save(order);

    return order;
  }

  public async findById(id: string): Promise<IOrder | null> {
    const order = await this.ormRepository.findOneBy({ id });

    return order;
  }

  public async sendOrder(id: string): Promise<Order | null> {
    await this.ormRepository.update({ id: id }, { draft: false });

    const order = await this.ormRepository.findOneBy({ id });

    return order;
  }
}

export default OrderRepository;
