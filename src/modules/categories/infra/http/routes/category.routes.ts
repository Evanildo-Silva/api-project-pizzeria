import isAuthenticated from "@shared/infra/http/middleware/isAuthenticated";
import { Joi, Segments, celebrate } from "celebrate";
import { Router } from "express";
import CategoryController from "../controllers/CategoryController";

const categoriesRouter = Router();
const categoryController = new CategoryController();

categoriesRouter.post(
  "/register",
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  categoryController.create,
);

categoriesRouter.get("/index", isAuthenticated, categoryController.index);

export default categoriesRouter;
