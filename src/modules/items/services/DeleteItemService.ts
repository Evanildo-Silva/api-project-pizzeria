import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IItemRepository } from "../domain/repositories/IItemRepository";

@injectable()
class DeleteItemService {
  constructor(
    @inject("ItemRepository")
    private itemRepository: IItemRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const item = await this.itemRepository.findById(id);

    if (!item) {
      throw new AppError("Item not found");
    }

    await this.itemRepository.remove(item);
  }
}

export default DeleteItemService;
