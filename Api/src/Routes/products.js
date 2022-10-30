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
} = require("../Controllers/productController");

// configuramos las rutas
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/search/:key", getProductByName);

router.post("/add", addProduct);

router.put("/update", editProduct);

router.get("/detail/:id", getProductById);

router.put("/update", editProduct);

module.exports = router;
