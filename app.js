const express = require("express");
const path = require("path");

const app = express();

app.listen(3000, () => {
  console.log("Servidor creado con exito.");
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/login.html"));
});

app.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/register.html"));
});

app.get("/productDetail", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/productDetail.html"));
});

app.get("/checkout", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/checkout.html"));
});
