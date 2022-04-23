module.exports = {
  productDetail: (req, res) => {
    res.render("./products/productDetail");
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
    });
  },
};
