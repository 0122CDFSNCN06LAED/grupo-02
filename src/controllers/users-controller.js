const { validationResult } = require("express-validator");

fs = require("fs");
path = require("path");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

module.exports = {
  login: (req, res) => {
    res.render("./users/login");
  },
  register: (req, res) => {
    res.render("./users/register");
  },
  processRegister: (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render("./users/register", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    let userInDB = User.findByField("email", req.body.email);

    if (userInDB) {
      return res.render("./users/register", {
        errors: {
          email: {
            msg: "Este email ya está registrado",
          },
        },
        oldData: req.body,
      });
    }

    let encryptedPass = bcrypt.hashSync(req.body.password, 10);

    const userToCreate = {
      ...req.body,
      password: encryptedPass,
      avatar: req.file.filename,
    };

    User.create(userToCreate);

    res.redirect("/login");
  },
  loginProcess: (req, res) => {
    let userToLogin = User.findByField("email", req.body.email);
    if (userToLogin) {
      let isOkThePassword = bcrypt.compareSync(
        req.body.password,
        userToLogin.password
      );
      if (isOkThePassword) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin;

        if (req.body.remember) {
          res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 60 });
        }

        console.log(req.body.remember);

        return res.redirect("/user/profile");
      }
      return res.render("./users/login", {
        errors: {
          email: {
            msg: "Las credenciales son inválidas",
          },
        },
      });
    }

    return res.render("./users/login", {
      errors: {
        email: {
          msg: "No se encuentra este email en nuestra base de datos",
        },
      },
    });
  },
  profile: (req, res) => {
    res.render("./users/user-profile", {
      user: req.session.userLogged,
    });
  },
  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },
};
