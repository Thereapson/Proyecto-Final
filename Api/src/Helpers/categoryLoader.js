// Helper para cargar datos de category
const { categoryModel } = require('../Models/index')
const axios = require('axios')
const API = 'https://apipc-parts.herokuapp.com/All'

// Obtenemos todos los productos de la API
async function getAllData () {
    try {
        console.log("Axios =========>")
        const response = await axios.get(API)
        const categories = await response.data?.map(cat => cat.Type)

        const allCats = new Set(categories.sort())
        console.log(allCats)

        allCats.forEach(cat => {
            let found = categoryModel.findOne({ name : cat })
            found ? null
            : categoryModel.create({ name: cat, description: cat, thumbnail: true })
        })

        const categoriesDB = await categoryModel.find({})
        console.log(categoriesDB)

    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getAllData
}