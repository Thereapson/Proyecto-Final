// Rutas de products
const { Router } = require('express')
const router = Router();
// Importamos los controllers de products
const {
    getAllProducts,
    addProduct,
    editProduct,
} = require('../Controllers/productController')

// configuramos las rutas
router.get('/', getAllProducts)

router.post('/add', addProduct)

router.put('/update', editProduct)

module.exports = router;