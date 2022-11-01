// MODELO USERS
const { Schema, model } = require('mongoose')

// Schema del modelo
const userSchema = new Schema({
    full_name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    status: {
        type: Boolean,
    },
    isAdmin: {
        type: Boolean,
    }
}, 
{
    timestamps: true,
    versionKey: false,
})

const userModel = model("User", userSchema);

module.exports = userModel;