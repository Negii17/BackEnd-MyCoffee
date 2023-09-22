const express = require("express");
const router = express.Router();
const {
  middleware,
  middlewareWithLevel,
} = require("../middleware/AuthMiddleware");

// AppMiddleware
const { upload } = require("../middleware/AppMiddleware");
// End AppMiddleware

// Product

const {
  addDataProduct,
  getDataProducts,
  getDataProductById,
  updateDataProduct,
  deleteDataProduct,
} = require("../controllers/ProductController");
// End Product

const {
  register,
  login,
  checktoken,
} = require("../controllers/AuthController");

const {
  getUsers,
  getUsersById,
  updateDataUser,
  updatePasswordUser,
} = require("../controllers/UserController");

const { getDataCart, addDataCart } = require("../controllers/CartController");

router.post("/adddataproduct", addDataProduct);
router.get("/getdataproducts", getDataProducts);
router.get("/getdataproductbyid/:idparam", getDataProductById);
router.patch("/updatedataproduct/:idparam", updateDataProduct);
router.delete("/deletedataproduct/:idparam", deleteDataProduct);

router.get("/getdatacart", getDataCart);
router.post("/adddatacart", middleware, addDataCart);

router.post("/register", register);
router.post("/login", login);
router.patch("/updatedatauser/:idparam", updateDataUser);
router.patch("/updatepassworduser/:idparam", updatePasswordUser);
router.get("/getuserbyid", middleware, getUsersById);

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
