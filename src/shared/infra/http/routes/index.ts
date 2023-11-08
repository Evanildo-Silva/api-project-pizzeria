import usersRouter from "@modules/users/infra/http/routes/user.routes";
import { Router } from "express";

const routes = Router();

routes.use("/users", usersRouter);

export { routes };
