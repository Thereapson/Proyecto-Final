// Rutas de products
const { Router } = require('express')
const router = Router();
// Importamos los controllers de products
const {
    getAllProducts,
    addProduct,
} = require('../Controllers/productController')

// configuramos las rutas
router.get('/', getAllProducts)

router.post('/add', addProduct)

module.exports = router;