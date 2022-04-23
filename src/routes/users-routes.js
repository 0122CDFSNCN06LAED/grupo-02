const { Router } = require("express");

const usersRouter = Router();

const usersController = require("../controllers/users-controller");

usersRouter.get("/login", usersController.login);
usersRouter.get("/register", usersController.register);

module.exports = usersRouter;
