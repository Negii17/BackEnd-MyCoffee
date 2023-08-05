const express = require("express");
const router = express.Router();
const {
  middleware,
  middlewareWithLevel,
} = require("../middleware/AuthMiddleware");

const {
  register,
  login,
  checktoken,
} = require("../controllers/AuthController");
const { getUsers, getUsersById } = require("../controllers/UserController");

router.post("/register", register);
router.post("/login", login);
router.get("/checktoken", middleware, checktoken);
router.get("/users", middleware, getUsers);
router.get(
  "/users-withlevel",
  middleware,
  middlewareWithLevel(["owner", "admin", "costumer"]),
  getUsers
);
router.get("/usersid", middleware, getUsersById);

module.exports = router;
