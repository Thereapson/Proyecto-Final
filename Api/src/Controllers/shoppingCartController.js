// Controller de Shopping Cart
const { shoppingCartModel } = require("../Models/index")

const getAllShoppingCarts = async (req, res, next) => {
    try {
        const response = await shoppingCartModel.find({}).populate("user").populate("product")
        if(response.flat().length > 0) {
            const ShoppingCart = response?.map((s) => {
                return {
                    user: s.user_id,
                    products: s.products_id
                }
            })
            res.status(200).send(ShoppingCart)
        } else {
            res.status(400).send("There's no Shopping Carts to show")
        }

    } catch (error) {
        console.error(error);
        next(error)
    }
}

const getShoppingCartByUser = async (req, res, next) => {
    try {
        const { user_id } = req.params
        const ShoppingCart = await shoppingCartModel.findOne({ user_id: user_id }).populate("product")

        if(ShoppingCart) {
            res.status(200).send(ShoppingCart)
        } else {
            res.status(400).send("There's no Shopping Cart with that user id")
        }

    } catch (error) {
        console.error(error);
        next(error)
    }
}

const addProducts = async (req, res, next) => {
    try {
        const { user_id } = req.params
        const ShoppingCart = await shoppingCartModel.findOne({ user_id: user_id })

        if(shoppingCart) {
            
        }

    } catch (error) {
        console.error(error);
        next(error)
    }
}

module.exports = {
    getAllShoppingCarts,
    getShoppingCartByUser,
    addProducts,
    editProducts,
    removeProducts,
}