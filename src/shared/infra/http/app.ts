import "@shared/container";
import AppError from "@shared/errors/AppError";
import "@shared/infra/typeorm";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { routes } from "./routes";

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

export { app };
