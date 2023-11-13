import categoriesRouter from "@modules/categories/infra/http/routes/category.routes";
import sessionRouter from "@modules/users/infra/http/routes/session.routes";
import usersRouter from "@modules/users/infra/http/routes/user.routes";
import { Router } from "express";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionRouter);
routes.use("/category", categoriesRouter);

export { routes };
