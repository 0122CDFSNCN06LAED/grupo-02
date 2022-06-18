const path = require("path");
const { body } = require("express-validator");

module.exports = [
  body("phone")
    .notEmpty()
    .withMessage("Tienes que indicar un numero de telefono"),
  body("name").notEmpty().withMessage("Tienes que indicar un nombre"),
  body("email").notEmpty().withMessage("Tienes que indicar un email"),
  body("password").notEmpty().withMessage("Tienes que indicar una contrasena"),
  body("avatar").custom((value, { req }) => {
    let file = req.file;
    if (!file) {
      throw new Error("Tienes que subir una imagen");
    }

    return true;
  }),
];
