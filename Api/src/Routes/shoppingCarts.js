// Rutas de Shopping Cart
const { Router } = require("express");
const router = Router();
// Importamos los controllers de shopping cart
const {
    getAllShoppingCarts,
    getShoppingCartByUser,
    addProductToShoppingCart,
    deleteProductFromShoppingCart,
    deleteShoppingCart,
    deleteProductFromShoppingCartAndDeleteShoppingCart
} = require("../Controllers/shoppingCartController");

// configuramos las rutas
router.get("/", getAllShoppingCarts);

router.get("/detail/:id", getShoppingCartByUser);

router.post("/addProductToShoppingCart", addProductToShoppingCart);

router.post("/deleteProductFromShoppingCart", deleteProductFromShoppingCart);

router.delete("/deleteShoppingCart/:id", deleteShoppingCart);

router.post("/deleteProductFromShoppingCartAndDeleteShoppingCart", deleteProductFromShoppingCartAndDeleteShoppingCart);

module.exports = router;
