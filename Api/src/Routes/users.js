// Rutas de users
const { Router } = require("express");
const router = Router();

// Importamos los controllers de users
const {
    getAllUsers,
    getUserById,
    createUser,
    editUser,
    blockUser,
    addFavorites,
    registerUser,
    loginUser,
    userData
} = require("../Controllers/userController");

// configuramos las rutas
router.get("/", getAllUsers);

router.get("/detail/:id", getUserById);

router.post("/create", createUser);

router.post("/register", registerUser);

router.post('/login', loginUser);

router.post('/userData', userData);

router.put("/update", editUser);

router.put("/favorites/:user_id", addFavorites);

router.put("/block/:id", blockUser)

module.exports = router;