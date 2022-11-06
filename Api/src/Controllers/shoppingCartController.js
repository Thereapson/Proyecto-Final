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
        if (shoppingCartFound) {
            const productsFound = shoppingCartFound.products_id
            products.forEach(product => {
                const productFound = productsFound.find(p => p.product_id == product.product_id)
                if (productFound) {
                    productFound.quantity += product.quantity
                } else {
                    productsFound.push(product)
                }
            })
            const updateShoppingCart = await shoppingCartModel.findByIdAndUpdate(shoppingCartFound._id, {
                products_id: productsFound
            })
            if (!updateShoppingCart) {
                res.status(400).send("The Product can't be added");
            } else {
                // get the new shopping cart with the updated products and send it to the client
                const shoppingCartFound = await shoppingCartModel.findOne({ user_id: userId })
                res.status(200).send(shoppingCartFound);
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

// get a shopping cart by user
const getShoppingCartByUser = async (req, res, next) => {
    try {
        const userId = req.params.id
        const shoppingCartFound = await shoppingCartModel.findOne({ user_id: userId })
        if (shoppingCartFound) {
            // find products by id and populate the shopping cart with the products
            const productsFound = shoppingCartFound.products_id
            const products = await productModel.find({ _id: { $in: productsFound.map(p => p.product_id) } })
            const ShoppingCart = {
                user: shoppingCartFound.user_id,
                products: products.map((p, i) => {
                    return {
                        product: {
                            id: p._id,
                            name: p.name,
                            image: p.image,
                            price: p.price,
                        },
                        quantity: productsFound[i].quantity
                    }
                })
            }
            res.status(200).send(ShoppingCart)
        } else {
            res.status(400).send("There's no Shopping Cart to show")
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
        const { userId, productId } = req.body
        const shoppingCartFound = await shoppingCartModel.findOne({ user_id: userId })
        if (shoppingCartFound) {
            const productsFound = shoppingCartFound.products_id
            const productFound = productsFound.find(p => p.product_id == productId)
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
                        const shoppingCartFound = await shoppingCartModel.findOne({ user_id: userId })
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
        const { userId, productId } = req.body
        const shoppingCartFound = await shoppingCartModel.findOne({ user_id: userId })
        if (shoppingCartFound) {
            const productsFound = shoppingCartFound.products_id
            const productFound = productsFound.find(p => p.product_id == productId)
            if (productFound) {
                if (productFound.quantity > 1) {
                    productFound.quantity -= 1
                    const updateShoppingCart = await shoppingCartModel.findByIdAndUpdate(shoppingCartFound._id, {
                        products_id: productsFound
                    })
                    if (!updateShoppingCart) {
                        res.status(400).send("The Product can't be deleted");
                    } else {
                        const shoppingCartFound = await shoppingCartModel.findOne({ user_id: userId })
                        res.status(200).send(shoppingCartFound);
                    }
                } else {
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
                            const shoppingCartFound = await shoppingCartModel.findOne({ user_id: userId })
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
    deleteProductFromShoppingCartAndDeleteShoppingCart
}