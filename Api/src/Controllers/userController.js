// Controller de Users
const { userModel } = require("../Models/index")
const jwt = require ('jsonwebtoken');
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser')
const JWT_SECRET = 'asjkdnajksfndjaksndasknd12123()239883smlkdsmad?)==(23'


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
////////////////////autenticacion

const createToken = (id) => {
    return jwt.sign({id}, JWT_SECRET, {
        expiresIn: "3600s"
    })
}
// const registerUser = async (req, res, next) => {
//     const {full_name, email, password, isAdmin} = req.body;

//     const encryptedPassword = await bcrypt.hash(password, 10);
//     try{
//         const oldUser = await userModel.findOne({email})
//         if(oldUser){
//           return res.json({error:'User Exists'}) 
//         }
//         await userModel.create({
//             full_name,
//             email,
//             password: encryptedPassword,
//         })
//         res.send({status:'ok'})
//     }catch(error){
//         res.send({status:'error'})
//     }
// }

const loginUser = async (req, res, next) => {
    const {email, password} = req.body

    const user = userModel.findOne({email})
    if(!user){
        return res.json({error:'User not found'}) 
      }

      if (await bcrypt.compare(password, user.password)){
        const token = jwt.sign({}, JWT_SECRET);

        if (res.status(201)){
            return res.json({status: 'ok', data: token})
        }else {
            return res.json({error:'error'})
        }
      }
      res.json({status:'error', error:'Invalid Password'})
      
}

const registerUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;
    const user = await userModel.create({
        email,
        password
    });
    const token = createToken(user._id);
    res.cookie('jwt', token, {
        withCredentials: true,
        httpOnly: false,
        expiresIn: '3600s'
    });
    res.status(201).json({user: user._id, created: true})
    }catch (e){
        console.log(e)
    }
    
}
// const userData = async (req, res, next) => {
//     const {token} = req.body;
//     try{
//         const user = jwt.verify(token, JWT_SECRET);
//         const userEmail = user.email;
//         userModel.findOne({email:userEmail}).then((data) => {
//             res.send({status:'ok', data:data})
//         }).catch((error) => {
//             res.send ({status: 'error', data: error})
//         })
//     }catch(e){
//         console.log(e)
//     }
// }
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
    addFavorites,
    registerUser,
    loginUser,
};