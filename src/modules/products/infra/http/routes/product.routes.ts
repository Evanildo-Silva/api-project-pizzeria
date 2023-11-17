import uploadConfig from "@config/upload";
import isAuthenticated from "@shared/infra/http/middleware/isAuthenticated";
import { Joi, Segments, celebrate } from "celebrate";
import { Router } from "express";
import multer from "multer";
import ProductController from "../controllers/ProductController";

const productRouter = Router();
const productController = new ProductController();
const upload = multer(uploadConfig.upload("./temp"));

productRouter.post(
  "/register",
  isAuthenticated,
  upload.single("banner"),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      description: Joi.string().required(),
      category: Joi.string().required(),
    },
  }),
  productController.create,
);

productRouter.get(
  "/bycategory",
  isAuthenticated,
  productController.findByCategory,
);

export default productRouter;
