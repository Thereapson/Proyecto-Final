// Rutas de category
const { Router } = require('express')
const router = Router();
// Importamos los controllers de products
const {
    getAllCategorys,
    addCategory,
} = require('../Controllers/categoryController')

// configuramos las rutas
router.get('/', getAllCategorys)

router.post('/add', addCategory)

module.exports = router;