//constante de todos los modelos
const models = {
    categoryModel: require('./categorys'),
    productModel: require('./products'),
    purchaseModel: require('./purchases'),
    reviewModel: require('./reviews'),
    shoppingCartModel: require('./shoppingCarts'),
    userModel: require('./users')
};

module.exports = models;
