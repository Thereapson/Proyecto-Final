// Rutas de products
const { Router } = require("express");
const router = Router();
// Importamos los controllers de products
const {
  getAllProducts,
  addProduct,
  getProductById,
  getProductByName,
  editProduct,
  doPayment,
  deleteProduct
} = require("../Controllers/productController");

// configuramos las rutas
router.get("/", getAllProducts);

router.get("/search/:key", getProductByName);

router.post("/add", addProduct);

router.get("/detail/:id", getProductById);

router.put("/update", editProduct);

router.post("/payment" , doPayment)

router.delete("/delete/:id", deleteProduct);

module.exports = router;
