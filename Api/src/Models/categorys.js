// MODELO CATEGORYS
const { Schema, model } = require('mongoose')

// Schema del modelo
const categorySchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    thumbnail: {
        type: Boolean,
    }
}, 
{
    timestamps: true,
    versionKey: false,
});

const categoryModel = model("Product", categorySchema);

module.exports = categoryModel;