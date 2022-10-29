// Controller de Categorys
const { categoryModel } = require('../Models/index')

// Metodos del controller
const getAllCategorys = async (req, res, next) => {
    try {
        const response = await categoryModel.find({})
        if(response.flat().length > 0) {
            const Categorys = response?.map(c => {
                return {
                    id: c._id,
                    name: c.name,
                    description: c.description,
                }
            })
            res.status(200).send(Categorys)
        } else {
            res.status(400).send("There's no Categorys to show right now")
        }

    } catch (error) {
        console.error(error);
        next(error)
    }
}

const addCategory = async (req, res, next) => {
    try {
        const categoryData = req.body
        const { name, description } = categoryData
        if( name && description) {
            const newCategory = await categoryModel.create({
                name,
                description,
            })

            if(!newCategory) {
                res.status(400).send("The New Category can't be created")
            } else {
                res.status(200).send({ msg: "New Category Added", newCategory })
            }
        } else {
            res.status(400).send("The New Category can't be created, missing required data")
        }

    } catch(error) {
        console.error(error);
        next(error)
    }
}

module.exports = {
    getAllCategorys,
    addCategory,
}