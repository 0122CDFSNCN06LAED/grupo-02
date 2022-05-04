const { Router } = require("express");

const productsRouter = Router();

const productsController = require("../controllers/products-controller");

productsRouter.get("/checkout", productsController.checkout);
productsRouter.get("/products/create", productsController.create);
productsRouter.get("/products", productsController.products);
productsRouter.get("/products/:id", productsController.detail);
productsRouter.post("/products", productsController.store);
productsRouter.get("/products/:id/edit", productsController.edit);
productsRouter.put("/products/:id", productsController.update)
productsRouter.delete("/products/:id", productsController.destroy)

module.exports = productsRouter;
