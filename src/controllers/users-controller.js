const { validationResult } = require("express-validator");

fs = require("fs");
path = require("path");
const bcrypt = require("bcryptjs");

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
        oldData: req.body
      });
    }

    let encryptedPass = bcrypt.hashSync("password", 10);

    const lastIndex = users.length - 1;
    const lastUser = users[lastIndex];
    const biggestId = lastUser ? lastUser.id : 0;
    const newId = biggestId + 1;

     const user = {
       id: newId,
       name: req.body.name,
       email: req.body.email,
       phone: req.body.phone,
       password: encryptedPass,
       avatar: req.body.avatar
         ? "/images/users/avatar" + req.avatar.filename
         : "/images/users/avatar/default-image.png",
     };

    users.push(user)

    const jsonTxt = JSON.stringify(users, null, 2);
    fs.writeFileSync(usersFilePath, jsonTxt, "utf-8");

    res.redirect('/')
  }
}
