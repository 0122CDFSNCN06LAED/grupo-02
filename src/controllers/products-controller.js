module.exports = {
  productDetail: (req, res) => {
    res.render("./products/productDetail");
  },
  checkout: (req, res) => {
    res.render("./products/checkout");
  },
  editAndCreate: (req, res) => {
    res.render("./products/create-and-edit");
  },
};
