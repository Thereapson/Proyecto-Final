const { purchaseModel } = require('../Models/index')

const getAllPurchases = async () => {
    try {
        const response = await purchaseModel.find({})
        const purchases = response?.map(p => {
            return {
                id: p._id,
                user: p.user_id,
                ammount: p.ammount,
                date: p.date,
                products: p.products,
                payment: p.payment_id,
                status: p.status
            }
        })
        if(purchases.length > 0) {
            return purchases
        } else {
            return { msg: "There's no Purchases in the DB"}
        }

    } catch (error) {
        console.error(error);
        throw new Error("Error. Purchases can't be showed")
    }
}

const getPurchasesByUser = async (user) => {
    try {
        console.log(user)
        const response = await purchaseModel.find({ user_id: user})
        .populate({
            path: 'products.product_id',
            select: 'id name price brand category'
        })
        const purchases = response?.map(p => {
            return {
                id: p._id,
                ammount: p.ammount,
                date: p.date,
                products: p.products,
                payment: p.payment_id,
                status: p.status
            }
        })
        if(purchases.length > 0) {
            return purchases
        } else {
            return { msg: "There's no Purchases from that User"}
        }

    } catch (error) {
        console.error(error);
        throw new Error("Error. User doesn't have any purchase")
    }
}

const verifyPurchase = async (verifyData) => {
    try {
        const { user, product } = verifyData
        const response = await purchaseModel.findOne({
            user_id: user,
            product: product
        })
        if(response) {
            return response
        } else return { msg: "There's no purchase from this user and product" }

    } catch (error) {
        console.error(error);
        throw new Error("Error. Purchase can't be verify")
    }
}

// const registerPurchase = async (purchaseData) => {
//     try {
//         const { user, ammount, address, products, payment } = purchaseData
//         const newPurchase = await purchaseModel.create({
//             user_id: user,
//             ammount: ammount,
//             date: new Date(),
//             delivery_address: address || "",
//             products: products,
//             payment_id: payment,
//             status: "Pagado"
//         })
//         if(newPurchase) {
//             return newPurchase
//         } else return { msg: "The Purchase can't be register" }

//     } catch (error) {
//         console.error(error);
//         throw new Error("Error. Purchase can't be register")
//     }
// }

module.exports = {
    getAllPurchases,
    getPurchasesByUser,
    verifyPurchase
    // registerPurchase
}