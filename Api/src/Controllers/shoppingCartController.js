// Controller de Shopping Cart
const { shoppingCartModel, productModel } = require("../Models/index")

// get all shopping carts
const getAllShoppingCarts = async (req, res, next) => {
    try {
        const response = await shoppingCartModel.find({})//.populate("user")//.populate("product")
        if (response.flat().length > 0) {
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

// add a product to a shopping cart, if the product exists, add quantity 
// if user has a shopping cart already created we add the new products to the existing cart and update it
// if product already exists in the cart we update the quantity with +1 to the existing quantity of the product
// if product doesn't exist in the cart we add the product with quantity 1 to the cart

const addProductToShoppingCart = async (req, res, next) => {
    try {
        const productData = req.body
        const userId = productData.user_id
        const products = productData.products_id
        const shoppingCartFound = await shoppingCartModel.findOne({ user_id: userId })
        let updated = {}
        let added = {}
        if (shoppingCartFound) {
            const productsFound = shoppingCartFound.products_id
            let updateQuantity = 0
            let newArrayProduct = {}
            let productFound = {}
            await asyncForEach(products, async (product) => {
                productFound = productsFound.find(p => p.product_id == product.product_id)
                if (productFound) {
                    updateQuantity = productFound.quantity + product.quantity
                    updated = await shoppingCartModel.updateOne(
                        { user_id: userId, "products_id.product_id": productFound.product_id },
                        { $set: { "products_id.$.quantity": updateQuantity } }
                    )
                } else {
                    newArrayProduct = {
                        product_id: product.product_id,
                        quantity: product.quantity
                    }
                    added = await shoppingCartModel.updateOne(
                        { user_id: userId },
                        { $push: { products_id: newArrayProduct } }
                    )
                }
            })
            if (updated || added) {
                const shoppingCartFound = await shoppingCartModel.findOne({ user_id: userId }).populate({
                    path: 'products_id.product_id',
                    select: '_id name image price'
                })
                res.status(200).send(shoppingCartFound)
            } else {
                res.status(400).send("The Product can't be added")
            }
        } else {
            // if user doesn't have a shopping cart we create a new one with the products
            const newShoppingCart = await shoppingCartModel.create(productData)
            if (!newShoppingCart) {
                res.status(400).send("The Product can't be added");
            } else {
                res.status(200).send({ newShoppingCart });
            }
        }
    } catch (error) {
        console.error(error);
        next(error)
    }

}

// Helper para poder usar async await con ForEach
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

// get a shopping cart by user
const getShoppingCartByUser = async (req, res, next) => {
    try {
        const userId = req.params.id
        const shoppingCartFound = await shoppingCartModel.findOne({ user_id: userId }).populate({
            path: 'products_id.product_id',
            select: '_id name image price'
        })
        if (shoppingCartFound) {
            const ShoppingCart = {
                user: shoppingCartFound.user_id,
                products: shoppingCartFound.products_id
            }
            res.status(200).send(ShoppingCart)
        } else {
            res.status(200).send({ msg: "There's no Shopping Cart to show" })
        }
    } catch (error) {
        console.error(error);
        next(error)
    }
}

const getQuantityOfProductsInShoppingCart = async (req, res, next) => {
    try {
        const userId = req.params.id
        const shoppingCartFound = await shoppingCartModel.findOne
            ({ user_id: userId }).populate({
                path: 'products_id.product_id',
                select: '_id name image price'
            })
        if (shoppingCartFound) {
            res.status(200).send({ quantity: shoppingCartFound.products_id.length })
        } else {
            res.status(200).send({ quantity: 0 })
        }
    } catch (error) {
        console.error(error);
        next(error)
    }
}



// delete a shopping cart by user
const deleteShoppingCart = async (req, res, next) => {
    try {
        const userId = req.params.id
        const shoppingCartFound = await shoppingCartModel.findOne({ user_id: userId })
        if (shoppingCartFound) {
            const deletedShoppingCart = await shoppingCartModel.findByIdAndDelete(shoppingCartFound._id)
            res.status(200).send({ msg: "Shopping Cart Deleted", deletedShoppingCart });
        } else {
            res.status(400).send("There's no Shopping Cart to delete")
        }
    } catch (error) {
        console.error(error);
        next(error)
    }
}

// delete product from a shopping cart if exists and delete the shopping cart if it's empty
const deleteProductFromShoppingCartAndDeleteShoppingCart = async (req, res, next) => {
    try {
        const { user_id, product_id } = req.body
        console.log(req.body)
        const shoppingCartFound = await shoppingCartModel.findOne({ user_id: user_id })
        if (shoppingCartFound) {
            const productsFound = shoppingCartFound.products_id
            const productFound = productsFound.find(p => p.product_id == product_id)
            if (productFound) {
                const index = productsFound.indexOf(productFound)
                productsFound.splice(index, 1)
                if (productsFound.length === 0) {
                    const deletedShoppingCart = await shoppingCartModel.findByIdAndDelete(shoppingCartFound._id)
                    res.status(200).send({ msg: "Shopping Cart Deleted", deletedShoppingCart });
                } else {
                    const updateShoppingCart = await shoppingCartModel.findByIdAndUpdate(shoppingCartFound._id, {
                        products_id: productsFound
                    })
                    if (!updateShoppingCart) {
                        res.status(400).send("The Product can't be deleted");
                    } else {
                        const shoppingCartFound = await shoppingCartModel.findOne({ user_id: user_id })
                        res.status(200).send(shoppingCartFound);
                    }
                }

            } else {
                res.status(400).send("There's no Product to delete")
            }
        } else {
            res.status(400).send("There's no Shopping Cart for this user")
        }
    } catch (error) {
        console.error(error);
        next(error)
    }
}

// delete quantity -1 of a product from a shopping cart if exists
const deleteProductFromShoppingCart = async (req, res, next) => {
    try {
        const { user_id, product_id } = req.body
        const shoppingCartFound = await shoppingCartModel.findOne({ user_id: user_id })
        if (shoppingCartFound) {
            const productsFound = shoppingCartFound.products_id
            const productFound = productsFound.find(p => p.product_id == product_id)
            console.log(productFound)
            if (productFound) {
                if (productFound.quantity > 1) {
                    const newQuantity = productFound.quantity -= 1
                    const updateShoppingCart = await shoppingCartModel.updateOne(
                        { user_id: user_id, "products_id.product_id": product_id },
                        { $set: { "products_id.$.quantity": newQuantity } }
                    )
                    if (!updateShoppingCart) {
                        res.status(400).send("The Product can't be deleted");
                    } else {
                        const shoppingCartFound = await shoppingCartModel.findOne({ user_id: user_id })
                        res.status(200).send(shoppingCartFound);
                    }
                } else {
                    const index = productsFound.indexOf(productFound)
                    const haveProducts = productsFound.splice(index, 1)
                    console.log("Restan: ", haveProducts)
                    if (productsFound.length === 0) {
                        const deletedShoppingCart = await shoppingCartModel.findByIdAndDelete(shoppingCartFound._id)
                        res.status(200).send({ msg: "Shopping Cart Deleted", deletedShoppingCart });
                    } else {
                        const updateShoppingCart = await shoppingCartModel.updateOne(
                            { user_id: user_id },
                            { $pull: { products_id: { product_id: product_id } } }
                        )
                        if (!updateShoppingCart) {
                            res.status(400).send("The Product can't be deleted");
                        } else {
                            const shoppingCartFound = await shoppingCartModel.findOne({ user_id: user_id })
                            res.status(200).send(shoppingCartFound);
                        }
                    }
                }
            } else {
                res.status(400).send("There's no Product to delete")
            }
        }
    }
    catch (error) {
        console.error(error);
        next(error)
    }
}


module.exports = {
    getAllShoppingCarts,
    getShoppingCartByUser,
    addProductToShoppingCart,
    deleteProductFromShoppingCart,
    deleteShoppingCart,
    deleteProductFromShoppingCartAndDeleteShoppingCart,
    getQuantityOfProductsInShoppingCart
}