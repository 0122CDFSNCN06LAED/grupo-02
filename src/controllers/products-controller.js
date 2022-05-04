fs = require("fs");
path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

module.exports = {
  detail: (req, res) => {
    id = req.params.id;
    const product = products.find((p) => id == p.id);
    res.render("./products/product-detail", {
      products: product,
    });
  },
  products: (req, res) => {
    res.render("./products/products-list", {
      products: products,
    });
  },
  checkout: (req, res) => {
    res.render("./products/checkout");
  },
  edit: (req, res) => {
    res.render("./products/create-and-edit", {
      title: "Editar",
      h1: "Editar la publicacion",
      value: "EDITAR",
    });
  },
  create: (req, res) => {
    res.render("./products/create-and-edit", {
      title: "Crear",
      h1: "Crear una publicacion",
      value: "CREAR",
      action: "/products",
      method: "POST",
    });
  },
  store: (req, res) => {
    const lastIndex = products.length - 1;
    const lastProduct = products[lastIndex];
    const biggestId = lastProduct ? lastProduct.id : 0;
    const newId = biggestId + 1;
    console.log(req.body);

    const product = {
      ...req.body,
      price: Number(req.body.price),
      id: newId,
    };

    products.push(product);

    const jsonTxt = JSON.stringify(products, null, 2);
    fs.writeFileSync(productsFilePath, jsonTxt, "utf-8");

    res.redirect("/products");
  },
};
