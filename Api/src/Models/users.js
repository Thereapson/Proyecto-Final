// MODELO USERS
const { Schema, model } = require('mongoose')

// Schema del modelo
const userSchema = new Schema({
    full_name: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required"],    
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"], 

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