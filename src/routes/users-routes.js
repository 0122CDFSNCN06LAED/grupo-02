const { Router } = require("express");
const path = require("path");
const multer = require("multer");

const {body} = require('express-validator')

const usersRouter = Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/images/users/avatar"),
  filename: (req, file, cb) => {
    const fileName =
      `${Date.now()}_img${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
});


const usersController = require("../controllers/users-controller");

const validations = [
    body('phone').notEmpty().withMessage('Tienes que indicar un numero de telefono'),
    body('name').notEmpty().withMessage('Tienes que indicar un nombre'),
    body('email').notEmpty().withMessage('Tienes que indicar un email'),
    body('password').notEmpty().withMessage('Tienes que indicar una contrasena'),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        if (!file) {
            throw new Error('Tienes que subir una imagen')
        }

        return true
    })
]

usersRouter.get("/login", usersController.login);
usersRouter.get("/register", usersController.register);
usersRouter.post("/user/register",upload.single('avatar'), validations, usersController.processRegister)

module.exports = usersRouter;
