// Rutas de category
const { Router } = require('express')
const router = Router();
// Importamos los controllers de products
const {
    getProductById,
    editProduct,
    deleteProduct,
    listProducts,
    listCategory,
    getCategoryById,
    editCategory,
    addCategory,
    listUsers,
    addUser,
    deleteUser,
    getUserById,
    editUser,
    addProduct,
} = require('../Controllers/adminController')

// configuramos las rutas
router.get('/products', listProducts)  // ok (revisar filtros)

router.get('/products/:id', getProductById)  // ok

router.put('/products/update/:id', editProduct) //ok

router.get('/products/delete/:id', deleteProduct)   //

router.post('/products/add', addProduct) 

router.get('/category', listCategory)  // ok (revisar filtros)

router.get('/category/:id', getCategoryById)  // ok (revisar filtros)

router.post('/category/add', addCategory)   // ok

router.put('/category/update/:id', editCategory)    //

router.get('/users', listUsers) // Este no va en el modulo admin

router.get('/users/:id', getUserById)  // ok

router.post('/users/add', addUser)   // ok

router.put('/users/update/:id', editUser)

router.get('users/delete/:id', deleteUser)


module.exports = router;