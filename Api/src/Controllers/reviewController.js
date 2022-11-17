const { reviewModel, productModel } = require('../Models/index');

const getAllReviews = async () => {
    try {
        const response = await reviewModel.find({})
        const reviews = response?.map(r => {
            return {
                id: r._id,
                user: r.user_id,
                product: r.product_id,
                score: r.score,
                review: r.review,
                date: r.date
            }
        })
        if (reviews.length > 0) {
            return reviews
        } else {
            return { msg: "There's no Reviews in the DB" }
        }

    } catch (e) {
        console.error(e);
        throw new Error("Error. Reviews can't be showed")
    }
}

const getReviewByProduct = async (product) => {
    try {
        console.log(product)
        const response = await reviewModel.find({
            product_id: product,
        }).populate({
            path: 'user_id',
            select: 'id full_name'
        })
        const reviews = response?.map(r => {
            const re = {
                id: r._id,
                user: r.user_id,
                product: r.product_id,
                score: r.score,
                review: r.review,
                date: r.date
            }
            return re
        })
        if (reviews.length > 0) {
            return reviews
        } else {
            return { msg: "There's no Reviews in the DB with that Product id" }
        }

    } catch (e) {
        console.error(e);
        throw new Error("Error. Reviews can't be showed")
    }
}

const getReviewByUser = async (user) => {
    try {
        const response = await reviewModel.find({
            user_id: user,
        }).populate({ path: 'Product' })
        const reviews = response?.map(r => {
            return {
                id: r._id,
                user: r.user_id,
                product: r.product_id,
                score: r.score,
                review: r.review,
                date: r.date
            }
        })
        if (reviews.length > 0) {
            return reviews
        } else {
            return { msg: "There's no Reviews in the DB with that user id" }
        }

    } catch (e) {
        console.error(e);
        throw new Error("Error. Reviews can't be showed")
    }
}

const addReview = async (reviewData) => {
    try {
        const { user, product, score, review } = reviewData
        console.log(reviewData)
        const newReview = await reviewModel.create({
            user_id: user,
            product_id: product,
            score,
            review,
            date: new Date(),
        })
        const productReviews = await reviewModel.find({
            product_id: product
        })
        const scores = productReviews?.map(p => p.score)
        const total = scores.reduce((acc, val) => {
            return acc = acc + val
        })
        const rating = total / scores.length
        await productModel.findByIdAndUpdate(product, {
            score: rating
        }, { new: true })

        if (newReview) {
            return newReview
        } else return { msg: "The new review can't be created" }

    } catch (e) {
        console.error(e);
        throw new Error("Error. Review can't be created")
    }
}


module.exports = {
    getReviewByProduct,
    getReviewByUser,
    getAllReviews,
    addReview,
}