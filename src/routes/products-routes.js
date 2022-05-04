const { Router } = require("express");

const productsRouter = Router();

const productsController = require("../controllers/products-controller");

productsRouter.get("/checkout", productsController.checkout);
productsRouter.get("/edit", productsController.edit);
productsRouter.get("/products/create", productsController.create);
productsRouter.get("/products", productsController.products);
productsRouter.get("/products/:id", productsController.detail);
productsRouter.post("/products", productsController.store);

module.exports = productsRouter;
