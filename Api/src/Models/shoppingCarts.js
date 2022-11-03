// MODELO SHOPPING-CART
const { Schema, model } = require("mongoose");

// Schema del modelo
const shoppincCartSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products_id: [{
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: Number
    }]
}, 
{
    timestamps: true,
    versionKey: false,
});

const shoppingCartModel = model("ShoppingCart", shoppincCartSchema);

module.exports = shoppingCartModel;
