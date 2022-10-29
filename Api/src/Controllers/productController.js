// Controller de Products
const { productModel } = require('../Models/index')

// Metodos del controller
const getAllProducts = async (req, res, next) => {
    try {
        const response = await productModel.find({}).populate("category")
        if(response.flat().length > 0) {
            const Products = response?.map(p => {
                return {
                    id: p._id,
                    sku: p.sku,
                    name: p.name || "No-Name",
                    price: p.price,
                    weight: p.weight,
                    description: p.description,
                    status: p.status,
                    image: p.image,
                    brand: p.brand,
                    category: p.category?.name,
                    createDate: p.create_date,
                    stock: p.stock
                }
            })
            res.status(200).send(Products)
        } else {
            res.status(400).send("There's no Products to show right now")
        }

    } catch (error) {
        console.error(error);
        next(error)
    }
}

const addProduct = async (req, res, next) => {
    try {
        const productData = req.body
        const { sku, name, price, weight, description, status, image, brand, category, stock } = productData
        const foundProduct = await productModel.findOne({ sku: sku })
        if(foundProduct) {
            res.status(400).send("The New Product can't be created, it SKU already exists")
        } else if( sku && name && price && image && brand && category && stock ) {
            const newProduct = await productModel.create({
                sku, 
                name,
                price,
                weight: weight || 0,
                description: description || name,
                status: true,
                image,
                brand,
                category,
                create_date: new Date(),
                stock,
            })
    
            if(!newProduct) {
                res.status(400).send("The New Product can't be created")
            } else {
                res.status(200).send({ msg: "New Product Added", newProduct })
            }
        } else {
            res.status(400).send("The New Product can't be created. Missing required data")

        }

    } catch(error) {
        console.error(error);
        next(error)
    }
}

const editProduct = async (req, res, next) => {
    try {
        const productData = req.body
        console.log("edit...",productData)
        const { id, sku, name, price, weight, description, thumbnail, image, category, stock } = productData
        const editProduct = await productModel.findByIdAndUpdate(id, {
            sku, 
            name,
            price,
            weight,
            description,
            thumbnail,
            image,
            category,
            stock,
        }, { new: true })
        console.log(editProduct)
        if(editProduct) {
            res.status(200).send("Product Successfully Updated")
        } else res.status(400).send("Product can't be created")

    } catch (error) {
        console.error(error);
        next(error)
    }
}

module.exports = {
    getAllProducts,
    addProduct,
    editProduct,
}