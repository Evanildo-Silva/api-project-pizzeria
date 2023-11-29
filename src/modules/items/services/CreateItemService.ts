import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateItem } from "../domain/models/ICreateItem";
import { IItem } from "../domain/models/IItem";
import { IItemRepository } from "../domain/repositories/IItemRepository";

@injectable()
class CreateItemService {
  constructor(
    @inject("ItemRepository")
    private itemRepository: IItemRepository,
  ) {}

  public async execute({
    amount,
    order,
    product,
  }: ICreateItem): Promise<IItem> {
    if (!amount) {
      throw new AppError("The quantity of items must be informed.");
    }
    const item = await this.itemRepository.create({
      amount,
      order,
      product,
    });

    return item;
  }
}

export default CreateItemService;
