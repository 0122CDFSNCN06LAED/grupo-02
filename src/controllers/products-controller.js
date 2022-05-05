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
    id = req.params.id;
    action = "/products/"+ id +"?_method=PUT";
    const product = products.find((p) => id == p.id);
    res.render("./products/create-and-edit", {
      title: "Editar",
      h1: "Editar la publicacion",
      value: "EDITAR",
      action: action,
      method: "POST",
      product: product,
    });
  },
  create: (req, res) => {
    res.render("./products/create-and-edit", {
      title: "Crear",
      h1: "Crear una publicacion",
      value: "CREAR",
      action: "/products",
      method: "POST",
      product: {}
    });
  },
  store: (req, res) => {
    const lastIndex = products.length - 1;
    const lastProduct = products[lastIndex];
    const biggestId = lastProduct ? lastProduct.id : 0;
    const newId = biggestId + 1;
    const datosRecibidos = JSON.parse(JSON.stringify(req.body));

    const product = {
      name: datosRecibidos.name,
      description: datosRecibidos.description,
      location: datosRecibidos.location,
      size: datosRecibidos.size,
      price: Number(datosRecibidos.price),
      id: newId,
    };

    products.push(product);

    const jsonTxt = JSON.stringify(products, null, 2);
    fs.writeFileSync(productsFilePath, jsonTxt, "utf-8");

    res.redirect("/products");
  },
  update: (req, res) => {
    const id = req.params.id;
    console.log(id)
    const product = products.find((p) => id == p.id);

    Object.assign(product, {
      ...req.body,
      price: Number(req.body.price),
      discount: Number(req.body.discount),
    });

    const jsonTxt = JSON.stringify(products, null, 2);
    fs.writeFileSync(productsFilePath, jsonTxt, "utf-8");

    res.redirect("/products/" + id);
  },
  destroy: (req, res) => {
    const id = req.params.id;
    const productIndex = products.findIndex(e => e.id == id);

    products.splice(productIndex, 1);

    const jsonTxt = JSON.stringify(products, null, 2);
    fs.writeFileSync(productsFilePath, jsonTxt, "utf-8");

    res.redirect("/products");
  },
};
