const express = require("express");
const router = express.Router();
const { middleware } = require("../middleware/AuthMiddleware");

const {
  register,
  login,
  checktoken,
} = require("../controllers/AuthController");
const { getUsers } = require("../controllers/UserController");

router.post("/register", register);
router.post("/login", login);
router.get("/checktoken", middleware, checktoken);
router.get("/users", middleware, getUsers);

module.exports = router;
