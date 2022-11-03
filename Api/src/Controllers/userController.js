// Controller de Users
const { userModel } = require("../Models/index")

const getAllUsers = async (req, res, next) => {
    try {
        const response = await userModel.find({})//.populate("Product");
        if(response.flat().length > 0) {
            const Users = response?.map((u) => {
                return {
                    id: u._id,
                    full_name: u.full_name,
                    email: u.email,
                    favorites: u.favorites,
                    address: u.address,
                    phone: u.phone,
                    status: u.status,
                    isAdmin: u.isAdmin,
                }
            })
            res.status(200).send(Users);
        } else {
            res.status(400).send("There's no Users to show")
        }

    } catch (error) {
        console.error(error);
        next(error)
    }
}

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id).populate("product")
        if(user) {
            res.status(200).send(user)
        } else {
            res.status(400).send("There's no User with that ID")
        }

    } catch (error) {
        console.error(error);
        next(error)
    }
}

const createUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const {
            full_name,
            email,
            password,
            isAdmin
        } = userData;
        const foundUser = await userModel.findOne({ email: email })
        if(foundUser) {
            res.status(400).send("The User email already exists")
        } else if ( full_name && email && password && isAdmin ) {
            const newUser = await userModel.create({
                full_name,
                email,
                password,
                favorites: [],
                address: "",
                phone: "",
                status: true,
                isAdmin: isAdmin || false
            });
            
            if(!newUser) {
                res.status(400).send("The new User can't be created")
            } else {
                res.status(200).send({ msg: "New User created", newUser })
            }
        } else {
            res.status(400).send("The new User can't be created. Missing required Data")
        }

    } catch (error) {
        console.error(error);
        next(error)
    }
}

const editUser = async (req, res, next) => {
    try{

    } catch (error) {
        console.error(error);
        next(error)
    }
}

const blockUser = async (req, res, next) => {
    try {

    } catch (error) {
        console.error(error);
        next(error)
    }
}

const addFavorites = async (req, res, next) => {
    try {

    } catch (error) {
        console.error(error);
        next(error)
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    editUser,
    blockUser,
    addFavorites
};