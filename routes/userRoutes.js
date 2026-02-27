const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const valideuser=require("../middleware/validitionMiddleware.js")

router.post("/",valideuser, userController.createUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;




