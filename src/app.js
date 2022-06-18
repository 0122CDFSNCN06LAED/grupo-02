const path = require("path");

const express = require("express");
const session = require("express-session");
const cookies = require("cookie-parser");
const methodOverride = require("method-override");
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");

const mainRouter = require("./routes/main-routes");
const productsRouter = require("./routes/products-routes");
const usersRouter = require("./routes/users-routes");

const app = express();
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(cookies());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "Es un secreto",
    resave: "false",
    saveUninitialized: "false",
  })
);
app.use(userLoggedMiddleware);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server inicializado en el puerto " + PORT);
});

app.use(express.static(path.join(__dirname, "../public")));

app.use(mainRouter);
app.use(productsRouter);
app.use(usersRouter);
