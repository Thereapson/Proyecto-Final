// Rutas de users
const { Router } = require("express");
const router = Router();

// Importamos los controllers de users
const {
    getAllUsers,
    getUserById,
    // createUser,
    editUser,
    blockUser,
    addFavorites,
    removeFavorites,
    registerUser,
    loginUser,
    userData,
    getUserByEmail,
    forgotPassword,
    resetPassword,
    resetPasswordToken,
    getAdminByEmail,
    getFavorites
} = require("../Controllers/userController");

// configuramos las rutas
router.get("/", getAllUsers);

router.get("/detail/:id", getUserById);

// router.post("/create", createUser);

router.post("/register", registerUser);

router.post('/login', loginUser);

router.post('/userData', userData);

router.post('/forgotPassword', forgotPassword)

router.get('/resetPassword/:id/:token', resetPassword)

router.post('/resetPassword/:id/:token', resetPasswordToken)

router.put("/update", editUser);

router.post("/favorites", addFavorites);

router.post("/favorites/delete", removeFavorites);

router.get("/favorites/:id", getFavorites);

router.put("/block/:id", blockUser)

router.get("/email/:email", getUserByEmail)

router.get("/isadmin/:email", getAdminByEmail)

module.exports = router;