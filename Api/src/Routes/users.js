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
    deleteUser
} = require("../Controllers/");

// configuramos las rutas
router.get("/", getAllUsers);

router.get("/detail/:id", getUserById);

router.post("/create", createUser);

router.put("/update", editUser);

router.put("/block/:id", blockUser)

router.delete("/delete/:id", deleteUser);

module.exports = router;
