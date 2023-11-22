import { IOrder } from "@modules/orders/domain/models/IOrder";
import { IProduct } from "@modules/products/domain/models/IProduct";

export interface ICreateItem {
  amount: number;
  order_id: IOrder;
  product_id: IProduct;
}
