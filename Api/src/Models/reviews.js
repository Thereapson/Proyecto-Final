// MODELO REVIEWS
const { Schema, model } = require('mongoose')

// Schema del modelo
const reviewSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    score: {
        type: Number
    },
    review: {
        type: String
    },
    date: {
        type: Date
    },
    ///////
    hidden: {
        type: Boolean
    }
}, 
{
    timestamps: true,
    versionKey: false,
})

const reviewModel = model("Review", reviewSchema);

module.exports = reviewModel;