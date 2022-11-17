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
    listPurchases,
} = require('../Controllers/adminController')
const {getAllPurchases} = require('../Controllers/purchaseController')

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

router.get('/users/delete/:id', deleteUser)

// router.get('/purchases', listPurchases)

router.get('/purchases', async (req, res) => {
    const {_start, _end, _sort, _order, q} = req.query
    try {
        const { user } = req.query
        if(!user) {
            const response = await getAllPurchases()
            return res.status(200)
            .header( 'Access-Control-Expose-Headers','X-Total-Count')
            .header('x-total-count', response?.length) 
            .send(response.slice(_start, _end))
        } else {
            const response = await getPurchasesByUser(user)
            if(response.length > 0) {
                return res.status(200)
                .header( 'Access-Control-Expose-Headers','X-Total-Count')
                .header('x-total-count', response?.length) 
                .send(response.slice(_start, _end))
            }
        }

    } catch (error) {
        console.error(error);
        return res.status(400).send("Error Occured. Purchases can't be showed.")
    }
})


module.exports = router;