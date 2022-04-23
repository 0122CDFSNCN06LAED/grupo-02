const { Router } = require("express");

const productsRouter = Router();

const productsController = require("../controllers/products-controller");

productsRouter.get("/productDetail", productsController.productDetail);
productsRouter.get("/checkout", productsController.checkout);
productsRouter.get("/edit", productsController.edit);
productsRouter.get("/create", productsController.create);

module.exports = productsRouter;
