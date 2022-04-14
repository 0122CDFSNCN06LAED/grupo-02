const path = require("path");

const express = require("express");

const mainRouter = require("./routes/main-routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server inicializado en el puerto " + PORT);
});

app.use(express.static(path.join(__dirname, "../public")));

app.use(mainRouter);
