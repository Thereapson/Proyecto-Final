// MODELO PURCHASE
const { Schema, model } = require('mongoose')

// Schema del modelo
const purchaseSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ammount: {
        type: Number,
    },
    date: {
        type: Date,
    },
    delivery_address: {
        type: String
    },
    products_id: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        quantity: Number
    }],
    payment_id: {
        type: String
    },
    status: {
        type: String,
    },
}, 
{
    timestamps: true,
    versionKey: false,
})

const purchaseModel = model("Purchase", purchaseSchema);

module.exports = purchaseModel;