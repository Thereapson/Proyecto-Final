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
    addFavorites
} = require("../Controllers/userController");

// configuramos las rutas
router.get("/", getAllUsers);

router.get("/detail/:id", getUserById);

router.post("/create", createUser);

router.put("/update", editUser);

router.put("/favorites/:user_id", addFavorites);

router.put("/block/:id", blockUser)

module.exports = router;