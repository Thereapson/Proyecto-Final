// Rutas de Shopping Cart
const { Router } = require("express");
const router = Router();
// Importamos los controllers de shopping cart
const {
    getAllShoppingCarts,
    getShoppingCartByUser,
    addProducts,
    editProducts,
    removeProducts,
} = require("../Controllers/shoppingCartController");

// configuramos las rutas
router.get("/", getAllShoppingCarts);

router.get("/detail/:user_id", getShoppingCartByUser);

router.put("/add/:user_id", addProducts);

router.put("/edit/:user_id", editProducts);

router.put("/remove/:user_id", removeProducts)


module.exports = router;
