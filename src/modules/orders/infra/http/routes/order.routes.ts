import isAuthenticated from "@shared/infra/http/middleware/isAuthenticated";
import { Joi, Segments, celebrate } from "celebrate";
import { Router } from "express";
import OrderController from "../controllers/OrderController";

const ordersRouter = Router();
const orderController = new OrderController();

ordersRouter.get(
  "/confirmed",
  isAuthenticated,
  orderController.confirmedOrders,
);

ordersRouter.post(
  "/register",
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      table: Joi.number().required(),
      name: Joi.string().optional(),
    },
  }),
  orderController.create,
);

ordersRouter.get(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  orderController.show,
);

ordersRouter.put(
  "/send",
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
    },
  }),
  orderController.sendOrder,
);

ordersRouter.put(
  "/finish",
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
    },
  }),
  orderController.finishOrder,
);

ordersRouter.delete(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  orderController.delete,
);

export default ordersRouter;
