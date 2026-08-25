const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const validateTodo = require("../middlewares/validator");
const { registerSchema, loginSchema } = require("../schemas/schema");

// router.post("/register", registerUser);
router.post("/register", validateTodo(registerSchema), registerUser);
// router.post("/login", loginUser);
router.post("/login", validateTodo(loginSchema), loginUser);

module.exports = router;