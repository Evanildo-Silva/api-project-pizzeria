import { IOrder } from "@modules/orders/domain/models/IOrder";
import { IProduct } from "@modules/products/domain/models/IProduct";

export interface IItem {
  id: string;
  amount: number;
  order: IOrder;
  product: IProduct;
  created_at: Date;
  updated_at: Date;
}
