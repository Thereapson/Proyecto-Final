// Rutas de products
const { Router } = require('express')
const router = Router();
// Importamos los controllers de products
const {
    getAllProducts,
    addProduct,
    getProductById,
    editProduct,
} = require('../Controllers/productController')

// configuramos las rutas
router.get('/', getAllProducts)

router.post('/add', addProduct)

router.get('/detail/:id', getProductById)

router.put('/update', editProduct)

module.exports = router;