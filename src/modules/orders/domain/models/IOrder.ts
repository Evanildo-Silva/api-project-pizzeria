import { Item } from "@modules/items/infra/typeorm/entities/Item";

export interface IOrder {
  id: string;
  table: number;
  status: boolean;
  draft: boolean;
  name?: string;
  items: Item[];
  created_at: Date;
  updated_at: Date;
}
