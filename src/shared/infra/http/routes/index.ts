import categoriesRouter from "@modules/categories/infra/http/routes/category.routes";
import productRouter from "@modules/products/infra/http/routes/product.routes";
import sessionRouter from "@modules/users/infra/http/routes/session.routes";
import usersRouter from "@modules/users/infra/http/routes/user.routes";
import { Router } from "express";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionRouter);
routes.use("/category", categoriesRouter);
routes.use("/product", productRouter);

export { routes };
