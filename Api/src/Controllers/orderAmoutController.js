const { productModel } = require("../Models");

const getId = async (id) => {
  try {
    const productFromDB = await productModel.findById(id);
    return productFromDB;
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getOrderAmount = async (products) => {
  let amount = 0;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    //peticion a base de datos
    const productDB = await getId(product.id);
    console.log(
      "🚀 ~ file: orderAmoutController.js ~ line 20 ~ getOrderAmount ~ productDB",
      productDB
    );

    let operation = productDB.price * product.qty;
    amount += operation;
  }

  //   const onlyTwoDecimal = amount.toFixed(2);
  //   const parsedAmout = parseInt(onlyTwoDecimal.replace(".", ""), 10);

  //   return parsedAmout;
  return amount;
};

module.exports = { getOrderAmount };
