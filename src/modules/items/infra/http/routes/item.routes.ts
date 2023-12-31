import isAuthenticated from "@shared/infra/http/middleware/isAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import ItemController from "../controllers/ItemController";

const itemsRouter = Router();
const itemController = new ItemController();

itemsRouter.post(
  "/register",
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      amount: Joi.number().required(),
      order: Joi.string().required(),
      product: Joi.string().required(),
    },
  }),
  itemController.create,
);

itemsRouter.delete(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  itemController.delete,
);

export default itemsRouter;
