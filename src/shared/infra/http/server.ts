import AppError from "@shared/errors/AppError";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes";

const port = 3333;

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

// Middleware para interceptar erros com a classe customizada AppError
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  },
);

app.listen(port, () => {
  console.log(`Server running on port ${port}🚀!`);
});
