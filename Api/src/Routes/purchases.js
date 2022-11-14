// Rutas de Purchases
const { Router } = require('express')
const router = Router();

// Importamos los controllers de purchases
const {
    getAllPurchases,
    getPurchasesByUser,
    registerPurchase
} = require('../Controllers/purchaseController')

// configuramos las rutas
router.get('/', async (req, res) => {
    try {
        const { user } = req.query
        if(!user) {
            const response = await getAllPurchases()
            return res.status(200).send(response)
        } else {
            const response = await getPurchasesByUser(user)
            if(response.length > 0) {
                return res.status(200).send(response)
            }
        }

    } catch (error) {
        console.error(error);
        return res.status(400).send("Error Occured. Purchases can't be showed.")
    }
})

router.post('/register', async (req, res) => {
    try {
        const purchaseData = req.body
        if(purchaseData) {
            const response = await registerPurchase(purchaseData)
            if(!response.msg) {
                return res.status(200).send(response)
            } else return res.status(400).send(response)
        }

    } catch (error) {
        console.error(error);
        return res.status(400).send("Error Occured. Purchase can't be registered.")
    }
})

module.exports = router;