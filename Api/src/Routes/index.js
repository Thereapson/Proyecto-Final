// RUTAS DE LA API-REST
const express = require("express");
const router = express.Router();

const products = require("./products");
const categorys = require("./categorys");
const shoppingCarts = require("./shoppingCarts");
const users = require("./users");

router.use("/products", products);
router.use("/categorys", categorys);
router.use("/shoppingCarts", shoppingCarts)
router.use("/users", users)

router.get("/", (req, res) => {
  res.status(200).send({ message: "Server Up" });
});

//middleware para el Not Found
router.use((req, res, next) => {
  res.status(404).end();
});

module.exports = router;
