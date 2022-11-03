// MODELO PRODUCTS
const { Schema, model } = require('mongoose')

// Schema del modelo
const productSchema = new Schema({
    sku: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    brand:  {
        type: String,
    },
    benchmark: {
        type: Number,
    },
    score: {
        type: Number
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    create_date: {
        type: Date
    },
    stock: {
        type: Number
    },
    status: {
        type: Boolean,
    }
}, 
{
    timestamps: true,
    versionKey: false,
});

const productModel = model("Product", productSchema);

module.exports = productModel;