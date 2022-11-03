// Controller de Shopping Cart
const { shoppingCartModel, productModel } = require("../Models/index")

const getAllShoppingCarts = async (req, res, next) => {
    try {
        const response = await shoppingCartModel.find({})//.populate("user").populate("product")
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
        const productData = req.body
        const { user_id, product_id, quantity } = productData
        const shoppingCartFound = await shoppingCartModel.findOne({ user_id: user_id })

        console.log(productData)

        if(shoppingCartFound) {
            const product = await productModel.findById(product_id)
            if(product) {
                product.stock? 
                    product.stock > quantity?
                        quantity
                        : quantity = product.stock
                    : quantity = 0
            }
            const products = shoppingCartFound.products_id
            products.concat({
                product_id,
                quantity,
            })
            const addProduct = await shoppingCartModel.findByIdAndUpdate(shoppingCartFound._id, {
                products_id: products,
            })
            if (!addProduct) {
                res.status(400).send("The Product can't be added");
            } else {
                res.status(200).send({ msg: "New Product Added", addProduct });
            }
        } else {
            const product = await productModel.findById(product_id)
            if(product) {
                product.stock? 
                    product.stock > quantity?
                        quantity
                        : quantity = product.stock
                    : quantity = 0
            }
            const newShoppingCart = await shoppingCartModel.create({
                user_id: user_id,
                products_id: {
                    product_id: product_id,
                    quantity: quantity,
                }
            })
            if (!newShoppingCart) {
                res.status(400).send("The New ShoppingCart can't be created");
            } else {
                res.status(200).send({ msg: "New Product Added", newShoppingCart });
            }
        }

    } catch (error) {
        console.error(error);
        next(error)
    }
}

const editProducts = async (req, res, next) => {
    try {
        const productData = req.body
        const { shopping_id, product_id, quantity } = productData
        const shoppingCartFound = await shoppingCartModel.findById(shopping_id)

        if(shoppingCartFound) {
            const product = await productModel.findById(product_id)
            if(product) {
                product.stock? 
                    product.stock > quantity?
                        quantity
                        : quantity = product.stock
                    : quantity = 0
            }
            const products = shoppingCartFound.products_id
            products.concat({
                product_id,
                quantity,
            })
            const editedSC = await shoppingCartModel.findByIdAndUpdate(shopping_id, {
                products_id: products
            })
            res.status(200).send({ msg: "Product edited", editedSC });
        } else {
            res.status(400).send("The Product can't be edited");
        }

    } catch (error) {
        console.error(error);
        next(error)
    }
}

const removeProducts = async (req, res, next) => {
    try {
        const productData = req.body
        const { shopping_id, product_id } = productData
        const shoppingCartFound = await shoppingCartModel.findById(shopping_id)

        if(shoppingCartFound) {
            const products = shoppingCartFound.products_id
            editedProducts = products.filter(p => p.product_id !== product_id)
            const editedSC = await shoppingCartModel.findByIdAndUpdate(shopping_id, {
                products_id: editProducts
            })
            res.status(200).send({ msg: "ShoppingCart edited", editedSC });
        } else {
            res.status(400).send("The Shopping Cart can't be edited");
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