const { Router } = require("express");

const mainController = require("../controllers/main-controller");
const productsController = require("../controllers/products-controller");
const usersController = require("../controllers/users-controller");

const mainRouter = Router();

mainRouter.get("/", mainController.home);
mainRouter.get("/login", usersController.login);
mainRouter.get("/register", usersController.register);
mainRouter.get("/productDetail", productsController.productDetail);
mainRouter.get("/checkout", productsController.checkout);
mainRouter.get("/editAndCreate", productsController.editAndCreate);

module.exports = mainRouter;
