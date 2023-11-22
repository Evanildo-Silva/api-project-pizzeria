import { IOrder } from "@modules/orders/domain/models/IOrder";
import { IProduct } from "@modules/products/domain/models/IProduct";

export interface IItem {
  amount: number;
  order_id: IOrder;
  product_id: IProduct;
  created_at: Date;
  updated_at: Date;
}
