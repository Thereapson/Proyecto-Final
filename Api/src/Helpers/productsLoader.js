const { productModel } = require("../Models/index")

const idProductsToUpdate = async () => {
  try {
    const response = await productModel.find({})
    const productsToUpdate = response?.filter( p => p.status === undefined )
    const idPTU = productsToUpdate?.map( p => {
      return {
        id: p._id,
      }
    } )
    console.log(idPTU)

  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  idProductsToUpdate
}