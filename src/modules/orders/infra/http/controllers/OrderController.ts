import CreateOrderService from "@modules/orders/services/CreateOrderService";
import DeleteOrderService from "@modules/orders/services/DeleteOrderService";
import FindConfirmedOrdersService from "@modules/orders/services/FindConfirmedOrdersService";
import FinishOrderService from "@modules/orders/services/FinishOrderService";
import SendOrderService from "@modules/orders/services/SendOrderService";
import ShowOrderService from "@modules/orders/services/ShowOrderService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class OrderController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { table, name } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      table,
      name,
    });

    return response.status(201).json(order);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params.id as string;

    const showOrder = container.resolve(ShowOrderService);

    const order = await showOrder.execute(id);

    return response.json(order);
  }

  public async confirmedOrders(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const confirmedOrders = container.resolve(FindConfirmedOrdersService);

    const orders = await confirmedOrders.execute();

    return response.json(orders);
  }

  public async sendOrder(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.body;

    const sendOrder = container.resolve(SendOrderService);

    const order = await sendOrder.execute(id);

    return response.json(order);
  }

  public async finishOrder(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.body;

    const finishOrder = container.resolve(FinishOrderService);

    const order = await finishOrder.execute(id);

    return response.json(order);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;

    const deleteOrder = container.resolve(DeleteOrderService);

    const order = await deleteOrder.execute(id);

    return response.json(order);
  }
}

export default OrderController;
