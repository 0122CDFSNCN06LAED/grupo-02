const { Router } = require("express");

const { body } = require("express-validator");

const usersRouter = Router();

const upload = require("../middlewares/multerMiddleware");
const validations = require("../middlewares/validateRegisterMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

const usersController = require("../controllers/users-controller");

usersRouter.get("/login", guestMiddleware, usersController.login);
usersRouter.get("/register", guestMiddleware, usersController.register);
usersRouter.get("/user/profile", authMiddleware, usersController.profile);
usersRouter.post(
  "/user/register",
  upload.single("avatar"),
  validations,
  usersController.processRegister
);
usersRouter.post("/login", usersController.loginProcess);
usersRouter.get("/logout", usersController.logout);

module.exports = usersRouter;
