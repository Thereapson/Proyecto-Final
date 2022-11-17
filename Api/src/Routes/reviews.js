// Rutas de Reviews
const { Router } = require('express')
const router = Router();
// Importamos los controllers de reviews
const {
    getReviewByProduct,
    getReviewByUser,
    getAllReviews,
    addReview,
} = require('../Controllers/reviewController')

// configuramos las rutas
router.get('/', async (req, res) => {
    try {
        const { product } = req.query
        const { user } = req.query
        if(product) {
            const response = await getReviewByProduct(product)
            if(response.length > 0) {
                return res.status(200).send(response)
            }
        } else if(user){
            const response = await getReviewByUser(user)
            if(response.length > 0) {
                return res.status(200).send(response)
            }
        } else {
            const response = await getAllReviews()
            return res.status(200).send(response)
        }

    } catch (e) {
        console.error(e);
        return res.status(400).send("Error Occured. Reviews can't be showed.")
    }
})

router.post('/add', async (req, res) => {
    try {
        const reviewData = req.body
        if(reviewData) {
            const response = await addReview(reviewData)
            if(!response.msg) {
                return res.status(200).send(response)
            } else return res.status(400).send(response)
        }
    } catch (e) {
        console.error(e);
        return res.status(400).send("Error Ocurred. Review can't be created.")
    }
})

module.exports = router;