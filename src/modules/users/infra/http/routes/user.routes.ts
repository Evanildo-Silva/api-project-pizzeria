import isAuthenticated from "@shared/infra/http/middleware/isAuthenticated";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import UserController from "../controllers/UserController";

const usersRouter = Router();
const userController = new UserController();

usersRouter.post(
  "/signup",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

usersRouter.get(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  userController.show,
);

export default usersRouter;
