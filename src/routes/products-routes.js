const { Router } = require("express");
const path = require("path");
const multer = require("multer");

const productsRouter = Router();

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../public/images/products"),
    filename: (req, file, cb) => {
      const fileName =
        file.fieldname + Date.now() + path.extname(file.originalname);
      cb(null, fileName);
    },
  });
  
  const upload = multer({
    storage,
  });

const productsController = require("../controllers/products-controller");

productsRouter.get("/checkout", productsController.checkout);
productsRouter.get("/products/create", productsController.create);
productsRouter.get("/products", productsController.products);
productsRouter.get("/products/:id", productsController.detail);
productsRouter.post("/products", upload.single("image"), productsController.store);
productsRouter.get("/products/:id/edit", productsController.edit);
productsRouter.put("/products/:id",upload.single("image") , productsController.update)
productsRouter.delete("/products/:id", productsController.destroy)

module.exports = productsRouter;
