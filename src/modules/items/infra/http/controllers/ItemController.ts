import CreateItemService from "@modules/items/services/CreateItemService";
import DeleteItemService from "@modules/items/services/DeleteItemService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class ItemController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { amount, order, product } = request.body;

    const createItem = container.resolve(CreateItemService);

    const item = await createItem.execute({
      amount,
      order,
      product,
    });

    return response.json(item);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;

    const deleteItem = container.resolve(DeleteItemService);

    await deleteItem.execute(id);

    return response.status(204).json();
  }
}

export default ItemController;
